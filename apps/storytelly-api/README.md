# Storytelly API

This is a Supabase project

## Commands

Start/Stop server

```bash
# Start
nx run storytelly-api:start

# Stop
nx run storytelly-api:stop
```

Status

```bash
nx run storytelly-api:supabase status

# Should reply with
supabase local development setup is running.
         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: <hash>
service_role key: <hash>
```

Start/Stop server

```bash
# Start
nx run storytelly-api:start

# Stop
nx run storytelly-api:stop
```

### Database

Apply the local migrations onto DB

```bash
nx run storytelly-api:supabase db push
```

Reset the database state, replay all migrations from start

```bash
nx run storytelly-api:supabase db reset
```

Do the changes to the remote cloud Supabase project

```bash
# apply migrations to cloud
nx run storytelly-api:supabase db push --linked

# reset the remote DB (carefull!)
nx run storytelly-api:supabase db reset --linked
```

Run a DB diff and create a migration

```bash
nx run storytelly-api:supabase db diff --use-migra -f <migration_name>
```
