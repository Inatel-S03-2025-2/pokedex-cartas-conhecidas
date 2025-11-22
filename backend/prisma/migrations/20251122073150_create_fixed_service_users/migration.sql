-- Inserir usuários de serviço fixos com tokens JWT válidos
INSERT OR REPLACE INTO users (userId, username, email, role, token, externalToken, createdAt, updatedAt) VALUES 
(1, 'marker-service', 'marker@service.com', 'marker', 
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJtYXJrZXIiLCJpYXQiOjE3NjM3OTY2MTgsImV4cCI6MTc5NTMzMjYxOH0.OsFnwCyNgbzDfG0Le3-99no6szEkYuUjn_XfuTVCCFA', 
 'marker-service-token-fixed', 
 datetime('now'), 
 datetime('now'));

INSERT OR REPLACE INTO users (userId, username, email, role, token, externalToken, createdAt, updatedAt) VALUES 
(2, 'viewer-service', 'viewer@service.com', 'viewer', 
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJ2aWV3ZXIiLCJpYXQiOjE3NjM3OTY2MTgsImV4cCI6MTc5NTMzMjYxOH0.JihHmWyoNVtLnPbtX3Fnft_wWKVasFRQ02L59RJZDZY', 
 'viewer-service-token-fixed', 
 datetime('now'), 
 datetime('now'));