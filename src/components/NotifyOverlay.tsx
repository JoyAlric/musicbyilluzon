'use client';

import { useState } from 'react';

interface NotifyOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NotifyOverlay({ isVisible, onClose }: NotifyOverlayProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  const handleSubscribe = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Thank you for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        setMessage(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isVisible && (
        <div
          id="overlay"
          className="overlay"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div
            className="overlay-content"
            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}
          >
            <button className="close-icon" onClick={onClose}>
            </button>
            <h2>Stay Updated</h2>
            <p className="upFont">Enter your email to receive updates:</p>
            <input
              type="email"
              id="email-input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="submit-button"
              onClick={handleSubscribe}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? 'Subscribing...' : 'Get Notified!'}
            </button>
            <p className="tnc">
              By clicking on &quot;Get Notified!&quot;, you agree to{' '}
              <a className="link" href="/T&Cs" target="_blank">
                Terms
              </a>{' '}
              and{' '}
              <a className="link" href="/PrivacyPolicy" target="_blank">
                Privacy Policy
              </a>.
            </p>
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}
