# 🌳 Menu Management System

A sophisticated full-stack menu management application featuring a hierarchical tree view, advanced drag-and-drop restructuring, real-time search, and a premium responsive UI.

## ✨ Key Features

- **Hierarchical Tree View:** Infinite nesting capabilities for complex menu structures.
- **Advanced Drag & Drop:** 
  - **Dual-Zone Interaction:** Drag to the top-half of an item to move as a sibling, or the bottom-half to move as a child.
  - **Circular Dependency Protection:** Prevents moving a parent into its own sub-menu.
  - **Visual Feedback:** Dynamic lines (Blue/Emerald) and floating badges indicating depth changes.
- **Real-time Search:** Instantly filter the menu tree while maintaining hierarchy context.
- **Premium UI/UX:** 
  - Glassmorphic design elements.
  - Smooth animations and transitions.
  - Interactive hover states and intuitive iconography.
- **Fully Responsive:** Optimized experience across mobile, tablet, and desktop devices.
- **Form-Based Management:** Rename, move, or delete items via a dedicated detail form.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **State Management:** Redux Toolkit (RTK)
- **Styling:** Tailwind CSS (v4)
- **Icons:** Material Icons (Rounded)
- **Networking:** Axios

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL (Cloud-hosted via Neon.tech)
- **ORM:** Prisma
- **Documentation:** Swagger UI

## 📂 Project Structure

```bash
├── frontend/          # Next.js Frontend Application
│   ├── src/app/       # App Router Pages & Global Layouts
│   ├── src/components # UI Components (Sidebar, MenuTree, MenuForm)
│   ├── src/store/     # Redux Toolkit Slices & Hooks
│   └── src/lib/       # API Configuration & Utilities
│
├── backend/           # NestJS Backend API
│   ├── src/menus/     # Menus Module (Controllers, Services, DTOs)
│   ├── prisma/        # Database Schema & Migrations
│   └── test/          # E2E & Unit Tests
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file based on `.env.example`:
   ```bash
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```
4. Push Database Schema:
   ```bash
   npx prisma db push
   ```
5. Run the Server:
   ```bash
   npm run start:dev
   ```
   *API available at: `http://localhost:3001`*
   *Swagger: `http://localhost:3001/api`*

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Development Server:
   ```bash
   npm run dev
   ```
   *Application available at: `http://localhost:3000`*

## 🎨 Architectural Highlights

- **Recursive Tree Logic:** The system uses a recursive `MenuTree` and `MenuNode` architecture to render complex hierarchies with minimal performance overhead.
- **Drag & Drop Logic:** Built using native HTML5 Drag and Drop API for maximum performance and touch-event compatibility (via polyfills if needed).
- **Atomic State Management:** Redux Toolkit handles the menu state globally, ensuring that search filters and tree updates are reflected instantly across the UI.

---
*Built with ❤️ and Modern Web Technologies.*
