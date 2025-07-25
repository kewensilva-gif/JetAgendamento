#!/bin/sh
# entrypoint.sh

# Garante que o script pare se um comando falhar
set -e

# 1. Aplica as migrações do Prisma
echo "Applying Prisma migrations..."
npx prisma migrate deploy

# 2. Executa o comando principal do contêiner
# O "$@" pega os argumentos passados para o entrypoint.
# No caso do serviço 'api', será o CMD do Dockerfile ("node", "dist/server.js").
# No caso do serviço 'worker', será o 'command' do docker-compose.yml ("npm", "run", "start:worker").
echo "Starting the main command..."
exec "$@"