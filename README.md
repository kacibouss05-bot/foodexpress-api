# FoodExpress API

REST API for restaurant and menu management using Node.js, Express, MongoDB, and Swagger.

## Scope

Implemented in this branch:

- `GET /api/restaurants` with pagination and sorting by `name` or `address`
- `GET /api/restaurants/:id`
- `POST /api/restaurants`
- `PUT /api/restaurants/:id`
- `DELETE /api/restaurants/:id`
- `GET /api/menus` with pagination and sorting by `price` or `category`
- `GET /api/menus/:id`
- `POST /api/menus`
- `PUT /api/menus/:id`
- `DELETE /api/menus/:id`
- Swagger UI at `/api-docs`

Users and authentication are intentionally left for the teammate owning that part. Write routes already declare Bearer auth in Swagger, but no auth middleware is attached yet.

## Install

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/foodexpress
```

## Run

```bash
npm run dev
```

or:

```bash
npm start
```

## Useful Query Examples

```text
GET /api/restaurants?page=1&limit=10&sort=name&order=asc
GET /api/restaurants?address=paris&sort=address
GET /api/menus?page=1&limit=10&sort=price&order=desc
GET /api/menus?category=pizza
```

## Tests

```bash
npm test
```
