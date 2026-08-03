#!/usr/bin/env sh
# Build mcp Docker image (safe mode or push to ghcr.io).
set -eu

PACKAGE_NAME="${PACKAGE_NAME:-mcp}"
DOCKERFILE="${DOCKERFILE:-Dockerfile}"
BUILD_CONTEXT="${BUILD_CONTEXT:-.}"

chmod +x .gitlab/ci/scripts/*.sh
eval "$(sh .gitlab/ci/scripts/docker-tags.sh)"

docker buildx create --use --name builder 2>/dev/null || docker buildx use builder

if [ "${CI_PUBLISH_ENABLED:-false}" = "true" ]; then
  IMAGE="${IMAGE_REGISTRY}/${PACKAGE_NAME}"
  echo "PRODUCTION MODE: pushing ${IMAGE}:${TAG_SUFFIX} and ${IMAGE}:${IMAGE_VERSION}"
  docker buildx build \
    --file "${DOCKERFILE}" \
    --tag "${IMAGE}:${TAG_SUFFIX}" \
    --tag "${IMAGE}:${IMAGE_VERSION}" \
    --push \
    --progress plain \
    "${BUILD_CONTEXT}"
  echo "Published ${IMAGE}:${TAG_SUFFIX}"
  echo "Published ${IMAGE}:${IMAGE_VERSION}"
else
  LOCAL_TAG="${PACKAGE_NAME}:ci-${CI_COMMIT_SHORT_SHA:-local}"
  echo "SAFE MODE: building locally as ${LOCAL_TAG} (no push)"
  docker buildx build \
    --file "${DOCKERFILE}" \
    --tag "${LOCAL_TAG}" \
    --load \
    --progress plain \
    "${BUILD_CONTEXT}"
  docker images "${LOCAL_TAG}"
  echo "Build OK. To enable push: set CI_PUBLISH_ENABLED=true in GitLab CI/CD variables."
fi
