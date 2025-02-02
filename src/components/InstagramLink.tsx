import Image from "next/image";
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });
import Link from "next/link";

export default function InstagramLink() {
    return (
      <div className="instagram">
        <Link
          href="https://www.instagram.com/musicbyilluzon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="imgSize" width={32} height={50}
            src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736746226/musicbyilluzon/instagram.svg"
            alt="Instagram Logo"
          />
        
        </Link>
      </div>
    );
  }
  