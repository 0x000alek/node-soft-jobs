import bcrypt from 'bcryptjs';
import format from 'pg-format';

import { config } from '../../config/project.config.js';

import pool from '../../db/config.db.js';

import { logger } from '../utils/logger.utils.js';

export const createUsuario = async (usuario) => {
  try {
    const table = config.db.tables.usuarios.name;
    const { email, password, rol, lenguage } = usuario;
    const hashedPassword = bcrypt.hashSync(password);

    const query = format(
      'INSERT INTO %I (email, password, rol, lenguage) VALUES (%L, %L, %L, %L) RETURNING email, rol, lenguage',
      table,
      email,
      hashedPassword,
      rol,
      lenguage
    );
    logger.info(`Executing query: ${query}`);

    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    logger.error('Error creating usuario: ', error);
    throw error;
  }
};

export const findUsuarioByEmail = async (email) => {
  try {
    const table = config.db.tables.usuarios.name;
    const query = format('SELECT * FROM %I WHERE email = %L', table, email);
    logger.info(`Executing query: ${query}`);

    const { rows } = await pool.query(query);
    return rows[0];
  } catch (error) {
    logger.error('Error finding usuario by email:', error);
    throw error;
  }
};
