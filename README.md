# Candle Orders

A simple demo application that allows users to place candle gift box orders on [Monday.com](https://monday.com/).

## Running locally

### Install dependencies:

```sh
bun install
```

### Set up your environment:

```sh
echo "DATABASE_URL=postgres://localhost:5432/fragrances" > .env
echo "VITE_MONDAY_TOKEN=your_api_key" >> .env
```

### Run database migrations:

```sh
bun run migrate
```

### Start the development servers:

Start the API server:

```sh
bun run src/api/server.js
```

Start the client:

```sh
bun run dev
```
