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
    tokenExpiry.setDate(tokenExpiry.getDate() + 7);

    // Save the subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
        tokenExpiry,
      },
    });

    // Generate unsubscribe URL
    const unsubscribeUrl = `${process.env.PROD_URL}/api/unsubscribe?token=${subscriber.token}`;


    // Send a confirmation email via AWS SES
    const subject = 'Thank You for Subscribing!';
    const html = `
    <div>
        <p>Dear ${email},</p>

        <p>
          Thank you for subscribing to updates from Illuzon! We are excited to have you on board.
        </p>

        <p>
          As a music producer, I specialize in music production, mixing, and mastering, and I’m thrilled to share my latest work with you. By subscribing, you’ll receive notifications about:
        </p>
        <ul>
          <li>New releases on Spotify</li>
          <li>YouTube uploads</li>
          <li>Sample packs and presets</li>
          <li>Exclusive sales and offers</li>
          <li>Major updates related to my music career</li>
        </ul>

        <p>
          Please note that our website, <a href="http://musicbyilluzon.in">musicbyilluzon.in</a>, is currently under construction, but we’ll notify you as soon as it goes live.
        </p>

        <p>
          Thank you for your support, and I look forward to keeping you updated on all my latest releases and news!
        </p>

        <p>Best regards,</p>
        <p>Illuzon</p>

        
        <Hr className="my-[16px] border-t-2 border-gray-300" />
        

        <Section className="text-center">
          <table className="w-full">
            <tr className="w-full">
              <td align="center">
                <Img
                  alt="Illuzon Logo"
                  height="42"
                  src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736792428/musicbyilluzon/musicbyilluzon.png" // replace with your logo URL
                />
              </td>
            </tr>
            <tr className="w-full">
              <td align="center">
                <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
                  Illuzon
                </Text>
                <Text className="mb-0 mt-[4px] text-[16px] leading-[24px] text-gray-500">
                  Music Producer
                </Text>
              </td>
            </tr>
            <tr>
              <td align="center">
                <Row className="table-cell h-[44px] w-[56px] align-bottom">
                  <Column className="pr-[8px]">
                    <Link href="https://www.instagram.com/musicbyilluzon">
                      <Img
                        alt="Instagram"
                        height="36"
                        src="https://react.email/static/instagram-logo.png" // Replace with gray version of Instagram logo
                        width="36"
                      />
                    </Link>
                  </Column>
                </Row>
              </td>
            </tr>
            <tr>
              <td align="center">
                <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-500">
                  <Link href="https://musicbyilluzon.in" className="text-gray-500">
                    musicbyilluzon.in
                  </Link>
                </Text>
                <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                  <Link href="mailto:support@musicbyilluzon.in" className="text-gray-500">
                    support@musicbyilluzon.in
                  </Link>
                </Text>
              </td>
            </tr>
          </table>
        </Section>

        <Section className="text-center mt-[16px]">
          <table className="w-full">
            <tr className="w-full">
              <td align="center">
                <Text className="text-[12px] leading-[16px] text-gray-400">
                  To unsubscribe from updates, <a href="${unsubscribeUrl}">Click Here</Link>.
                </Text>
              </td>
            </tr>
          </table>
        </Section>

      </div>
    `;
    await sendEmail(email, subject, html);

    return NextResponse.json({ message: 'Subscription successful!' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
