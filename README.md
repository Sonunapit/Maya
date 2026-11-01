# MAYA --- My AI, Your Assistant

MAYA is a personal AI assistant built with a React frontend and a
Node.js/Express backend. It helps users with programming, debugging,
learning, technical explanations, and everyday tasks. It uses Google
Gemini for AI responses and Pinecone as a vector database for long-term
conversational memory.

**Created by:** Sonu Kumar\
**Backend:** https://maya-o48q.onrender.com\
**Frontend:** https://maya-mu-ecru.vercel.app/

------------------------------------------------------------------------

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Technology Stack](#technology-stack)
-   [How MAYA Memory Works](#how-maya-memory-works)
-   [Backend Setup](#backend-setup)
-   [Frontend Setup](#frontend-setup)
-   [Environment Variables](#environment-variables)
-   [API Endpoints](#api-endpoints)
-   [Socket.IO](#socketio)
-   [Frontend Routes](#frontend-routes)
-   [MAYA Identity and System
    Instructions](#maya-identity-and-system-instructions)
-   [Deployment](#deployment)
-   [Testing with Postman](#testing-with-postman)
-   [Security Notes](#security-notes)

------------------------------------------------------------------------

## Features

-   AI-powered conversations using Google Gemini (`@google/genai`).
-   Long-term memory using Pinecone vector database.
-   Chat history for returning to previous conversations.
-   User registration and login with JWT authentication.
-   Password hashing using bcrypt.
-   REST API built with Express.
-   Real-time communication using Socket.IO.
-   React single-page application.
-   Protected routes for authenticated users.
-   Profile and settings pages.
-   Progressive Web App (PWA) support.
-   CORS and cookie support for frontend/backend communication.

## Project Structure

The repository contains two main applications:

``` text
MAYA/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── cors.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── chat.controller.js
│   │   ├── db/
│   │   │   └── db.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── chat.model.js
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── chat.routes.js
│   │   ├── services/
│   │   │   ├── ai.service.js
│   │   │   └── vector.service.js
│   │   ├── sockets/
│   │   │   └── sockets.server.js
│   │   └── app.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── animations/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Technology Stack

### Backend

  -----------------------------------------------------------------------
  Technology / Package                Purpose
  ----------------------------------- -----------------------------------
  Node.js                             JavaScript runtime

  Express 5                           Backend REST API

  MongoDB                             Persistent application data

  Mongoose                            MongoDB object modelling

  JSON Web Token (`jsonwebtoken`)     Authentication

  `bcryptjs`                          Password hashing

  Google GenAI (`@google/genai`)      Gemini AI integration

  Pinecone                            Vector database and long-term
  (`@pinecone-database/pinecone`)     memory

  Socket.IO                           Real-time communication

  CORS                                Cross-origin request configuration

  `cookie-parser`                     Cookie parsing

  `dotenv`                            Environment configuration
  -----------------------------------------------------------------------

Backend dependencies:

``` json
{
  "@google/genai": "^1.44.0",
  "@pinecone-database/pinecone": "^7.1.0",
  "bcryptjs": "^3.0.3",
  "cookie": "^1.1.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.3",
  "socket.io": "^4.8.3"
}
```

### Frontend

  Technology / Package   Purpose
  ---------------------- ------------------------------------
  React 18               User interface
  React DOM              Browser rendering
  Vite                   Development server and build tool
  React Router DOM       Client-side routing
  Axios                  HTTP requests
  Socket.IO Client       Real-time backend connection
  React Markdown         Rendering AI responses as Markdown
  Framer Motion          UI animations
  Tailwind CSS 4         Styling
  Vite PWA Plugin        Progressive Web App support

Frontend dependencies:

``` json
{
  "axios": "^1.7.0",
  "framer-motion": "^11.5.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-markdown": "^9.0.1",
  "react-router-dom": "^6.26.0",
  "socket.io-client": "^4.7.5"
}
```

Frontend dev dependencies:

``` json
{
  "@tailwindcss/vite": "^4.0.0",
  "@vitejs/plugin-react": "^4.3.0",
  "tailwindcss": "^4.0.0",
  "vite": "^5.4.0",
  "vite-plugin-pwa": "^2.0.0"
}
```

## How MAYA Memory Works

MAYA uses two kinds of storage for different purposes:

1.  **MongoDB** stores application data such as users, chats, and
    messages.
2.  **Pinecone** stores vector representations of relevant conversation
    information.

The vector service can retrieve semantically related information from
earlier conversations. This gives the assistant a long-term memory
retrieval capability instead of relying only on the current message.

Google Gemini is used for AI generation and embeddings. Pinecone
requires the `PINECONE_API_KEY` environment variable.

> Vector memory is retrieval-based. It does not mean every past message
> is automatically included in every prompt; the backend controls what
> information is stored and retrieved.

## Backend Setup

### Requirements

-   Node.js (LTS recommended)
-   npm
-   MongoDB database (local or MongoDB Atlas)
-   Google Gemini API key
-   Pinecone account and API key

### Install dependencies

Open a terminal in the `Backend` directory:

``` bash
cd Backend
npm install
```

### Configure environment variables

Create a `.env` file inside `Backend/`:

``` env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

Use the exact environment variable names referenced by your backend
source code. If your MongoDB or Gemini variable has a different name in
the code, update the example accordingly.

### Start the backend

``` bash
npm start
```

If your `package.json` does not define a start script, run:

``` bash
node server.js
```

The backend runs locally at:

``` text
http://localhost:3000
```

## Frontend Setup

Open another terminal in the `Frontend` directory:

``` bash
cd Frontend
npm install
```

Create `Frontend/.env`:

``` env
VITE_API_URL=http://localhost:3000
```

Start the Vite development server:

``` bash
npm run dev
```

Vite will print the local frontend URL in the terminal (commonly
`http://localhost:5173`).

The frontend Axios client uses `VITE_API_URL` as its backend base URL
and sends API requests under `/api`.

## Environment Variables

### Backend

  -----------------------------------------------------------------------
  Variable                            Description
  ----------------------------------- -----------------------------------
  `PORT`                              Backend server port; local default
                                      is `3000`

  `MONGODB_URI`                       MongoDB connection string (use the
                                      variable name expected by your
                                      code)

  `JWT_SECRET`                        Secret used to sign and verify JWTs

  `GEMINI_API_KEY`                    Google Gemini API key (use the
                                      exact name expected by
                                      `ai.service.js`)

  `PINECONE_API_KEY`                  Pinecone API key
  -----------------------------------------------------------------------

### Frontend

  Variable         Description
  ---------------- -----------------------------------------------------
  `VITE_API_URL`   Backend origin, for example `http://localhost:3000`

Do not commit real `.env` files, API keys, JWT secrets, database
credentials, or private tokens to GitHub. Commit an `.env.example`
containing placeholder values instead.

## API Endpoints

The backend API is mounted under `/api`.

### Authentication

  Method   Endpoint               Description
  -------- ---------------------- ---------------------
  POST     `/api/auth/register`   Register a new user
  POST     `/api/auth/login`      Log in a user

The login endpoint above follows the backend route naming shown in the
project structure. Confirm the exact path in
`Backend/src/routes/auth.routes.js` before testing.

### Chat

  --------------------------------------------------------------------------
  Method                  Endpoint                   Description
  ----------------------- -------------------------- -----------------------
  POST                    `/api/chat/`               Create/send a chat
                                                     request, according to
                                                     the chat controller
                                                     implementation

  GET                     `/api/chat/`               Get chat history for
                                                     the sidebar

  GET                     `/api/chat/:id/messages`   Get messages for a
                                                     selected chat

  DELETE                  `/api/chat/:id`            Delete a chat
  --------------------------------------------------------------------------

The exact request body and response shape are defined by
`chat.routes.js` and `chat.controller.js`.

## Socket.IO

The backend uses Socket.IO for real-time communication. The frontend
creates a socket connection to the backend origin and sends the JWT
token in the Socket.IO authentication payload.

Example frontend connection:

``` js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token"),
  },
});
```

The actual event names and payload shapes should match
`Backend/src/sockets/sockets.server.js` and the frontend chat
implementation.

## Frontend Routes

The React application uses React Router DOM with guest-only and
protected routes.

  Route         Access          Page
  ------------- --------------- ----------------------
  `/welcome`    Guest only      Landing page
  `/login`      Guest only      Login / registration
  `/`           Authenticated   Chat
  `/settings`   Authenticated   Settings
  `/profile`    Authenticated   Profile
  `*`           Redirect        Redirects to `/`

Route configuration pattern:

``` jsx
<Routes>
  <Route
    path="/welcome"
    element={<GuestOnly><Landing /></GuestOnly>}
  />

  <Route
    path="/login"
    element={<GuestOnly><AuthPage /></GuestOnly>}
  />

  <Route element={<Protected />}>
    <Route path="/" element={<Chat />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/profile" element={<Profile />} />
  </Route>

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
```

`GuestOnly`, `Protected`, and `Landing` must be implemented and imported
by the application. This route example documents the intended route
design; adapt it to the actual components in `App.jsx`.

## MAYA Identity and System Instructions

MAYA follows this identity:

-   **Name:** MAYA
-   **Full form:** My AI, Your Assistant
-   **Creator:** Sonu Kumar
-   **Purpose:** Personal Intelligent AI Assistant

When asked who it is, MAYA should respond:

> I am MAYA (My AI, Your Assistant), an intelligent AI assistant created
> by Sonu Kumar.

### Responsibilities

1.  Help users with programming and coding.
2.  Explain complex concepts in simple language.
3.  Debug and fix programming errors.
4.  Generate clean, readable, and optimized code.
5.  Help with frontend and backend development.
6.  Assist with databases, APIs, and system design.
7.  Help with education, career, and everyday tasks.

The backend AI service is responsible for passing the system
instructions to the Gemini model.

## Deployment

### Backend --- Render

Deployed backend:

https://maya-o48q.onrender.com

Set the required backend environment variables in the Render service
dashboard. Configure CORS to allow the deployed frontend origin and any
local development origin required by your workflow.

### Frontend --- Vercel

Deployed frontend:

https://maya-mu-ecru.vercel.app/

Set the frontend environment variable in Vercel:

``` env
VITE_API_URL=https://maya-o48q.onrender.com
```

Redeploy the frontend after changing environment variables.

### CORS and Cookies

Because the frontend and backend are deployed on different domains:

-   The backend must allow the exact frontend origin.
-   Credentialed requests require `credentials: true` in the backend
    CORS configuration.
-   The frontend Axios client must use `withCredentials: true` when
    cookie authentication is required.
-   Cross-site cookies generally need suitable `SameSite=None` and
    `Secure` settings over HTTPS.
-   Do not use `origin: "*"` together with credentialed requests.

## Testing with Postman

For local testing, start the backend on port `3000`.

### Register

``` http
POST http://localhost:3000/api/auth/register
Content-Type: application/json
```

Use the JSON body required by your registration controller. Example
only:

``` json
{
  "email": "user@example.com",
  "password": "your_password",
  "fullname": {
    "firstname": "Test",
    "lastname": "User"
  }
}
```

### Login

``` http
POST http://localhost:3000/api/auth/login
Content-Type: application/json
```

Use the exact login path defined in `auth.routes.js`. The earlier test
URL `http://localhost/3000/api/login` is malformed; the likely route, if
configured as described above, is
`http://localhost:3000/api/auth/login`.

### Chat API

``` http
POST   http://localhost:3000/api/chat/
GET    http://localhost:3000/api/chat/
GET    http://localhost:3000/api/chat/:id/messages
DELETE http://localhost:3000/api/chat/:id
```

For protected endpoints, send the JWT as a Bearer token if the backend
authentication middleware expects it:

``` http
Authorization: Bearer YOUR_JWT_TOKEN
```

## Security Notes

-   Keep `.env` files out of version control.
-   Use a strong, private `JWT_SECRET`.
-   Never expose `GEMINI_API_KEY` or `PINECONE_API_KEY` in frontend
    code.
-   Validate and sanitize incoming API data on the backend.
-   Hash passwords before saving them.
-   Restrict CORS to trusted frontend origins.
-   Protect private chat and user routes with authentication middleware.
-   Do not store sensitive personal information in vector memory unless
    there is a clear need and appropriate user consent.

------------------------------------------------------------------------

## Author

**Sonu Kumar**\
Creator of **MAYA --- My AI, Your Assistant**

Frontend: https://maya-mu-ecru.vercel.app/\
Backend: https://maya-o48q.onrender.com
