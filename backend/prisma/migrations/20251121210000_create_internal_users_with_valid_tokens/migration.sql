-- Adicionar colunas email e internalToken à tabela users
ALTER TABLE "users" ADD COLUMN "email" TEXT;
ALTER TABLE "users" ADD COLUMN "internalToken" TEXT;

-- Criar índices únicos para as novas colunas  
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_internalToken_key" ON "users"("internalToken");

-- Inserir usuários internos fixos com tokens JWT válidos
INSERT OR REPLACE INTO users (userId, username, email, role, token, internalToken, createdAt, updatedAt) VALUES 
(1, 'intern-user', 'intern@internal.com', 'internal', 
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJpbnRlcm5hbCIsImlhdCI6MTc2Mzc2MjUyNiwiZXhwIjoxNzYzODQ4OTI2fQ.tnM6y3GTPdwbwO_D0X2xmnec_e7X_QyD0fDkms66x8w', 
 'internal-service-token-fixed', 
 datetime('now'), 
 datetime('now'));

INSERT OR REPLACE INTO users (userId, username, email, role, token, internalToken, createdAt, updatedAt) VALUES 
(2, 'admin-user', 'admin@internal.com', 'internalAdmin', 
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJpbnRlcm5hbEFkbWluIiwiaWF0IjoxNzYzNzYyNTk0LCJleHAiOjE3NjM4NDg5OTR9.gBM0T4n8lVt8w1rHlwcXlgaZSZsV6iXQhW1rHznyabU', 
 'admin-service-token-fixed', 
 datetime('now'), 
 datetime('now'));