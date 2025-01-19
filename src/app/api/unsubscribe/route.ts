import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ message: 'Invalid or missing token.' }, { status: 400 });
    }

    // Find subscriber by token
    const subscriber = await prisma.subscriber.findUnique({ where: { token } });

    if (!subscriber) {
      return NextResponse.json({ message: 'Invalid or expired token.' }, { status: 404 });
    }

    // Check if the token has expired
    if (new Date() > subscriber.tokenExpiry) {
      return NextResponse.json({ message: 'Token has expired.' }, { status: 400 });
    }

    // Delete the subscriber
    await prisma.subscriber.delete({ where: { token } });

    return NextResponse.redirect(`${process.env.PROD_URL}/unsubscribe-success`);
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}
