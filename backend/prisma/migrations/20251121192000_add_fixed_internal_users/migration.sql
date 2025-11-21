-- Inserir usuários internos fixos com tokens permanentes
INSERT INTO users (userId, username, email, role, token, internalToken, createdAt, updatedAt) VALUES 
(1, 'intern-user', 'intern@internal.com', 'intern', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJpbnRlcm4iLCJpYXQiOjE3MDA2NDA2MDAsImV4cCI6MTczMTI0NTQwMH0.intern-fixed-token', 'intern-internal-token-fixed', datetime('now'), datetime('now'));

INSERT INTO users (userId, username, email, role, token, internalToken, createdAt, updatedAt) VALUES 
(2, 'admin-user', 'admin@internal.com', 'internAdmin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJpbnRlcm5BZG1pbiIsImlhdCI6MTcwMDY0MDYwMCwiZXhwIjoxNzMxMjQ1NDAwfQ.admin-fixed-token', 'admin-internal-token-fixed', datetime('now'), datetime('now'));