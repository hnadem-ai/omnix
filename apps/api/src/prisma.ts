import pkg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/index.js';

const { Pool } = pkg;

// Connect using your DATABASE_URL from the .env file
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });