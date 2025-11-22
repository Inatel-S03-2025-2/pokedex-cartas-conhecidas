import swaggerJSDoc from 'swagger-jsdoc';
import { Request, Response } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokédex Cards Backend API',
      version: '1.0.0',
      description: 'Backend para sistema Pokédex que rastreia cartas conhecidas pelos usuários',
      contact: {
        name: 'API Support',
        email: 'support@<MY-DOMAIN>'
      }
    },
    servers: [
      {
        // url: process.env.NODE_ENV === 'production' ? 'https://api.<MY-DOMAIN>' : `http://localhost:${process.env.PORT}`,
        url: `http://localhost:${process.env.PORT}`,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token obtido através do endpoint /auth/login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            userId: {
              type: 'integer',
              description: 'ID único do usuário',
              example: 1
            },
            username: {
              type: 'string',
              description: 'Nome de usuário',
              example: 'user'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'user@test.com'
            },
            role: {
              type: 'string',
              enum: ['user', 'internal', 'internalAdmin'],
              description: 'Role do usuário no sistema. Determina níveis de acesso.',
              example: 'user'
            }
          }
        },
        Card: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID interno da carta no banco',
              example: 1
            },
            cardId: {
              type: 'integer',
              description: 'ID externo da carta (PokeAPI)',
              example: 25
            },
            userId: {
              type: 'integer',
              description: 'ID do usuário que conhece a carta',
              example: 1
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'user@test.com'
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'senha123'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Login realizado com sucesso'
            },
            data: {
              type: 'object',
              properties: {
                user: {
                  $ref: '#/components/schemas/User'
                },
                token: {
                  type: 'string',
                  description: 'JWT token para autenticação',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
              }
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operação realizada com sucesso'
            },
            data: {
              type: 'object',
              description: 'Dados da resposta (opcional)'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Erro na operação'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts'
  ]
};

export const swaggerSpec = swaggerJSDoc(options);

// Health check endpoint para o Swagger
export const swaggerHealthCheck = (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Swagger documentation is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
};