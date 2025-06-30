import 'dotenv/config';

export const config = {
  server: {
    env: process.env.NODE_ENV || 'development',
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  db: {
    db_host: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USER || 'postgres',
    db_password: process.env.DB_PASSWORD || '',
    db_port: process.env.DB_PORT || 5432,
    db_database: process.env.DB_DATABASE || 'mydb',

    tables: {
      usuarios: {
        allowedFilters: ['id', 'email', 'rol', 'lenguaje'],
        allowedOrderBy: ['id', 'email', 'rol', 'lenguaje'],
        defaultFilters: [
          { field: 'rol', operator: '=', value: 'Backend Developer' },
          { field: 'lenguaje', operator: '=', value: 'JavaScript' },
        ],
        defaultOrderBy: 'id',
        name: 'usuarios',
        pagination: {
          defaultLimit: process.env.USUARIOS_PAGINATION_DEFAULT_LIMIT || 10,
          defaultPage: process.env.USUARIOS_PAGINATION_DEFAULT_PAGE || 1,
          maxLimit: process.env.USUARIOS_PAGINATION_MAX_LIMIT || 100,
          maxPage: process.env.USUARIOS_PAGINATION_MAX_PAGE || 1000,
          type: 'offset',
        },
      },
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'mi_clave_secreta_super_segura',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
};
