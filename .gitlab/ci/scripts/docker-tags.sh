#!/usr/bin/env sh
# Set image tag variables from branch (matches rees46/workflow docker-publish.yaml).
# DEPLOY_REF defaults to main: ansible-deploy has no stage branch.
set -eu

COMMIT_SHA="$(git rev-parse --short HEAD)"
BUILD_DATE="$(date +%s)"

branch="${CI_MERGE_REQUEST_TARGET_BRANCH_NAME:-${CI_COMMIT_BRANCH:-}}"

case "${branch}" in
  master|main)
    TAG_PREFIX=""
    TAG_SUFFIX="latest"
    DEPLOY_REF="${DEPLOY_REF:-main}"
    ;;
  stage)
    TAG_PREFIX="stage-"
    TAG_SUFFIX="stage"
    DEPLOY_REF="${DEPLOY_REF:-main}"
    ;;
  *)
    echo "Branch '${branch}' — using stage image tags; ansible-deploy ref=main" >&2
    TAG_PREFIX="stage-"
    TAG_SUFFIX="stage"
    DEPLOY_REF="${DEPLOY_REF:-main}"
    ;;
esac

IMAGE_VERSION="${TAG_PREFIX}${COMMIT_SHA}-${BUILD_DATE}"
IMAGE_REGISTRY="ghcr.io/rees46"

export TAG_PREFIX TAG_SUFFIX DEPLOY_REF COMMIT_SHA BUILD_DATE IMAGE_VERSION IMAGE_REGISTRY branch

echo "BRANCH=${branch}"
echo "TAG_PREFIX=${TAG_PREFIX}"
echo "TAG_SUFFIX=${TAG_SUFFIX}"
echo "DEPLOY_REF=${DEPLOY_REF}"
echo "COMMIT_SHA=${COMMIT_SHA}"
echo "BUILD_DATE=${BUILD_DATE}"
echo "IMAGE_VERSION=${IMAGE_VERSION}"
echo "IMAGE_REGISTRY=${IMAGE_REGISTRY}"
