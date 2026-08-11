#!/usr/bin/env sh
# Build mcp Docker image (safe mode or push to ghcr.io).
set -eu

PACKAGE_NAME="${PACKAGE_NAME:-mcp}"
DOCKERFILE="${DOCKERFILE:-Dockerfile}"
BUILD_CONTEXT="${BUILD_CONTEXT:-.}"

chmod +x .gitlab/ci/scripts/*.sh
eval "$(sh .gitlab/ci/scripts/docker-tags.sh)"

docker buildx create --use --name builder 2>/dev/null || docker buildx use builder

# Remote BuildKit cache in GitLab registry (survives ephemeral DinD pods)
CACHE_REF="${CI_REGISTRY_IMAGE}/buildcache:latest"
CACHE_ARGS="--cache-from=type=registry,ref=${CACHE_REF}"
# mode=max: cache intermediate stages, not only final
CACHE_ARGS="${CACHE_ARGS} --cache-to=type=registry,ref=${CACHE_REF},mode=max"


if [ "${CI_PUBLISH_ENABLED:-false}" = "true" ]; then
  sh .gitlab/ci/scripts/ensure-prod-ref.sh publish
  IMAGE="${IMAGE_REGISTRY}/${PACKAGE_NAME}"
  echo "Build cache: ${CACHE_REF}"
  echo "PRODUCTION MODE: pushing ${IMAGE}:${TAG_SUFFIX} and ${IMAGE}:${IMAGE_VERSION}"
  # shellcheck disable=SC2086
  docker buildx build \
    --file "${DOCKERFILE}" \
    --tag "${IMAGE}:${TAG_SUFFIX}" \
    --tag "${IMAGE}:${IMAGE_VERSION}" \
    ${CACHE_ARGS} \
    --push \
    --progress plain \
    "${BUILD_CONTEXT}"
  echo "Published ${IMAGE}:${TAG_SUFFIX}"
  echo "Published ${IMAGE}:${IMAGE_VERSION}"
else
  LOCAL_TAG="${PACKAGE_NAME}:ci-${CI_COMMIT_SHORT_SHA:-local}"
  echo "SAFE MODE: building locally as ${LOCAL_TAG} (no push)"
  # shellcheck disable=SC2086
  docker buildx build \
    --file "${DOCKERFILE}" \
    --tag "${LOCAL_TAG}" \
    ${CACHE_ARGS} \
    --load \
    --progress plain \
    "${BUILD_CONTEXT}"
  docker images "${LOCAL_TAG}"
  echo "Build OK. To enable push: set CI_PUBLISH_ENABLED=true in GitLab CI/CD variables."
fi
