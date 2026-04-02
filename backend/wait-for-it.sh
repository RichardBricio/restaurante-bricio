#!/bin/sh
# wait-for-it.sh - Espera um serviço ficar disponível

set -e

host="$1"
shift
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -c '\q' 2>/dev/null; do
  >&2 echo "Postgres está indisponível - aguardando..."
  sleep 2
done

>&2 echo "Postgres está pronto! Iniciando aplicação..."
exec $cmd