-- Inserir usuários de serviço fixos (tokens serão gerados posteriormente via script)
INSERT OR REPLACE INTO users (userId, username, email, role, token, externalToken, createdAt, updatedAt) VALUES 
(1, 'marker-service', 'marker@service.com', 'marker', 
 NULL, 
 'marker-service-token-fixed', 
 datetime('now'), 
 datetime('now'));

INSERT OR REPLACE INTO users (userId, username, email, role, token, externalToken, createdAt, updatedAt) VALUES 
(2, 'viewer-service', 'viewer@service.com', 'viewer', 
 NULL, 
 'viewer-service-token-fixed', 
 datetime('now'), 
 datetime('now'));