/* 
Find user by username
*/

SELECT * FROM users WHERE username = $1 LIMIT 1