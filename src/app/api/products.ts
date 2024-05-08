// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prismaClient';

// Type definitions for request and response
type Data = {
  message?: string;
  products?: any[];
  error?: string;
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case 'GET':
//       try {
//         const products = await prisma.product.findMany();
//         res.status(200).json({ products });
//       } catch (error: any) {
//         res.status(500).json({ error: error.message });
//       }
//       break;
//     case 'POST':
//       try {
//         const { name, email, password } = req.body
//         const newUser = await prisma.product.create({
//           data: {
//             name,
//             email,
//             password
//           },
//         });
//         res.status(201).json({ products: [newUser] });
//       } catch (error: any) {
//         res.status(500).json({ error: error.message });
//       }
//       break;
//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
