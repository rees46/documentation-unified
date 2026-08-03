#!/usr/bin/env sh
# Resolve GitLab API token for cross-project pipeline triggers (CI_JOB_TOKEN).
set -eu

if [ -z "${CI_JOB_TOKEN:-}" ]; then
  echo "CI_JOB_TOKEN is not set. Deploy jobs must run inside a GitLab CI pipeline." >&2
  echo "Allow this project in devops/ansible-deploy → Settings → CI/CD → Job token permissions." >&2
  exit 1
fi

echo "${CI_JOB_TOKEN}"
