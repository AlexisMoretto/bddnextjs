/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
    const { email, password } : {email:string, password: string} = await req.json()

    //Vérifier si l'email et le password sont fourni

    if (!email || !password) {
        return NextResponse.json({message : "Elément manquant"})
    } 
    // Fonction asynchrone pour générer le salt et le mdp
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword          
        },
      });
      return NextResponse.json(newUser, {status: 201});
    } catch (error: any) {
      return NextResponse.json({ message: 'User creation failed', error: error.message }, {status: 500});
    }
  } else {
    return NextResponse.json({ message: 'Method is not allowed' }, {status: 405});
}
}