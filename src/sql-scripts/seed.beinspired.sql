BEGIN;

INSERT INTO users
    (username, first_name, last_name)
VALUES
  ('user1', 'Joanas', 'Schmidt'),
  ('user2', 'Devon', 'Butler'),
  ('user3', 'Aaron', 'Despotato'),
  ('user4', 'Brad', 'Stevens'),
  ('user5', 'Noah', 'Yates');

INSERT INTO posts 
    (post_uploader_id, date_created, post_description, video_url, image_url) 
VALUES
  (1, now(), 'This is a post example 1', 'https://cloudinary/example1.mp4', 'https://cloudinary/example1.jpg'),
  (2, now(), 'This is a post example 2', 'https://cloudinary/example2.mp4', 'https://cloudinary/example2.jpg'),
  (3, now(), 'This is a post example 3', 'https://cloudinary/example3.mp4', 'https://cloudinary/example3.jpg'),
  (4, now(), 'This is a post example 4', 'https://cloudinary/example4.mp4', 'https://cloudinary/example4.jpg'),
  (5, now(), 'This is a post example 5', 'https://cloudinary/example5.mp4', 'https://cloudinary/example5.jpg');

INSERT INTO 
    post_likes (post_id, post_user_like_id) 

VALUES
  (1, 5),
  (2, 4),
  (3, 3),
  (4, 2),
  (5, 1);


COMMIT;