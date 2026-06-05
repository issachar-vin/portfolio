#!/bin/sh
set -e

# Write runtime client config before nginx starts
cat > /usr/share/nginx/html/env-config.js <<EOF
window.ENV = {
  MAILFOLIO_URL: "${MAILFOLIO_URL}",
  HCAPTCHA_SITE_KEY: "${HCAPTCHA_SITE_KEY}"
};
EOF

exec nginx -g "daemon off;"
