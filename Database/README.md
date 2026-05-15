# ArdCom Database Backend

This folder contains the Node.js / SQLite backend for ArdCom.

## Setup

1. Open a terminal in `e:\ArdCom\Database`
2. Run `npm install`
3. Start the server with `npm start`

## What it provides

- `POST /api/signup`
- `POST /api/login`
- `GET /api/user`
- `PUT /api/user/profile`
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart`
- `DELETE /api/cart/:itemId`
- `POST /api/checkout`

The server also serves the static site from the parent `e:\ArdCom` folder.
