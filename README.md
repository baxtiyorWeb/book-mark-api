<h1 align="center">🎂 Birthmark API</h1>
<p align="center">A secure and lightweight API for storing and managing birthdays of friends, family, and loved ones — built with Express 5, MongoDB, and deployed on Vercel.</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

---


## ✨ Features

- 📅 Create, update, and delete birthday records
- 🧾 JWT-based authentication (optional)
- 📬 Email notifications with **Nodemailer**
- 🔒 CORS + Helmet for security
- 📜 Swagger UI auto-generated API docs
- 🧪 Zod schema validation
- 📈 Logging with Pino
- 🌐 Fully deployable on Vercel
- ⚙️ MongoDB (via Mongoose) integration

---

## 🛠️ Tech Stack

| Purpose             | Package                                     |
|---------------------|---------------------------------------------|
| Web Framework       | [Express 5](https://expressjs.com/en/5x/)   |
| Database            | [Mongoose](https://mongoosejs.com/)         |
| Environment Config  | [dotenv](https://www.npmjs.com/package/dotenv) |
| Validation          | [Zod](https://zod.dev/)                     |
| Logging             | [Pino](https://getpino.io/)                 |
| Security Headers    | [Helmet](https://helmetjs.github.io/)       |
| Cross-Origin Support| [cors](https://www.npmjs.com/package/cors)  |
| Auth                | [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) |
| Email               | [nodemailer](https://nodemailer.com/)       |
| API Docs            | [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) |
| HTTP Requests       | [axios](https://axios-http.com/)            |
| Response Format     | [JSend](https://github.com/omniti-labs/jsend) |
| User-Agent Parser   | [useragent](https://www.npmjs.com/package/useragent) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/birthmark-api.git
cd birthmark-api
```

### 2. Install Dependencies
```bash
bun install
```
 Requires Bun installed. You can also use `npm` or `yarn`.

### 3. Configure Environment Variables
Create `.env` file with your values:
```env
# MAILER
MAILER_USER=
MAILER_PASS=

# Database
DB_USER=
DB_PASS=
DB_ENDPOINT=
DB_NAME=

# Auth
REFRESH_SECRET=
ACCESS_SECRET=
```

### 4. Run the app
```bash
bun dev
```# book-mark-api
