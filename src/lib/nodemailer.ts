import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in', // Zoho SMTP host
  port: 587, // TLS port
  secure: false, // Use false for TLS, true for SSL (port 465)
  auth: {
    user: process.env.EMAIL_USER, // Your Zoho email
    pass: process.env.EMAIL_PASS, // Your Zoho email password or app-specific password
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: `"Music by Illuzon" <${process.env.FROM_EMAIL}>`, // Display name and sender email
      to, // Recipient email
      subject, // Email subject
      html, // Email content in HTML format
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
  } catch (error: any) {
    console.error(`Error sending email to ${to}:`, error.message);
    throw new Error('Failed to send email. Please check your configuration.');
  }
};
