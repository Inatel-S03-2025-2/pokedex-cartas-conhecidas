const jwt = require('jsonwebtoken');

const JWT_SECRET = 'd0c23674add83e36679cbcabb14be25f7ee253ba01523b69a506950f93aff0f89252de421cc38eafde83507e547888cf';

// Gerar tokens para os usuários internos
const internToken = jwt.sign(
  { userId: 1, role: 'intern' },
  JWT_SECRET,
  { expiresIn: '365d' } // 1 ano de duração
);

const adminToken = jwt.sign(
  { userId: 2, role: 'internAdmin' },
  JWT_SECRET,
  { expiresIn: '365d' } // 1 ano de duração
);

console.log('=== TOKENS GERADOS ===');
console.log('INTERN TOKEN (userId: 1):');
console.log(internToken);
console.log('\nADMIN TOKEN (userId: 2):');
console.log(adminToken);

console.log('\n=== SQL PARA ATUALIZAR BANCO ===');
console.log(`UPDATE users SET token = '${internToken}' WHERE userId = 1;`);
console.log(`UPDATE users SET token = '${adminToken}' WHERE userId = 2;`);