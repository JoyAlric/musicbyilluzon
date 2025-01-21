import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/nodemailer';

export const dynamic = 'force-dynamic'; 

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

    const email = subscriber.email;

    // Delete the subscriber
    await prisma.subscriber.delete({ where: { token } });

    // Send "Sorry to see you go" email
    const subject = 'Sorry to See You Go';
    const html = `
<div style="font-family: Arial, sans-serif; text-align: center;">
  <h1>We’re Sorry to See You Go</h1>
  <p>
    Dear <strong>${email}</strong>,
  </p>
  <p>
    We noticed that you’ve unsubscribed from our updates. We respect your decision but are
    truly sorry to see you leave.
  </p>
  <p>
    If this was a mistake or if you ever want to come back, we’d be happy to have you. Feel
    free to re-subscribe anytime!
  </p>
  <p>Thank you for being with us, and we hope to see you again!</p>
  <p>Best regards,</p>
  <p><strong>Illuzon</strong></p>
</div>

<hr style="margin: 16px 0; border: 0; border-top: 2px solid #ccc;" />

<div style="text-align: center;">
  <img
    alt="Illuzon Logo"
    height="42"
    src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736792428/musicbyilluzon/musicbyilluzon.png"
    style="margin-bottom: 16px;"
  />
  <p style="margin: 0; font-weight: bold; color: #333;">Illuzon</p>
  <p style="margin: 4px 0; color: #777;">Music Producer</p>
  <div style="margin: 16px 0;">
    <a href="https://www.instagram.com/musicbyilluzon" style="margin-right: 8px;">
      <img
        alt="Instagram"
        height="36"
        src="https://react.email/static/instagram-logo.png"
        style="vertical-align: middle;"
      />
    </a>
  </div>
  <p style="margin: 8px 0; color: #555;">
    <a href="https://musicbyilluzon.in" style="color: #555;">musicbyilluzon.in</a> |
    <a href="mailto:support@musicbyilluzon.in" style="color: #555;">support@musicbyilluzon.in</a>
  </p>
</div>
    `;

    try {
      await sendEmail(email, subject, html);
      console.log('Unsubscribe email sent successfully');
    } catch (emailError) {
      console.error('Error sending unsubscribe email:', emailError);
    }

    return NextResponse.redirect(`${process.env.PROD_URL}/unsubscribed?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error('Error Unsubscribing:', error);
    return NextResponse.json({ message: 'Internal Server Error.' }, { status: 500 });
  }
}
