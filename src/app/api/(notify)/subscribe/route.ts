import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail } from '@/lib/nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    // Check if the user is already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({ where: { email } });
    if (existingSubscriber) {
      return NextResponse.json({ message: 'You are already subscribed!' }, { status: 409 });
    }

    // Generate token and expiry date
    const tokenExpiry = new Date();
    tokenExpiry.setDate(tokenExpiry.getDate() + 1);

    // Save the subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        tokenExpiry,
      },
    });

    // Generate unsubscribe URL
    const unsubscribeUrl = `${process.env.PROD_URL}/api/unsubscribe?token=${subscriber.token}`;

    // Send confirmation email
    const subject = 'Thank You for Subscribing!';
    const html = `
    <div>
  <p>Dear ${email},</p>

  <p>Thank you for subscribing to Illuzon! We’re excited to have you on board.</p>

  <p>
    As a music producer, I specialize in music production, mixing, and mastering. By subscribing, you’ll stay updated on:
  </p>
  <ul>
    <li>New Spotify releases</li>
    <li>YouTube uploads</li>
    <li>Sample packs & presets</li>
    <li>Exclusive offers</li>
    <li>Major career updates</li>
  </ul>

  <p>
    Visit <a href="http://musicbyilluzon.in">musicbyilluzon.in</a> for more details (coming soon!).
  </p>

  <p>Thank you for your support!</p>
  <p>Best regards,<br />Illuzon</p>

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
    <p style="margin-top: 16px; font-size: 12px; color: #aaa;">
      To unsubscribe, <a href="${unsubscribeUrl}" style="color: #aaa;">click here</a>.
    </p>
  </div>
</div>
    `;

    // Background email sending
    sendEmail(email, subject, html).catch((error) => {
      console.error('Error sending email:', error);
    });

    return NextResponse.json({ message: 'Subscription Successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error subscribing:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
