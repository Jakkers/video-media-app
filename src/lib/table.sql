CREATE TABLE IF NOT EXISTS m_users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  bio TEXT,
  clerk_id TEXT UNIQUE,
  following BIGINT,
  reviews_left BIGINT,
  comments_left BIGINT
);

CREATE TABLE IF NOT EXISTS m_reviews
(
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  review TEXT,
  movie_id BIGINT,
  likes BIGINT,
 FOREIGN KEY ("user_id") REFERENCES m_users ("clerk_id")
);

CREATE TABLE IF NOT EXISTS s_reviews
(
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  review TEXT,
  show_id BIGINT,
  likes BIGINT,
  FOREIGN KEY ("user_id") REFERENCES m_users ("clerk_id")
)

CREATE TABLE IF NOT EXISTS m_comments
(
  id SERIAL PRIMARY KEY,
  user_id TEXT,
  review_id BIGINT,
  comment TEXT,
  likes BIGINT,
 FOREIGN KEY ("user_id") REFERENCES m_users ("clerk_id"),
 FOREIGN KEY ("review_id") REFERENCES m_reviews ("id")
);