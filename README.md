# PeoplePay360 — Integrated HR & Payroll Operations Platform

PeoplePay360 is a full-featured, enterprise HR & Payroll management platform inspired by Odoo 18. It covers the entire employee lifecycle: Directory, Contracts, Working Schedules, Live Attendance & Geolocation Check-in, Time Off (Leave Requests, Allocations & Types), and end-to-end Payroll Operations (Configurable Salary Rules, Structure Templates, Batch Payruns, and PDF Payslip generation).

---

## 🏗️ Project Architecture

This repository is organized as a clean monorepo:

```
PeoplePay360/
├── docs/                                  # Project specifications, diagrams & references
│   ├── HRMS OXP - 24 hours.excalidraw     # High-level architecture & wireframe diagram
│   ├── PeoplePay360 HR & Payroll.pdf      # Complete PRD & technical specification
│   ├── PeoplePay360_Hackathon_Plan.pdf    # Implementation & milestone plan
│   └── screenshots/                       # UI design specifications & references
│
├── server/                                # Express.js REST API Backend
│   ├── config/                            # Database (MongoDB Atlas) & Mailer (Nodemailer)
│   ├── controllers/                       # Auth & User administration controllers
│   ├── middleware/                        # JWT authentication & role-based access control
│   ├── models/                            # Mongoose schemas (User, Role, etc.)
│   ├── routes/                            # Route endpoints (/api/auth, /api/users, /api/health)
│   ├── scripts/                           # Database seed scripts
│   ├── .env.example                       # Backend environment template
│   └── server.js                          # Express app entrypoint
│
├── client/                                # React 18 + Vite Frontend
│   ├── public/                            # Static assets (Favicon, etc.)
│   ├── src/
│   │   ├── api/                           # Axios client & HTTP interceptors
│   │   ├── components/
│   │   │   ├── common/                    # Reusable UI widgets (DataTable, KpiCard, PageHeader, etc.)
│   │   │   └── layout/                    # Shell, Navbar, Sidebar & Topbar
│   │   ├── context/                       # React context (AuthContext & state)
│   │   ├── pages/                         # Domain-driven modular page components
│   │   │   ├── attendance/                # Check-in/out, logs, and geolocation
│   │   │   ├── auth/                      # Login & role-switching interface
│   │   │   ├── contracts/                 # Employment terms, wage & schedules
│   │   │   ├── dashboard/                 # Analytics, quick actions & role KPIs
│   │   │   ├── employees/                 # Employee directory & profile view
│   │   │   ├── payroll/                   # Payruns, Payslips, Rules & Structures
│   │   │   ├── schedules/                 # Working hours & shift definitions
│   │   │   ├── timeoff/                   # Requests, allocations & policy types
│   │   │   └── users/                     # System user management & RBAC
│   │   ├── services/                      # Local reactive data store & initial fixtures
│   │   └── utils/                         # PDF generator (html2canvas + jsPDF), salary evaluator
│   ├── .env.example                       # Frontend environment template
│   └── vite.config.js                     # Vite configuration with '@/' path alias
│
├── package.json                           # Root workspace orchestration scripts
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas** or local MongoDB instance

### 2. Install Dependencies
Install dependencies for both client and server from the root directory:
```bash
npm run install:all
```

### 3. Setup Environment Variables
Configure backend environment variables:
```bash
cp server/.env.example server/.env
```
Update `server/.env` with your MongoDB URI, JWT Secret, and SMTP credentials.

### 4. Run Development Servers
You can run the frontend and backend concurrently or in separate terminals:

- **Backend (Port 5000)**:
  ```bash
  npm run dev:server
  ```
- **Frontend (Port 5173)**:
  ```bash
  npm run dev:client
  ```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 👥 Demo Accounts & Role-Based Access Control

The platform includes 5 pre-configured demo profiles for testing role-specific features:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@peoplepay360.com` | `admin123` | Full system access & User management |
| **HR Manager** | `hrmanager@peoplepay360.com` | `admin123` | Employees, Contracts, Schedules, Time Off approvals |
| **HR Payroll Manager** | `payrollmgr@peoplepay360.com` | `admin123` | Full Payroll, Payruns, Salary Structures & Rules |
| **HR Payroll User** | `payrollusr@peoplepay360.com` | `admin123` | Payrun computation, Payslips |
| **Employee** | `employee@peoplepay360.com` | `admin123` | Self-Service profile, Attendance, Time Off, Payslips |

---

## 📜 Scripts Reference

- `npm run dev:client` — Starts the Vite frontend dev server on port 5173
- `npm run dev:server` — Starts the Express backend server with node watch on port 5000
- `npm run install:all` — Installs dependencies across root, server, and client
- `npm --prefix client run build` — Builds the production frontend bundle
