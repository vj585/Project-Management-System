# Full Stack Project Management System

A robust, full-stack project management application featuring a shared backend API that powers both a React-based web dashboard and a native React Native (Expo) mobile application.

## 🚀 Features

- **Unified Backend:** A single Node.js/Express REST API serving both platforms.
- **Cross-Platform Synchronization:** Changes made on the web reflect on mobile, and vice-versa.
- **Secure Authentication:** JWT-based auth, bcrypt password hashing, and Expo SecureStore for mobile token storage.
- **Web App (React + Vite):** Responsive UI, Tailwind CSS glassmorphism aesthetics, Zod validation.
- **Mobile App (React Native):** Native navigation, pull-to-refresh mechanics, native alerts, fluid UI.
- **Robust Database:** PostgreSQL paired with Prisma ORM for type-safe database queries.

---

## 📁 Repository Structure

```text
project-management-system/
├── backend/       # Node.js, Express, Prisma, PostgreSQL
├── web/           # React, Vite, Tailwind CSS, Axios
├── mobile/        # React Native, Expo, React Navigation
└── README.md
```

---

## 🛠️ Environment Variables Documentation

Before running the applications, you need to configure environment variables.

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
# The port the Express server will run on
PORT=5000

# Your PostgreSQL connection string. Update user, password, and db_name.
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pms_db?schema=public"

# Secret key used for signing JWT tokens (use a strong random string in production)
JWT_SECRET="super_secret_jwt_key_for_development_only"

# JWT token expiration time
JWT_EXPIRES_IN="7d"

# Allowed CORS origin (use '*' for dev, specific domains for prod)
CORS_ORIGIN="*"
```

### Web (`web/.env`)
Create a `.env` file in the `web/` directory:

```env
# URL for the backend API
VITE_API_URL="http://localhost:5000/api"
```

### Mobile
*(No .env file strictly required for local dev, but you must ensure `API_URL` in `mobile/src/api/axios.js` points to your machine's local IP address instead of localhost, e.g., `http://192.168.1.X:5000/api`)*.

---

## 🗄️ Database Setup Instructions

1. Ensure you have **PostgreSQL** installed and running on your machine.
2. Ensure your `DATABASE_URL` inside `backend/.env` is correct.
3. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
4. Run the Prisma migration to automatically create the database tables:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Generate the Prisma Client (if not already done):
   ```bash
   npx prisma generate
   ```

---

## ⚙️ Project Setup & Run Instructions

### 1. Running the Backend
```bash
cd backend
npm install
npm run build
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 2. Running the Web Application
```bash
cd web
npm install
npm run dev
```
*The web app will start on `http://localhost:5173`.*

### 3. Running the Mobile Application
```bash
cd mobile
npm install
npx expo start
```
*Scan the generated QR code using the **Expo Go** app on your Android or iOS device.*
> **Important:** To run the mobile app against a locally hosted backend on a physical device, change `API_URL` in `mobile/src/api/axios.js` to your computer's local IP address (e.g., `192.168.x.x`).

---

## 📖 API Documentation

The backend exposes a RESTful JSON API prefixed with `/api`. All protected routes require an `Authorization: Bearer <token>` header.

### Authentication
- `POST /api/auth/register` - Register a new user (Body: `fullName`, `email`, `password`)
- `POST /api/auth/login` - Authenticate a user (Body: `email`, `password`)
- `POST /api/auth/logout` - Invalidate current session (Client-side token deletion)
- `GET /api/auth/me` - Get current authenticated user profile (Protected)

### Projects (Protected)
- `GET /api/projects` - Get all projects owned by the user. Supports `?search=xyz` and `?status=IN_PROGRESS`.
- `GET /api/projects/:id` - Get specific project details.
- `POST /api/projects` - Create a project (Body: `name`, `description`, `status`, `startDate`, `endDate`).
- `PUT /api/projects/:id` - Update a project.
- `DELETE /api/projects/:id` - Delete a project.

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks. Supports filters: `?search`, `?status`, `?priority`, `?projectId`.
- `GET /api/tasks/:id` - Get specific task details.
- `POST /api/tasks` - Create a task (Body: `projectId`, `name`, `description`, `priority`, `status`, `dueDate`).
- `PUT /api/tasks/:id` - Update a task.
- `DELETE /api/tasks/:id` - Delete a task.

### Dashboard (Protected)
- `GET /api/dashboard` - Get aggregated statistics for the current user (total projects, tasks in progress, completed, etc.)

---

## 🚀 Deployment Instructions

### Deploying the Backend
1. Provision a PostgreSQL database (e.g., Supabase, Neon, AWS RDS).
2. Host the Node.js API on platforms like Render, Heroku, or Vercel.
3. Set the `DATABASE_URL` and `JWT_SECRET` environment variables in your hosting provider's dashboard.
4. Run `npx prisma migrate deploy` during the build step.

### Deploying the Web App
1. Set the `VITE_API_URL` environment variable to point to your live backend URL.
2. Run `npm run build` to generate static files.
3. Host the `dist` folder on Vercel, Netlify, or GitHub Pages.

### Deploying the Mobile App
1. Update the `API_URL` in `mobile/src/api/axios.js` to point to your live deployed backend URL.
2. Build the Android APK or AAB using EAS (Expo Application Services):
   ```bash
   npx eas build -p android --profile production
   ```
3. Distribute the APK or upload the AAB to the Google Play Console.
