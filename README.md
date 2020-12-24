<h1>Be-Inspired API</h1>

<img src="https://res.cloudinary.com/dvkqz0fed/image/upload/v1608705451/be-inspired-media/atlassian-icon_2_je54tx.png" width="200"/>

<p>Aiming to create a social media platform geared towards promoting a positive and motivating experience Be-Inspired allows users to post and explore inspiring content uploaded by other users!</p>

## Endpoints

### Get Users

Retrieve all active users from the database.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
[
    {
      "id": 1,
      "username": "user1",
      "user_password": "abc123",
      "first_name": "user",
      "last_name": "account"
    },
        {
      "id": 2,
      "username": "user2",
      "user_password": "321cba",
      "first_name": "user2",
      "last_name": "account2"
    },
        {
      "id": 3,
      "username": "user3",
      "user_password": "789zxy",
      "first_name": "user3",
      "last_name": "account3"
    }
]
```

### Get User By Id

Retrieve a specific user from the database.

**URL** : `/api/users/:userid`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  {
    "id": 1,
    "username": "user1",
    "user_password": "abc123",
    "first_name": "user",
    "last_name": "account"
  }
```

### Create A User

Create a user and store their information in the database.

**URL** : `/api/users/:userid`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Sample Request Object 

```json
  {
    "username": "user1",
    "user_password": "abc123",
    "first_name": "user",
    "last_name": "account"
  }
```

## Success Response
**Code** : `201 OK`

### Get Posts

Retrieve all active users from the database.

**URL** : `/api/posts/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  [
    {
      "id": 1,
      "post_uploader_id": "2",
      "date_created": "2020-12-22 06:33:36.53617+00",
      "post_description": "This is an example of a post description!",
      "content_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/episivbvc6eygymc9mk6.jpg"
    },
    {
      "id": 2,
      "post_uploader_id": "4",
      "date_created": "2020-12-23 09:43:36.53617+00",
      "post_description": "This is another example of a post description!",
      "content_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asdivjwer872u3riojsd.jpg"
    },
    {
      "id": 3,
      "post_uploader_id": "5",
      "date_created": "2020-12-24 03:54:36.53617+00",
      "post_description": "This is a third example of a post description!",
      "content_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asdf84cv84asg98u09wer.jpg"
    }
  ]
```

### Get Posts By A Specific User Id

Retrieve a specific post from the database.

**URL** : `/api/posts/:UserId`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  {
    "id": 3,
    "post_uploader_id": "5",
    "date_created": "2020-12-24 03:54:36.53617+00",
    "post_description": "This is a third example of a post description!",
    "content_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asdf84cv84asg98u09wer.jpg"
  }
```

### Create A Post

Create a post and store the information in the database.

**URL** : `/api/posts`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Sample Request Object 

```json
  {
    "post_uploader_id": "4",
    "post_description": "This is another example of a post description!",
    "content_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asdivjwer872u3riojsd.jpg"
  }
```

## Success Response
**Code** : `201 OK`

### Get Comments

Retrieve all comments from the database.

**URL** : `/api/comments/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  [
    {
      "id": 1,
      "comment": "This is an example comment",
      "date_commented": "2020-12-22 06:33:36.53617+00",
      "post_id": "1",
      "user_id": "6",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/episivbvc6eygymc9mk6.jpg",
      "username": "User1"
    },
    {
      "id": 2,
      "comment": "This is another example comment",
      "date_commented": "2020-12-24 05:11:36.53617+00",
      "post_id": "2",
      "user_id": "4",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asv98qu4jtoija80g09asud.jpg",
      "username": "User2"
    },
    {
      "id": 3,
      "comment": "This is a third example comment",
      "date_commented": "2020-12-23 09:53:36.53617+00",
      "post_id": "3",
      "user_id": "5",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/as98gjoasjg8qj3tsad.jpg",
      "username": "User3"
    }
  ]
```

### Get Comments By A Specific Post Id

Retrieves a list of comments from the database relating to a specific post id.

**URL** : `/api/comments/:post_id`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  [
    {
      "id": 1,
      "comment": "This is an example comment",
      "date_commented": "2020-12-22 06:33:36.53617+00",
      "post_id": "1",
      "user_id": "6",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/episivbvc6eygymc9mk6.jpg",
      "username": "User1"
    },
    {
      "id": 2,
      "comment": "This is another example comment",
      "date_commented": "2020-12-24 05:11:36.53617+00",
      "post_id": "1",
      "user_id": "4",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/asv98qu4jtoija80g09asud.jpg",
      "username": "User2"
    },
    {
      "id": 3,
      "comment": "This is a third example comment",
      "date_commented": "2020-12-23 09:53:36.53617+00",
      "post_id": "1",
      "user_id": "5",
      "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/as98gjoasjg8qj3tsad.jpg",
      "username": "User3"
    }
  ]
```

### Create A Comment

Create a comment and store it in the database.

**URL** : `/api/comments`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Sample Request Object 

```json
  {
    "comment": "This is a third example comment",
    "post_id": "1",
    "user_id": "5",
    "user_img_url": "https://res.cloudinary.com/dvkqz0fed/image/upload/v1608618987/be-inspired-media/as98gjoasjg8qj3tsad.jpg",
    "username": "User3"
  }
```

## Success Response
**Code** : `201 OK`

### Get Likes

Retrieve all likes from the database.

**URL** : `/api/likes/`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  [
    {
      "post_id": 1,
      "post_user_like_id": "3"
    },
    {
      "post_id": 2,
      "post_user_like_id": "2"
    },
    {
      "post_id": 3,
      "post_user_like_id": "1"
    }
  ]
```

### Get Likes By A Specific Post Id

Retrieves a list of likes from the database relating to a specific post id.

**URL** : `/api/likes/:post_id`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Success Response**

```json
  [
        {
      "post_id": 1,
      "post_user_like_id": "3"
    },
    {
      "post_id": 1,
      "post_user_like_id": "2"
    },
    {
      "post_id": 1,
      "post_user_like_id": "1"
    }
  ]
```

### Create A Like

Create a like and store it in the database.

**URL** : `/api/likes`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Sample Request Object 

```json
  {
    "post_id": 1,
    "post_user_like_id": "1"
  }
```

## Success Response
**Code** : `201 OK`

### User Login

Logs in user and issues token.

**URL** : `/api/login`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

## Sample Request Object 

```json
  {
    "username": "TestUser",
    "passwordInput": "Testing123!"
  }
```

## Success Response
**Code** : `201 OK`

## Failure Response
**Code** : `401 Unauthorized`

User is issued an active token

## Additional Information
<p>This application was designed and developed as part of a full-stack project that required developing an application using the PERN stack. As my second full-stack project I decided to construct a social media platform that would allow me to gain valuable experience in the overall design and implementation of a more complex database / backend. Accomplishing just that I really enjoyed creating this application, giving me the opportunity to create something I am passionate about!</p>  


