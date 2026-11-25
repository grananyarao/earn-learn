# Earn&Learn

An academic task-reward ecosystem where students complete institutional challenges to earn points and unlock certified courses.

## Features

### Student Portal
- **Task Marketplace:** Browse published academic tasks, filter and search challenges, view deadlines/point rewards, and submit solutions with attachments or project links.
- **Submissions Tracker:** Track submission statuses (`Under Review`, `Graded`, `Revision Requested`, `Rejected`), inspect instructor feedback, and download submission receipts.
- **Premium Courses:** Spend earned points to unlock curated courses, track lesson completion across modules, and learn directly in the course viewer.
- **Points Wallet:** Real-time point balance updates when submissions are approved or courses are unlocked.

### Admin / Instructor Portal
- **Task Management:** Create, publish, save as draft, edit drafts, and delete academic tasks with deadlines, point values, submission limits, and reference attachments.
- **Submission Evaluation:** Filter incoming student submissions (`All`, `Pending`, `Graded`, `Draft`), review submitted work, and approve points, request revisions, or reject submissions with feedback.
- **Schema Blueprint:** Built-in Mongoose schema definitions (`src/models/mongoSchemas.ts`) for backend database integration.

### Authentication & Persistence
- Role-based sign-in for **Student** and **Admin** accounts (with password visibility toggle and one-click Demo Student / Demo Admin access).
- Persistent client-side state backed by `localStorage`.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Motion (`motion`), Lucide Icons (`lucide-react`)
- **Database Models (Reference):** Mongoose schemas in `src/models/mongoSchemas.ts`

## How to Download & Run on Localhost

### 1. Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your computer.
- Download Node.js from [nodejs.org](https://nodejs.org/) (npm is included automatically).
- Verify installation by running:
  ```bash
  node -v
  npm -v

## Other Available Scripts
Command	Description
npm run dev	Starts the Vite dev server on http://localhost:3000
npm run build	Builds the production-ready bundle into dist/
npm run preview	Previews the production build locally
npm run lint	Runs TypeScript type-checking (tsc --noEmit)


## Project Structure

```text
├── index.html
├── metadata.json
├── package.json
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


