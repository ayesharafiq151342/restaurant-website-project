import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebookF, 
  faTwitter, 
  faYoutube, 
  faInstagram, 
  faWhatsapp 
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-black  text-[var(--golden)] py-10">
      <div className="container  mx-17 md:ml-42 md:px-0 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-54">
        
        {/* Contact Info with Logo */}
        <div>
          {/* Logo */}
          <div className="mb-4">
            <Image 
              src="/jewllery/logo-removebg-preview.png" // your logo path
              alt="Zak Collections Logo"
              width={200}
              height={50}
              className="object-contain"
            />
          </div>

        
          <p>Bahria Orchard, Lahore, Pakistan</p>
          <p>Email: <a href="mailto:zakcollections1@gmail.com" className="underline">zakcollections1@gmail.com</a></p>
          <p>Phone: <a href="tel:+923106798633" className="underline">+92 310-6798633</a></p>
        </div>

        {/* Other Categories */}
        <div>
          <h2 className="text-lg md:mt-20 md:text-2xl  font-Tharoma uppercase mb-4">Other Categories</h2>
          <ul className="space-y-2">
            <li><Link href="/mala" className="hover:underline">Mala</Link></li>
            <li><Link href="/new-arrivals" className="hover:underline">New Arrivals</Link></li>
            <li><Link href="/best-sellings" className="hover:underline">Best Sellings</Link></li>
            <li><Link href="/bangles" className="hover:underline">Bangles</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
                  <h2 className="text-lg md:mt-20 md:text-2xl  font-Tharoma uppercase mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:underline">Disclaimer</Link></li>
            <li><Link href="/faqs" className="hover:underline">FAQ's</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg md:mt-20 md:text-2xl  font-Tharoma uppercase mb-4">Social Links</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://wa.me/923106798633" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Zak Collections. All rights reserved.
      </div>
    </footer>
  );
}
