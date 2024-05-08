// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prismaClient';

// Type definitions for request and response
type Data = {
  message?: string;
  users?: any[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const { name, email, password } = req.body
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password
          },
        });
        res.status(201).json({ users: [newUser] });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
