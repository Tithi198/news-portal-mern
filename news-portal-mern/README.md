# DailyScope - Full-Stack News Portal

A complete MERN news portal built with:

- Frontend: React JS, Tailwind CSS, Zustand, React Router, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt
- Features: public news, top 6 news API, single news details, login/register, create news, dashboard, edit/delete own news, profile update, contact form.

---

## 1. Requirements

Install these first:

- Node.js
- MongoDB Community Server or MongoDB Atlas
- VS Code

---

## 2. Folder Structure

```txt
news-portal-mern/
  backend/
  frontend/
```

---

## 3. Backend Setup

Open terminal in the project root:

```bash
cd backend
npm install
copy .env.example .env
```

For macOS/Linux use:

```bash
cp .env.example .env
```

Update `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/news_portal_db
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Optional seed data:

```bash
npm run seed
```

Seed demo login:

```txt
Email: demo@example.com
Password: 123456
```

---

## 4. Frontend Setup

Open a second terminal in the project root:

```bash
cd frontend
npm install
copy .env.example .env
```

For macOS/Linux use:

```bash
cp .env.example .env
```

Run frontend:

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

## 5. API Endpoints

### Auth

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### User

```txt
PUT    /api/users/profile
```

### News

```txt
GET    /api/news
GET    /api/news/top?limit=6
GET    /api/news/:slug
GET    /api/news/my-news
POST   /api/news
PUT    /api/news/:id
DELETE /api/news/:id
```

### Contact

```txt
POST   /api/contact
```

---

## 6. Important Notes

- News image upload is handled by image URL input.
- Only logged-in users can create news.
- Users can edit/delete only their own news.
- The home page calls `/api/news/top?limit=6` to show the top 6 news.
- Contact form messages are saved in MongoDB.
