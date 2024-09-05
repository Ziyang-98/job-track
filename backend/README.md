# Set-up

Ensure you have [NodeJS](https://nodejs.org/en/download/) installed on you device.

Run `npm install` to install app dependencies.

# ENV Variables

Ensure that you have a `.env` file containing the following variables:

- `ENV`: The working environment (`DEV` or `PROD`)
- `DB_LOCAL_URI`: MongoDB local URI
- `DB_LOCAL_URI`: MongoDB cloud URI
- `ALLOWED_ORIGIN`: The allowed origin for cross-origin resource sharing (`http://localhost:3000`)

# Start Server

Run `npm run dev` to start server.

In dev environment, server will be hosted on port 8000.

# Deployment

Currently the app is deployed on [Render](https://render.com/).
