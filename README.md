# Request Manager Web

A modern React UI for the Request Manager Backend API, built with Material-UI, Redux, and TypeScript.

## Features

- **Authentication**: JWT-based login system
- **Request Management**: Create, view, and manage requests
- **Role-based Queues**:
  - **Requestor Queue**: View requests created by you
  - **Manager Queue**: Approve or reject pending requests
  - **Assignee Queue**: View and close requests assigned to you
- **Modern UI**: Clean, responsive Material-UI design
- **State Management**: Redux Toolkit with RTK Query for API calls

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:4001`

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppLayout.tsx
│   ├── ProtectedRoute.tsx
│   ├── RequestList.tsx
│   ├── RequestDetailDialog.tsx
│   ├── ApproveRejectDialog.tsx
│   └── CloseRequestDialog.tsx
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── CreateRequestPage.tsx
│   └── RequestQueuePage.tsx
├── store/               # Redux store and slices
│   ├── store.ts
│   ├── auth-slice.ts
│   ├── request-slice.ts
│   ├── api-slice.ts
│   └── hooks.ts
├── services/            # API service layer
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── token.ts
│   └── format.ts
├── App.tsx
└── index.tsx
```

## API Configuration

The API base URL is configured in:
- `src/services/api.ts` (Axios client)
- `src/store/api-slice.ts` (RTK Query)

Default: `http://localhost:4001/api/v1`

## Authentication

- JWT tokens are stored in `localStorage`
- Tokens expire after 30 minutes
- Automatic redirect to login on 401 errors

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI) 5
- Redux Toolkit
- RTK Query
- React Router
- Axios

