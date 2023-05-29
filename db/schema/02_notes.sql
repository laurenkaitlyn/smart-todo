-- Drop and recreate notes table

DROP TABLE IF EXISTS notes CASCADE;

CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  category_id INTEGER REFERENCES categories(id),
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);
