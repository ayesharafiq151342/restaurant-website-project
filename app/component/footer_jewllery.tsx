import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[var(--accent)] text-[var(--primary)] py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + Contact */}
        <div>
          <div className="mb-4">
            <Image
              src="/logo.png"   // change to your food logo
              alt="Food Hub Logo"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <p className="text-sm text-gray-300">
            Fresh & Delicious Food Delivered Fast 🚀
          </p>

          <div className="mt-3 space-y-1 text-sm text-gray-400">
            <p>Faisalabad, Pakistan</p>
            <p>
              Email:{" "}
              <a href="mailto:info@foodhub.com" className="underline">
                info@foodhub.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+923001234567" className="underline">
                +92 300 1234567
              </a>
            </p>
          </div>
        </div>

        {/* Food Categories */}
        <div>
          <h2 className="text-lg font-bold uppercase mb-4">Menu</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/burgers" className="hover:text-[var(--primary)]">Burgers</Link></li>
            <li><Link href="/pizza" className="hover:text-[var(--primary)]">Pizza</Link></li>
            <li><Link href="/drinks" className="hover:text-[var(--primary)]">Drinks</Link></li>
            <li><Link href="/desserts" className="hover:text-[var(--primary)]">Desserts</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold uppercase mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/about" className="hover:text-[var(--primary)]">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--primary)]">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-[var(--primary)]">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[var(--primary)]">Terms</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-bold uppercase mb-4">Follow Us</h2>

          <div className="flex space-x-4 text-xl text-gray-300">
            <a href="#" className="hover:text-[var(--primary)]">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-[var(--primary)]">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-[var(--primary)]">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="hover:text-[var(--primary)]">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://wa.me/923001234567" className="hover:text-[var(--primary)]">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>

          <p className="text-xs text-gray-00 mt-4">
            Fast delivery • Fresh meals • Best taste
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-200 mt-10 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} Food Hub. All rights reserved.
      </div>
    </footer>
  );
}