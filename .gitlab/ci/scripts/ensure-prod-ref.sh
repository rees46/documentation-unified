#!/usr/bin/env sh
# Hard guard: refuse ghcr publish / production deploy on non-production refs.
# Usage: ensure-prod-ref.sh publish|deploy
#
# Allowed refs: CI_DEFAULT_BRANCH, stage, and optional CI_PROD_EXTRA_REFS (space-separated).
# Blocks merge_request_event pipelines even if CI_*_ENABLED was set manually.
set -eu

mode="${1:-}"
if [ "$mode" != "publish" ] && [ "$mode" != "deploy" ]; then
  echo "Usage: ensure-prod-ref.sh publish|deploy" >&2
  exit 1
fi

if [ "$mode" = "publish" ]; then
  enabled="${CI_PUBLISH_ENABLED:-false}"
  action="publish"
else
  enabled="${CI_DEPLOY_ENABLED:-false}"
  action="deploy"
fi

if [ "$enabled" != "true" ]; then
  exit 0
fi

if [ "${CI_PIPELINE_SOURCE:-}" = "merge_request_event" ]; then
  echo "ERROR: ${action} blocked — merge request pipelines must not ${action} to production" >&2
  exit 1
fi

ref="${CI_COMMIT_REF_NAME:-unknown}"
default="${CI_DEFAULT_BRANCH:-master}"

is_allowed=false
for candidate in "$default" stage ${CI_PROD_EXTRA_REFS:-}; do
  [ -n "$candidate" ] || continue
  if [ "$ref" = "$candidate" ]; then
    is_allowed=true
    break
  fi
done

if [ "$is_allowed" != "true" ]; then
  extra=""
  [ -n "${CI_PROD_EXTRA_REFS:-}" ] && extra=", ${CI_PROD_EXTRA_REFS}"
  echo "ERROR: ${action} blocked — ref '${ref}' is not production (allowed: ${default}, stage${extra})" >&2
  echo "  pipeline=${CI_PIPELINE_SOURCE:-} commit=${CI_COMMIT_SHA:-}" >&2
  exit 1
fi

echo "Production ${action} allowed on ref '${ref}' (pipeline=${CI_PIPELINE_SOURCE:-})"
