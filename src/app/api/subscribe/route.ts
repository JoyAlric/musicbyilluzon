import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    // Save the subscriber to the database
    const existingSubscriber = await prisma.subscriber.findUnique({ where: { email } });
    if (existingSubscriber) {
      return NextResponse.json({ message: 'You are already subscribed!' }, { status: 409 });
    }

    await prisma.subscriber.create({ data: { email } });

    // Send a confirmation email via AWS SES
    const subject = 'Thank You for Subscribing!';
    const html = `
      <h1>Thank You for Subscribing</h1>
      <p>You will now receive updates about our latest releases.</p>
      <p>Stay tuned!</p>
    `;
    await sendEmail(email, subject, html);

    return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
