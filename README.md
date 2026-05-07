# NoteX

NoteX is a notes application for students. The project is organized as a monorepo with a TypeScript/Node.js backend, Firebase configuration, and a Flutter frontend.

## Project Structure

```text
NoteX/
├── client/              # Flutter application
├── firebase/            # Firebase project config, Firestore rules, storage rules, indexes
├── server/              # Node.js + TypeScript backend
└── README.md
```

## Tech Stack

- **Frontend:** Flutter
- **Backend:** Node.js, Express, TypeScript
- **Database/Auth/Storage:** Firebase and MongoDB-ready backend config
- **Validation:** Zod
- **Logging:** Pino
- **Package manager:** pnpm for the backend

## Getting Started

### Prerequisites

Install these tools before working on the project:

- Node.js
- pnpm
- Flutter SDK
- Firebase CLI

### Backend Setup

```bash
cd server
pnpm install
cp .env.example .env
pnpm run dev
```

Useful backend scripts:

```bash
pnpm run dev      # Start the backend in development mode
pnpm run build    # Compile TypeScript to dist/
pnpm run start    # Run the compiled backend
pnpm run lint     # Run ESLint
pnpm run format   # Format files with Prettier
```

> Note: the backend is currently in starter/scaffold stage, so some files may still need implementation before the server runs end to end.

### Flutter App Setup

```bash
cd client
flutter pub get
flutter run
```

The `client/` folder is reserved for the Flutter application. Add platform-specific Firebase files locally as needed, but do not commit secrets or generated build files.

### Firebase Setup

Firebase configuration lives in the `firebase/` folder:

```text
firebase/
├── firebase.json
├── firebase.rules
├── firestore.indexes.json
└── storage.rules
```

Common Firebase commands:

```bash
firebase login
firebase use <project-id>
firebase deploy
```

Keep Firebase service account files and native app config files out of Git. They are already covered by `.gitignore`.

## Environment Variables

Backend environment variables should live in:

```text
server/.env
```

Use `server/.env.example` as the template for local setup. Never commit real secrets.

## Development Notes

- Keep backend source code inside `server/src`.
- Keep Flutter source code inside `client`.
- Keep Firebase rules and indexes in `firebase`.
- Commit lockfiles such as `server/pnpm-lock.yaml` for reproducible installs.
- Generated folders like `dist`, `build`, `.dart_tool`, and `node_modules` should stay untracked.

## License

This project is currently licensed under ISC, matching the backend package metadata.
