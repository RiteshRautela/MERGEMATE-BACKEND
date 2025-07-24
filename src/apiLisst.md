

**Authentication**
/authRouter
* `POST /auth/signup`
* `POST /auth/login`
* `POST /auth/logout`

**User Profile**
/profileRouter
* `GET /profile/view` (View own profile)
* `PATCH /profile/edit` (Edit own profile, excluding password)
* `PATCH /profile/password` (Update own password)

**Connection Management**
/requestRouter 

* `POST /request/send/interested/:userId` (Send "interested" request)
* `POST /request/send/ignored/:userId` (Send "ignored" request)
* `POST /request/review/accepted/:requestId` (Accept incoming request)
* `POST /request/review/rejected/:requestId` (Reject incoming request)

userRouter
* `GET /user/connections` (Get all established connections/matches)
* `GET /user/received` (Get all incoming connection requests)
* `GET /user/feed` (Get a batch of profiles for swiping)

API Structure and Routing with Express Routers

* `In large applications with 30-100+ APIs, writing all endpoints within a single app.js file is an inefficient and poor practice. This approach becomes unmanageable as the API count grows. Instead, we use Express Routers to properly organize and handle routing, categorizing APIs into distinct, logical groups. This significantly improves clarity and manageability.`

For example:
---------------

* `An authRouter would handle authentication-related APIs like POST /auth/signup, POST /auth/login, and POST /auth/logout`.

* `A profileRouter would manage user profile APIs, such as GET /profile/view, PATCH /profile/edit, and PATCH /profile/password.`

* `Similarly, a connectionRequestRouter would handle all APIs related to sending and reviewing connection requests (e.g., POST /request/send/interested/:userId, POST /request/review/accepted/:requestId).`

* `A userRouter would manage general user data and feed-related APIs, such as GET /user/connections, GET /user/received, and GET /user/feed.`




--------------------------------------------------------------------------------------------------------------------------Sure! Here's a clean, well-structured, and markdown-formatted version of your notes for `file.md`:

---

# 📁 Express Routers: Setup & Usage

## 📦 Project Structure

Under the `src` folder, create a `routes` directory:

```
src/
└── routes/
    ├── auth.js
    ├── profile.js
    └── request.js
```

Each file will manage route logic specific to a feature.

---

## 🛠️ Creating an Express Router (Example: `auth.js`)

### 1. Import Express

```js
const express = require('express');
```

### 2. Create the Router

```js
const authRouter = express.Router();
```

### 3. Define Routes

```js
authRouter.post('/signup', (req, res) => {
    // Signup logic here
});

authRouter.post('/login', (req, res) => {
    // Login logic here
});

authRouter.post('/logout', (req, res) => {
    // Logout logic here
});
```

### 4. Export the Router

```js
module.exports = authRouter;
// OR
// module.exports = { authRouter }; // if exporting multiple items
```

---

## 🔁 app.js vs Router Files

In `app.js`, you might typically write:

```js
app.post('/signup', signupHandler);
```

In a router file, it's almost the same:

```js
authRouter.post('/signup', signupHandler);
```

✅ `app.post` and `router.post` behave **exactly the same**.

---

## 🧠 Conceptual Summary

| Concept            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `express()`        | Returns the app instance (`const app = express()`)              |
| `express.Router()` | Creates a new router (`const router = express.Router()`)        |
| `app.use()`        | Mounts middleware or a router to a path                         |
| `router.use()`     | Also mounts middleware; internally managed by Express similarly |

---

## 🔗 Integrating Routers in `app.js`

In `app.js`, import and mount your routers:

```js
const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

// Mount routers
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
```

Now, your code is modular, clean, and scalable. All incoming requests hit `app.js`, and it delegates them to the appropriate routers.

---

--------------------------------------------------------------------------------------------------------------------------



---

# 📁 Express Routers: Setup & Usage

## 📦 Project Structure

Under the `src` folder, create a `routes` directory:

```
src/
└── routes/
    ├── auth.js
    ├── profile.js
    └── request.js
```

Each file will manage route logic specific to a feature.

---

## 🛠️ Creating an Express Router (Example: `auth.js`)

### 1. Import Express

```js
const express = require('express');
```

### 2. Create the Router

```js
const authRouter = express.Router();
```

### 3. Define Routes

```js
authRouter.post('/signup', (req, res) => {
    // Signup logic here
});

authRouter.post('/login', (req, res) => {
    // Login logic here
});

authRouter.post('/logout', (req, res) => {
    // Logout logic here
});
```

### 4. Export the Router

```js
module.exports = authRouter;
// OR
// module.exports = { authRouter }; // if exporting multiple items
```

---

## 🔁 app.js vs Router Files

In `app.js`, you might typically write:

```js
app.post('/signup', signupHandler);
```

In a router file, it's almost the same:

```js
authRouter.post('/signup', signupHandler);
```

✅ `app.post` and `router.post` behave **exactly the same**.

---

## 🧠 Conceptual Summary

| Concept            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `express()`        | Returns the app instance (`const app = express()`)              |
| `express.Router()` | Creates a new router (`const router = express.Router()`)        |
| `app.use()`        | Mounts middleware or a router to a path                         |
| `router.use()`     | Also mounts middleware; internally managed by Express similarly |

---

## 🔗 Integrating Routers in `app.js`

In `app.js`, import and mount your routers:

```js
const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

// Mount routers
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
```

