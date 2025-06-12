# wav

## Project Setup Instructions

```sh
npm install
npm run build
cp -r dist server/public
```

## Add your connection string
create .env
```
DATABASE_URL=<YOUR_CONNECTION_STRING>
```

## Make a migration
```
npx prisma migrate dev
```

## Run Server

```sh
npm run start
```

Create a .env file and copy "DATABASE_URL=postgresql://neondb_owner:npg_HNxzd8kM7qXj@ep-blue-darkness-a8ugynnn-pooler.eastus2.azure.neon.tech/neondb?sslmode=require" into it. 

Open localhost:{server port #}/
