"use client";

import '@/styles/globals.css';
import '@/styles/style.css';

import { useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import NotifyOverlay from '@/components/NotifyOverlay';
import ProgressBar from '@/components/ProgressBar';
import InstagramLink from '@/components/InstagramLink';
import Footer from '@/components/Footer';

export default function Home() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const showOverlay = () => setIsOverlayVisible(true);
  const hideOverlay = () => setIsOverlayVisible(false);

  return (
    <div className="desktop">
      <BackgroundVideo />
      <div className="overlap-wrapper">
        <div className="text-wrapper">MUSIC BY ILLUZON</div>
        <div className="overlap">
          <div className="UNDER-CONSTRUCTION">
            UNDER<br />CONSTRUCTION
          </div>
          <div className="div">SITE NEARLY READY</div>
          <ProgressBar />
          <div className="notify-container">
            <button className="notify-button" onClick={showOverlay}>
              Notify Me
            </button>
          </div>
          <InstagramLink />
        </div>
        <Footer />
      </div>
      <NotifyOverlay isVisible={isOverlayVisible} onClose={hideOverlay} />
    </div>
  );
}
