import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url) // Ruta del archivo
export const __dirname = dirname(__filename)

import bcrypt from "bcrypt";

/**
 * Funcion que realiza el hasheo de contraseña a través de bcrypt con el método hashSync
 * @param {*} password tipo String
 * @returns password hasheada
 */
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/**
 * Funcion que compara password en string plano con password hasheada del usuario
 * @param {*} password tipo string
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);