import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bocra-dark dark:bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://op-web.bocra.org.bw/assets/bocra-logo.png" 
                alt="BOCRA Logo" 
                className="h-12 w-auto object-contain brightness-110"
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The Botswana Communications Regulatory Authority (BOCRA) is responsible for regulating the communications sector in Botswana, including telecommunications, broadcasting, and postal services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bocra-blue dark:hover:bg-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bocra-blue dark:hover:bg-blue-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bocra-blue dark:hover:bg-blue-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-bocra-blue dark:hover:bg-blue-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">About BOCRA</Link></li>
              <li><Link to="/licensing" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Licensing & Registration</Link></li>
              <li><Link to="/regulatory" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Regulatory Framework</Link></li>
              <li><Link to="/consumer" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Consumer Protection</Link></li>
              <li><Link to="/media" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Media Centre</Link></li>
              <li><Link to="/contact" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Resources</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li><a href="#" className="flex items-center gap-2 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Annual Reports <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Statistics & Data <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Tenders <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Careers <ExternalLink className="w-3 h-3" /></a></li>
              <li><a href="#" className="flex items-center gap-2 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Privacy Policy <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-bocra-blue dark:text-blue-400 shrink-0" />
                <span>Plot 50671, Independence Avenue, Gaborone, Botswana</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-bocra-blue dark:text-blue-400 shrink-0" />
                <span>+267 395 7755</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-bocra-blue dark:text-blue-400 shrink-0" />
                <span>info@bocra.org.bw</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs text-center">
          <p>© {currentYear} Botswana Communications Regulatory Authority. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
