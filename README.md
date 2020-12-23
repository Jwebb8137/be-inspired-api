<h1>Be-Inspired API</h1>

<img src="https://res.cloudinary.com/dvkqz0fed/image/upload/v1608705451/be-inspired-media/atlassian-icon_2_je54tx.png" width="200"/>

<p>Aiming to create a social media platform geared towards promoting a positive and motivating experience Be-Inspired allows users to post and explore inspiring content uploaded by other users!</p>

## Endpoints

### `GET /api/users`
<p>Retrieve all active users from the database.</p>

### `GET /api/users/:userid`
<p>Retrieve a specific user from the database.</p>

### `POST /api/users`
<p>Create a user and store their information in the database.</p>

### `GET /api/posts`
<p>Retrieve all posts from the database.</p>

### `GET /api/posts/:post_id`
<p>Retrieve a specific post from the database.</p>

### `POST /api/posts`
<p>Create and store a post in the database.</p>

### `GET /api/comments`
<p>Retrieve all comments from the database.</p>

### `GET /api/comments/:post_id`
<p>Retrieve a specific comment realted to a post from the database.</p>

### `POST /api/comments`
<p>Create and store a comment in the database.</p>

### `GET /api/likes`
<p>Retrieve all post likes from the database.</p>

### `GET /api/likes/:post_id`
<p>Retrieve a list of likes related to a post from the database.</p>

### `POST /api/likes`
<p>Create and store a like in the database.</p>

### `POST /api/login`
<p>Send a login request to the database.</p>

### `GET /api/target-info`
<p>Retrieve information for a target user.</p>

### `GET /api/is-verified`
<p>Check if user is authorized / has been issued a token.</p>

## Additional Information
<p>This application was designed and developed as part of a full-stack project that required developing an application using the PERN stack. As my second full-stack project I decided to construct a social media platform that would allow me to gain valuable experience in the overall design and implementation of a more complex database / backend. Accomplishing just that I really enjoyed creating this application, giving me the opportunity to create something I am passionate about!</p>  


