/* 
Insert a new user
*/

INSERT INTO users (user_id, username, hashed_password, salt) VALUES ($1, $2, $3, $4) RETURNING *