
# IGP College Website

A fully functional and responsive college website built using **Next.js** and **Firebase**. This site is designed for both public visitors and admins to manage academic content, faculty information, notices, and more.

---

## Live Demo

If deployed, access the site here:

https://igp-college-website.vercel.app/

---

## Features

- Admin dashboard with create, update, and delete functionality
- Department, faculty, and course management
- Academic resources upload (Syllabus, PYQs, Test Papers, PDFs)
- Notice board management
- Role-based access (Admin & Public)
- Fully responsive design (Mobile/Desktop)
- Firebase integration: Firestore, Storage, Authentication

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

---

## Getting Started

### Prerequisites

- Node.js v16 or higher
- A Firebase project with Firestore and Storage enabled
- A Firebase service account key (JSON)

---

### Installation

```bash
# Clone the repository
git clone https://github.com/iCoderabhishek/igp-college-website.git
cd igp-college-website

# Install dependencies
npm install
# or
yarn
````

---

### Firebase Setup

Create a `.env.local` file in the project root and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Optional:** Place your Firebase service account JSON file in the root (for admin scripts or tooling). Do not commit this file.

---

### Run Locally

```bash
npm run dev
# or
yarn dev
```

Open your browser and visit:
[http://localhost:3000](http://localhost:3000)

---

## Admin Usage

To access the admin dashboard:

* Log in using a pre-authorized email (configured in Firebase Auth).
* Admin panel allows:

  * Managing departments, courses, and faculty
  * Uploading academic resources by session and semester
  * Creating and updating notices

---

## Folder Structure Overview

```
├─ app/                          # App Router structure
│  ├─ api/                       # REST-like API routes (GET, POST, PUT, DELETE)
│  └─ admin/                     # Admin interface pages
├─ components/                  # Shared UI components
├─ firebase.ts                  # Firebase configuration
├─ types/                       # Global TypeScript types
├─ public/                      # Static assets (logos, PDFs, etc.)
└─ .env.local                   # Environment variables (not tracked)
```

---

## Deployment

You can deploy this project using:

* **Vercel** (Recommended)
* **Firebase Hosting**
* Any platform supporting Next.js

### Deploy to Vercel

1. Push the code to GitHub.
2. Import the repository at [https://vercel.com](https://vercel.com).
3. Add the `.env.local` values to the Vercel Environment Variables settings.
4. Deploy.

---

## Secret Scanning (GitHub Push Block)

If GitHub blocks your push due to committed secrets (e.g., Firebase JSON):

1. Remove the sensitive file:

```bash
git rm --cached ita-college-*.json
echo ita-college-*.json >> .gitignore
git commit -m "Remove sensitive Firebase credentials"
git push --force
```

2. Retry the push after confirming no secrets are committed.

---

## Contributing

If you'd like to contribute:

* Fork the repository
* Create a new branch (`feature/your-change`)
* Submit a Pull Request (PR)

For major changes, please open an issue first to discuss the scope and direction.

---

## Author

Developed and maintained by **Abhishek**
GitHub: [iCoderabhishek](https://github.com/iCoderabhishek)
Starts appriciated!
