#!/bin/bash

psql -U postgres << EOF
    CREATE DATABASE pachama_dev;
    CREATE DATABASE pachama_test;
EOF
psql -U postgres --dbname pachama_dev -c "CREATE EXTENSION postgis;"
psql -U postgres --dbname pachama_test -c "CREATE EXTENSION postgis;"
psql -U postgres --dbname pachama_dev -c "CREATE EXTENSION pg_trgm;"
psql -U postgres --dbname pachama_test -c "CREATE EXTENSION pg_trgm;"