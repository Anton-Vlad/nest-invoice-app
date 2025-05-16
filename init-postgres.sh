#!/bin/bash
set -e

# Create a more permissive authentication configuration
cat > "$PGDATA/pg_hba.conf" << EOF
# TYPE  DATABASE        USER            ADDRESS                 METHOD
# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
# Allow all connections from all users with password:
host    all             all             0.0.0.0/0               md5
EOF

# Set proper permissions
chmod 600 "$PGDATA/pg_hba.conf"