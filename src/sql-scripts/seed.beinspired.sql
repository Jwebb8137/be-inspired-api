BEGIN;

INSERT INTO users
    (username, first_name, last_name, user_password, profile_img_url)
VALUES
  ('user1', 'Joanas', 'Schmidt', 'password', 'www.cloudinary.com/profile-img1'),
  ('user2', 'Devon', 'Butler', 'password', 'www.cloudinary.com/profile-img1'),
  ('user3', 'Aaron', 'Despotato', 'password', 'www.cloudinary.com/profile-img1'),
  ('user4', 'Brad', 'Stevens', 'password', 'www.cloudinary.com/profile-img1'),
  ('user5', 'Noah', 'Yates', 'password', 'www.cloudinary.com/profile-img1');

INSERT INTO posts 
    (post_uploader_id, date_created, post_description, content_url) 
VALUES
  (6, now(), 'This is a post example 1', 'https://cloudinary/example1.mp4'),
  (6, now(), 'This is a post example 2', 'https://cloudinary/example2.mp4'),
  (7, now(), 'This is a post example 3', 'https://cloudinary/example3.mp4'),
  (8, now(), 'This is a post example 4', 'https://cloudinary/example4.mp4'),
  (8, now(), 'This is a post example 5', 'https://cloudinary/example5.mp4');

INSERT INTO 
    post_likes (post_id, post_user_like_id) 

VALUES
  (3, 1);
  (27, 7),
  (27, 6),
  (26, 7),
  (26, 7);

INSERT INTO
  comments (comment, post_id, user_id)
VALUES
  ('this an an example comment 1', 26, 8),
  ('this is another example comment 2', 27, 7),
  ('and yet another comment', 26, 6);

COMMIT

;