import Image from "next/image";
import { Poppins } from 'next/font/google';
const poppins = Poppins({ weight: '400', subsets: ['latin'] });
import Link from "next/link";

export default function InstagramLink() {
    return (
      <div className="instagram">
        <Link className="Links"
          href="https://www.instagram.com/musicbyilluzon/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="imgSize" width={32} height={50}
            // src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736746226/musicbyilluzon/instagram.svg"
            src="https://res.cloudinary.com/djuolm3pw/image/upload/v1738531500/instagram_tkxwr8.svg"
            alt="Instagram"
          />
        
        </Link>
        
        <Link className="Links"
          href="mailto:contact@musicbyilluzon.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image 
            className="mailSize" width={32} height={54} 
            // src="https://res.cloudinary.com/dzmuvpq5s/image/upload/v1736746226/musicbyilluzon/instagram.svg"
            src="https://res.cloudinary.com/djuolm3pw/image/upload/v1738531501/mail_njlt5y.svg"
            alt="Mail"
          />
        
        </Link>
      </div>
           
    );
  }
  