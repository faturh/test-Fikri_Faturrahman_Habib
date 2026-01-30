# Menu Management System

A full-stack menu management application featuring a hierarchical tree view, drag-and-drop capabilities (planned), and a premium UI design.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **State Management:** React Context / Local State
- **Icons:** Material Icons

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL (via Neon.tech)
- **ORM:** Prisma
- **Documentation:** Swagger UI

## 📂 Project Structure

```
├── frontend/          # Next.js Frontend Application
│   ├── src/app/       # App Router Pages & Layouts
│   ├── src/components # UI Components (Sidebar, MenuTree, etc.)
│   └── public/        # Static Assets
│
├── backend/           # NestJS Backend API
│   ├── src/menus/     # Menus Module (Controller, Service)
│   ├── prisma/        # Database Schema
│   └── test/          # E2E Tests
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Local or Cloud like Neon.tech)

### 1. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Configure Environment Variables:
Copy `.env.example` to `.env` and update the `DATABASE_URL`:
```bash
cp .env.example .env
```

Generate Prisma Client:
```bash
npx prisma generate
```

Push Database Schema:
```bash
npx prisma db push
```

Run the Server:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```
The API will be available at `http://localhost:3001`.
Swagger Documentation: `http://localhost:3001/api`.

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the Development Server:
```bash
npm run dev
```
The application will be running at `http://localhost:3000`.

## 📚 API Documentation

The backend provides a full Swagger API documentation.
Access it at: `http://localhost:3001/api`

### Core Endpoints
- `GET /menus`: Retrieve the hierarchical menu tree.
- `POST /menus`: Create a new menu item.
- `PATCH /menus/:id`: Update a menu item.
- `DELETE /menus/:id`: Delete a menu item.

## 🎨 Architecture Decisions

- **Recursive Components:** The `MenuTree` component is designed recursively to handle infinite nesting depth of menu items.
- **Tailwind v4:** Utilizes the latest CSS-first configuration for better performance and modern CSS features.
- **Prisma ORM:** Used for type-safe database interactions and easy schema management.
