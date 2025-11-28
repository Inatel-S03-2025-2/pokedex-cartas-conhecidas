const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_PATH = path.join(__dirname, '..', 'prisma', 'dev.db');

if (!JWT_SECRET) {
  console.error('JWT_SECRET não encontrado no arquivo .env');
  process.exit(1);
}

// Usuários de serviço que devem ter tokens gerados
const serviceUsers = [
  {
    userId: 1,
    username: 'marker-service',
    email: 'marker@service.com',
    role: 'marker'
  },
  {
    userId: 2,
    username: 'viewer-service',
    email: 'viewer@service.com',
    role: 'viewer'
  }
];

function generateToken(userId, role) {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

function updateUserTokens() {
  const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err.message);
      process.exit(1);
    }
    console.log('Conectado ao banco de dados SQLite');
  });

  console.log('Gerando tokens JWT para usuários de serviço...\n');

  const updatePromises = serviceUsers.map(user => {
    return new Promise((resolve, reject) => {
      const token = generateToken(user.userId, user.role);
      
      console.log(`Usuário: ${user.username} (${user.role})`);
      console.log(`Token: ${token.substring(0, 50)}...`);
      
      const sql = `UPDATE users SET token = ? WHERE userId = ?`;
      
      db.run(sql, [token, user.userId], function(err) {
        if (err) {
          console.error(`Erro ao atualizar token para ${user.username}:`, err.message);
          reject(err);
        } else if (this.changes === 0) {
          console.warn(`Usuário ${user.username} (ID: ${user.userId}) não encontrado no banco`);
          resolve();
        } else {
          console.log(`Token atualizado para ${user.username}`);
          resolve();
        }
      });
    });
  });

  Promise.all(updatePromises)
    .then(() => {
      console.log('\nTodos os tokens foram atualizados com sucesso!');
      console.log('\nResumo dos tokens gerados:');
      
      serviceUsers.forEach(user => {
        const token = generateToken(user.userId, user.role);
        console.log(`\n${user.username}:`);
        console.log(`  Role: ${user.role}`);
        console.log(`  Token: ${token}`);
      });
    })
    .catch(err => {
      console.error('Erro durante a atualização dos tokens:', err);
    })
    .finally(() => {
      db.close((err) => {
        if (err) {
          console.error('Erro ao fechar conexão:', err.message);
        } else {
          console.log('\nConexão com o banco fechada');
        }
      });
    });
}

// Verificar se os usuários existem antes de tentar atualizar
function checkAndUpdateTokens() {
  const db = new sqlite3.Database(DATABASE_PATH, (err) => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err.message);
      process.exit(1);
    }
  });

  console.log('Verificando se os usuários de serviço existem...');
  db.all('SELECT userId, username, role FROM users WHERE userId IN (1, 2)', (err, rows) => {
    if (err) {
      console.error('Erro ao consultar usuários:', err.message);
      db.close();
      process.exit(1);
    }

    if (rows.length === 0) {
      console.log('Nenhum usuário de serviço encontrado.');
      console.log('Execute as migrations primeiro: npm run prisma:migrate');
      db.close();
      process.exit(1);
    }

    console.log(`Encontrados ${rows.length} usuários de serviço:`);
    rows.forEach(row => {
      console.log(`   - ${row.username} (ID: ${row.userId}, Role: ${row.role})`);
    });

    db.close();
    updateUserTokens();
  });
}

console.log('Iniciando geração de tokens JWT para usuários de serviço...');
console.log(`Banco de dados: ${DATABASE_PATH}`);
console.log(`JWT Secret: ${JWT_SECRET.substring(0, 20)}...\n`);

checkAndUpdateTokens();