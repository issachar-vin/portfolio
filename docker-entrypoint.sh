#!/bin/sh
set -e

# Write runtime env vars into the static config before nginx starts.
# The app reads window.ENV at runtime; import.meta.env is the local dev fallback.
cat > /usr/share/nginx/html/env-config.js <<EOF
window.ENV = {
  MAILFOLIO_URL: "${MAILFOLIO_URL}",
  HCAPTCHA_SITE_KEY: "${HCAPTCHA_SITE_KEY}"
};
EOF

exec nginx -g "daemon off;"
