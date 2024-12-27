# Apparel Vendor API

A REST API service built with Node.js and TypeScript for managing apparel inventory and order processing.

## Features

- Manage apparel inventory with size-specific stock levels and prices
- Update stock quantities and prices individually or in bulk
- Check order fulfillment possibility
- Calculate lowest possible cost for orders
- Retrieve complete inventory data
- Persistent data storage using local JSON file

## Tech Stack

- Node.js
- TypeScript
- Express.js
- File-based JSON storage

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone 
cd apparel-vendor-api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start on port 3000 (configurable via PORT environment variable).

## Project Structure

```
apparel-vendor-api/
├── src/
│   ├── types/        # TypeScript interfaces
│   ├── services/     # Business logic
│   ├── controllers/  # Request handlers
│   ├── routes/       # API routes
│   └── app.ts        # Application entry point
├── data/            # Data storage
├── dist/            # Compiled JavaScript
└── tests/           # Test files
```

## API Endpoints

### Get All Apparel
```http
GET /api/apparel
```

### Update Single Stock
```http
PUT /api/apparel/stock
Content-Type: application/json

{
    "code": "SHIRT001",
    "size": "L",
    "quantity": 10,
    "price": 29.99
}
```

### Bulk Update Stock
```http
PUT /api/apparel/stock/bulk
Content-Type: application/json

[
    {
        "code": "SHIRT001",
        "size": "M",
        "quantity": 15,
        "price": 29.99
    },
    {
        "code": "PANT001",
        "size": "L",
        "quantity": 8,
        "price": 49.99
    }
]
```

### Check Order Fulfillment
```http
POST /api/apparel/order/check
Content-Type: application/json

{
    "items": [
        {
            "code": "SHIRT001",
            "size": "L",
            "quantity": 2
        }
    ]
}
```

### Calculate Order Cost
```http
POST /api/apparel/order/cost
Content-Type: application/json

{
    "items": [
        {
            "code": "SHIRT001",
            "size": "L",
            "quantity": 2
        }
    ]
}
```

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build production-ready code
- `npm start`: Run production server
- `npm run lint`: Run ESLint
- `npm test`: Run tests

## Data Persistence

The API stores all data in a JSON file located at `data/inventory.json`. This file is automatically created when the server starts if it doesn't exist. The data persists across server restarts.

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Missing data
- Server errors
- File system errors

## Development

1. Start the development server:
```bash
npm run dev
```

2. Make changes to the TypeScript files in the `src/` directory

3. The server will automatically restart when files change

## Building for Production

1. Compile TypeScript to JavaScript:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```