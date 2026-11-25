# Earn&Learn

An academic task-reward ecosystem built with **React, Express, and MongoDB**, where students complete institutional challenges to earn points and unlock certified courses.

## Features

### Student Portal
- **Task Marketplace:** Browse published academic tasks, search challenges, check deadlines and point rewards, and submit solutions with attachments or project links.
- **Submissions Tracker:** Track submission statuses (`Under Review`, `Graded`, `Revision Requested`, `Rejected`), inspect instructor feedback, and download submission receipts.
- **Premium Courses:** Spend earned points to unlock curated courses, track lesson completion across modules, and learn directly in the course viewer.
- **Points Wallet:** Real-time point balance updates backed by atomic MongoDB transactions when submissions are approved or courses are unlocked.

### Admin / Instructor Portal
- **Task Management:** Create, publish, save as draft, edit drafts, and delete academic tasks with deadlines, point values, submission limits, and reference attachments.
- **Submission Evaluation:** Filter incoming student submissions (`All`, `Pending`, `Graded`, `Draft`), review submitted work, and approve points, request revisions, or reject submissions with feedback.

### Authentication & Database Persistence
- **MongoDB & Mongoose Persistence:** Stores `users`, `tasks`, `submissions`, `courses`, and `pointtransactions` in MongoDB (`server.ts`), with automatic initial seeding of sample tasks and courses on first connection.
- **Secure Auth:** Sign Up and Sign In for Student and Admin accounts with salted `scrypt` password hashing, signed Bearer session tokens, and password visibility toggle.
- **First-Run Admin Setup & Optional Passcode:** On a fresh database (when `ADMIN_PASSCODE` is not set), the first Admin signup claims the primary Admin account; setting `ADMIN_PASSCODE` requires that passcode for any new Admin registration.
- **Demo Student Mode:** One-click preview login for testing the student experience.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion (`motion`), Lucide Icons (`lucide-react`)
- **Backend:** Node.js, Express, TypeScript (`tsx`)
- **Database:** MongoDB with Mongoose

---

## How to Download & Run

### 1. Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18 or higher; includes `npm`) — [nodejs.org](https://nodejs.org/)
- **MongoDB** — either:
  - **Local MongoDB Community Server** (free) — [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community) *(recommended with MongoDB Compass to view collections locally)*, **or**
  - **MongoDB Atlas** (free cloud tier) — [mongodb.com/atlas](https://www.mongodb.com/atlas)

Verify Node.js and npm in your terminal:

```bash
node -v
npm -v
```

### 2. Download the Project

**Option A — Using Git:**

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

**Option B — Download ZIP from GitHub:**
1. Click the green **`<> Code`** button at the top of this GitHub repository.
2. Select **Download ZIP**.
3. Extract the ZIP into a folder **without `&` in the folder name** (for example `earn-learn`).
   > **Windows Note:** Avoid `&` in the folder path (e.g., do not name the folder `earn&learn`), as Windows Command Prompt treats `&` as a command separator when running npm scripts.
4. Open PowerShell or a terminal inside the extracted folder.

### 3. Configure Environment Variables (`.env`)
Create a `.env` file in the project root (next to `package.json`) using `.env.example` as a guide.

**For Local MongoDB Server:**

```env
MONGODB_URI=mongodb://127.0.0.1:27017/earn_learn
ADMIN_PASSCODE=
```

*(Or use your MongoDB Atlas `mongodb+srv://...` URI for `MONGODB_URI`. Setting `ADMIN_PASSCODE` is optional—leave it blank if you want the first Admin registration to claim the primary Admin account.)*

On Windows PowerShell, you can create `.env` directly with:

```powershell
Set-Content -Path .env -Value "MONGODB_URI=mongodb://127.0.0.1:27017/earn_learn"
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Development Server

```bash
npm run dev
```

You should see:

```text
[MongoDB] Connected successfully.
Earn&Learn server running on http://localhost:3000
```

### 6. Open in Your Browser
Go to:

```text
http://localhost:3000
```

- **Students:** Click **Demo Student Mode** for instant access, or use **Sign Up** to register a new Student account.
- **Admins:** Switch to the **Admin** tab to claim the first Admin account (or enter `ADMIN_PASSCODE` if configured) and sign in.
- **Inspect Database (Optional):** Open **MongoDB Compass**, connect to `mongodb://127.0.0.1:27017`, and open the `earn_learn` database to inspect `users`, `tasks`, `submissions`, `courses`, and `pointtransactions`.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Express + Vite full-stack server on `http://localhost:3000` |
| `npm run build` | Builds the frontend production bundle into `dist/` |
| `npm start` | Runs `server.ts` with Node.js (serve production build with `NODE_ENV=production`) |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`) |

## Project Structure

```text
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── context/
    │   └── AppContext.tsx
    ├── data/
    │   └── initialData.ts
    ├── models/
    │   └── mongoSchemas.ts
    ├── types/
    │   └── index.ts
    ├── utils/
    │   └── taskHelpers.ts
    └── components/
        ├── AdminCreateTask.tsx
        ├── AdminSubmissions.tsx
        ├── AdminTasks.tsx
        ├── ApplyTaskModal.tsx
        ├── CourseViewerModal.tsx
        ├── EvaluateSubmissionModal.tsx
        ├── LandingPage.tsx
        ├── MongoSchemaModal.tsx
        ├── Sidebar.tsx
        ├── StudentCourses.tsx
        ├── StudentSubmissions.tsx
        ├── StudentTasks.tsx
        ├── ToastNotification.tsx
        └── TopHeader.tsx
```
