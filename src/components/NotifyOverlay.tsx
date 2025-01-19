'use client';

interface NotifyOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function NotifyOverlay({ isVisible, onClose }: NotifyOverlayProps) {
  return (
    <>
      {isVisible && (
        <div id="overlay" className="overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="overlay-content" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <button className="close-icon" onClick={onClose}>
              ✕
            </button>
            <h2>Stay Updated</h2>
            <p className="upFont">Enter your email to receive updates:</p>
            <input type="email" id="email-input" placeholder="Your email address" />
            <button className="submit-button" onClick={() => alert('Email Submitted')}>
              Get Notified!
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
          </div>
        </div>
      )}
    </>
  );
}


