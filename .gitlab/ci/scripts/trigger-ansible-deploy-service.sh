#!/usr/bin/env sh
# Trigger ansible-deploy pipeline for one service via GitLab API.
#
# Safe mode (default): CI_DEPLOY_ENABLED != true → ANSIBLE_CHECK=true
# POSIX sh only (Alpine ash — no bash arrays).
set -eu

: "${SERVICE_NAME:?SERVICE_NAME is required}"
: "${ANSIBLE_DEPLOY_PROJECT:?Set ANSIBLE_DEPLOY_PROJECT}"
: "${DEPLOY_REF:?Set DEPLOY_REF}"

IMAGE_TAG="${IMAGE_TAG:-latest}"
gitlab_token="$(sh .gitlab/ci/scripts/gitlab-api-token.sh)"

if [ "${CI_DEPLOY_ENABLED:-false}" = "true" ]; then
  echo "PRODUCTION MODE: triggering real deploy for ${SERVICE_NAME} (ref=${DEPLOY_REF})"
  http_code="$(curl --silent --show-error \
    --output /tmp/deploy-response.txt \
    --write-out '%{http_code}' \
    --request POST \
    --url "https://gitlab.rees46.ru/api/v4/projects/${ANSIBLE_DEPLOY_PROJECT}/trigger/pipeline" \
    --form "token=${gitlab_token}" \
    --form "ref=${DEPLOY_REF}" \
    --form "variables[FORCE_RUN]=true" \
    --form "variables[DEPLOY_SERVICE]=${SERVICE_NAME}" \
    --form "variables[IMAGE_TAG]=${IMAGE_TAG}")"
else
  echo "SAFE MODE: triggering ansible-deploy with ANSIBLE_CHECK=true for ${SERVICE_NAME} (ref=${DEPLOY_REF})"
  http_code="$(curl --silent --show-error \
    --output /tmp/deploy-response.txt \
    --write-out '%{http_code}' \
    --request POST \
    --url "https://gitlab.rees46.ru/api/v4/projects/${ANSIBLE_DEPLOY_PROJECT}/trigger/pipeline" \
    --form "token=${gitlab_token}" \
    --form "ref=${DEPLOY_REF}" \
    --form "variables[FORCE_RUN]=true" \
    --form "variables[DEPLOY_SERVICE]=${SERVICE_NAME}" \
    --form "variables[IMAGE_TAG]=${IMAGE_TAG}" \
    --form "variables[ANSIBLE_CHECK]=true")"
fi

if [ "${http_code}" -ge 400 ]; then
  echo "Failed to trigger deploy for ${SERVICE_NAME} (HTTP ${http_code}):" >&2
  cat /tmp/deploy-response.txt >&2
  if grep -q 'Reference not found' /tmp/deploy-response.txt 2>/dev/null; then
    echo "Branch '${DEPLOY_REF}' does not exist on ansible-deploy. Create it or re-run with DEPLOY_REF=main." >&2
  else
    echo "If 401/403/404: allow CI job tokens from this project on ansible-deploy (Settings → CI/CD → Job token permissions)." >&2
  fi
  exit 1
fi

cat /tmp/deploy-response.txt
echo ""
