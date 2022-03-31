#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z pachama-db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

alembic upgrade heads
python scripts/seed_database.py

exec "$@"



