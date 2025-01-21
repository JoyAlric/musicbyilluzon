"use client"

import "@/styles/legal.css";

import { useEffect, useState } from 'react';

export default function UnsubscribeSuccess() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  return (
    <div className="container">
      <h1>Sorry to See You Go</h1>
      <p>
        Dear <strong>{email || 'Subscriber'}</strong>,
      </p>
      <p>
        We noticed that you’ve unsubscribed from our updates. We respect your decision, but we’re
        truly sorry to see you go.
      </p>
      <p>
        If this was a mistake or if you ever want to come back, we’d be happy to have you. Feel
        free to re-subscribe anytime!
      </p>
      <p>Thank you for being with us, and we hope to see you again!</p>
      <p>Best regards,</p>
      <p><strong>Illuzon</strong></p>      
    </div>
  );
}
