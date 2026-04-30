# BPOMate

BPOMate is a Premium AI-powered BPOM test parameter recommendation system.
This project has been migrated to use a React frontend (Vite) and an Express backend with a PostgreSQL database.

## Prerequisites
- Node.js (v18+)
- PostgreSQL (v14+)

## Database Setup
1. Create a local PostgreSQL database (e.g., `bpomate`).
2. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```
3. Create a `.env` file in the `server` directory with your database credentials:
   ```env
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bpomate
   PORT=5000
   ```
4. Run the database migration script to create the tables and seed the BPOM regulatory data:
   ```bash
   npm run migrate
   ```

## Running the Application

### Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### Frontend (Client)
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React app:
   ```bash
   npm run dev
   ```

## Deploying to GitHub
To push this project to your GitHub repository, run the following commands in the root `bpomate` directory:
```bash
git init
git add .
git commit -m "Initial commit for BPOMate React and Postgres transition"
git branch -M main
git remote add origin https://github.com/Frich1-1/BPOMate.git
git push -u origin main
```
