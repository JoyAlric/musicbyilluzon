export function getSubscriptionEmailTemplate(email: string, unsubscribeUrl: string): string {
    return `
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
            <a href="https://www.instagram.com/musicbyilluzon">
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
  }
  

  export function getUnsubscribeEmailTemplate(email: string): string {
    return `
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
      <a href="https://www.instagram.com/musicbyilluzon">
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
  }
  