Now, your code is modular, clean, and scalable. All incoming requests hit `app.js`, and it delegates them to the appropriate routers.

---

---------------------------------------------------------------------------------------------------------------------------------------
Perfect! Below is your exact content, cleaned for `.md` file formatting — no changes to wording, just ensuring proper spacing and layout so it renders beautifully in Markdown.

---

```md
---

# 📁 Express Routers: Setup & Usage

## 📦 Project Structure

Under the `src` folder, create a `routes` directory:

```

src/
└── routes/
├── auth.js
├── profile.js
└── request.js

````

Each file will manage route logic specific to a feature.

---

## 🛠️ Creating an Express Router (Example: `auth.js`)

### 1. Import Express

```js
const express = require('express');
````

### 2. Create the Router

```js
const authRouter = express.Router();
```

### 3. Define Routes

```js
authRouter.post('/signup', (req, res) => {
    // Signup logic here
});

authRouter.post('/login', (req, res) => {
    // Login logic here
});

authRouter.post('/logout', (req, res) => {
    // Logout logic here
});
```

### 4. Export the Router

```js
module.exports = authRouter;
// OR
// module.exports = { authRouter }; // if exporting multiple items
```

---

## 🔁 app.js vs Router Files

In `app.js`, you might typically write:

```js
app.post('/signup', signupHandler);
```

In a router file, it's almost the same:

```js
authRouter.post('/signup', signupHandler);
```

✅ `app.post` and `router.post` behave **exactly the same**.

---

## 🧠 Conceptual Summary

| Concept            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `express()`        | Returns the app instance (`const app = express()`)              |
| `express.Router()` | Creates a new router (`const router = express.Router()`)        |
| `app.use()`        | Mounts middleware or a router to a path                         |
| `router.use()`     | Also mounts middleware; internally managed by Express similarly |

---

## 🔗 Integrating Routers in `app.js`

In `app.js`, import and mount your routers:

```js
const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

// Mount routers
app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
```

Now, your code is modular, clean, and scalable. All incoming requests hit `app.js`, and it delegates them to the appropriate routers.

---

---

# 🚦 How Express Routing Works in `app.js`

When you use multiple routers in Express, `app.js` becomes the central place where all requests are received and passed to the correct router.

---

## 📥 Step 1: Import the Routers

```js
// Importing routers
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
```

Each file exports an `express.Router()` instance that handles a specific set of routes.

---

## 🔗 Step 2: Mount the Routers

```js
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
```

This tells Express to pass **all incoming requests** to each router one by one, in the order they are registered.

---

## 🧭 How Express Handles Requests

Express evaluates each router **sequentially**, and the request flows through as follows:

### 🧪 Example: `POST /auth/login`

1. The request first hits `authRouter`.
2. If a matching route like `authRouter.post("/login", ...)` is found, it executes and sends a response.
3. Once a response is sent, Express stops — it doesn’t proceed to other routers.

### 🧪 Example: `GET /profile/view`

1. The request first hits authRouter, which doesn't have a matching route for /profile.
2. It moves to `profileRouter`, where it finds a matching route.
3. That handler executes, responds, and processing stops there.

-------------------------------------------------------------------------------------------------------
logout api .


and 

## 🧾 Update Profile API – Theory Notes

### 🔍 What does this API do?

The **Update Profile API** allows a logged-in user to edit their personal profile information such as name, age, email, etc. It uses the `PATCH` method, which is ideal for partial updates.

---

### ✅ Why do we validate the fields before updating?

To **ensure only allowed fields** are being modified.
Without validation, users could try to update sensitive or restricted fields (like `role`, `password`, etc.).

We do this using a utility function `validateEditProfileData(req)` that checks if all keys in `req.body` are part of a safe, allowed list.

---

### 🔐 Why is authentication needed?

Only an authenticated user should be allowed to edit their profile.
That’s why we use a middleware (like `userAuth`) before the route handler — it verifies the user's token and attaches the user object to `req`.

---

### 🔄 How is the profile data updated?

Instead of hardcoding each field update, we use:

```js
Object.keys(req.body).forEach(key => user[key] = req.body[key])
```

This allows flexible, dynamic updates — it loops through all keys sent from the client and updates only those on the `user` object.

---

### 💾 What happens after updating?

* The updated `user` object is saved to the database using `user.save()`.
* A success response is sent back to the client with a message like:
  `"John, your profile was edited successfully."`

---

### 📦 Summary:

| Step | What Happens                               |
| ---- | ------------------------------------------ |
| 1️⃣  | Auth middleware verifies the user          |
| 2️⃣  | Allowed fields are validated               |
| 3️⃣  | Valid fields are copied to the user object |
| 4️⃣  | Changes are saved to the database          |
| 5️⃣  | A response is sent back to the client      |

---

------------------------------------------------------------------------------------------------

### ✅ Better Way to Send API Response


// ✅ Modern & structured response format (Recommended)
res.json({
  message: `${user.firstName}, your Profile Edited Successfully`,
  data: user
});
```

#### Why it's better:

* Easy for frontend to parse.
* Sends both a success message and relevant data.
* Ideal for APIs — clean, consistent, and extensible.

---

### ❌ Older / Less Structured Way

```js
res.send(user.firstName + " your Profile Edited Successfully");
```

#### Limitations:

* Only sends a string message (no data).
* Harder for frontend to extract or handle data programmatically.

---

📌 **Conclusion:**
Use `res.json()` with structured objects for cleaner, scalable, and frontend-friendly API responses.
