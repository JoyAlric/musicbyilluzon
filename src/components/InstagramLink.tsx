import Image from "next/image";
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export default function InstagramLink() {
    return (
      <div className="frame">
        <a
          className="instagram"
          href="https://www.instagram.com/musicbyilluzon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="imgSize" width={32} height={50}
            src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736746226/musicbyilluzon/instagram.svg"
            alt="Instagram Logo"
          />
          <div className={`${poppins.className} text-wrapper-2`}>@musicbyilluzon</div>
        </a>
      </div>
    );
  }
  