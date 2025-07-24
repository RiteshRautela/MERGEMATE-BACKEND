

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
/connectionRequestRouter

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