import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../../config/project.config.js';

import { createUsuario, findUsuarioByEmail } from '../models/usuarios.model.js';
import { logger } from '../utils/logger.utils.js';

export const getUsuarioController = async (req, res) => {
  try {
    const { email } = req.usuario;
    logger.info(`Fetching usuario with email: ${email}`);
    if (!email) {
      logger.warn('Email not provided in request');
      return res.status(400).json({ message: 'Email is required' });
    }

    const usuario = await findUsuarioByEmail(email);
    if (!usuario) {
      logger.warn(`Usuario not found with email: ${email}`);
      return res.status(404).json({ message: 'Usuario not found' });
    }

    res.status(200).json({
      message: 'Usuario fetched successfully',
      data: [usuario],
    });
  } catch (error) {
    logger.error('Error in getUsuarioController:', error);
    res.status(500).json({ message: 'Internal server error', data: [] });
  }
};

export const loginUsuarioController = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(`Logging in usuario with email: ${email}`);

    if (!email || !password) {
      logger.warn('Missing required fields for usuario login');
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const usuario = await findUsuarioByEmail(email);
    if (!usuario) {
      logger.warn(`Usuario not found with email: ${email}`);
      return res.status(404).json({ message: 'Usuario not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, usuario.password);
    if (!isPasswordValid) {
      logger.warn('Invalid password for usuario login');
      return res.status(401).json({ message: 'Invalid password' });
    }

    const { jwt: jwtConfig } = config;
    const token = jwt.sign({ email }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    logger.error('Error in loginUsuarioController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const registerUsuarioController = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    logger.info(`Creating usuario with email: ${email}`);

    if (!email || !password || !rol || !lenguage) {
      logger.warn('Missing required fields for usuario creation');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const usuario = await createUsuario({ email, password, rol, lenguage });
    logger.info(`Usuario registered successfully: ${JSON.stringify(usuario)}`);
    res.status(201).json({ message: 'Register successful', usuario });
  } catch (error) {
    logger.error('Error in registerUsuarioController:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
