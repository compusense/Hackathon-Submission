import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Sun, Moon, Zap, ArrowRight, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useTheme } from './ThemeProvider';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'About Us', 
    path: '/about',
    subLinks: [
      { name: 'Who We Are', path: '/about/who-we-are' },
      { name: 'Regulatory History', path: '/about/history' },
      { name: 'Board of Directors', path: '/about/board' },
      { name: 'Executive Management', path: '/about/management' },
      { name: 'Strategic Plan', path: '/about/strategic-plan' },
      { name: 'Our Projects', path: '/about/projects' },
    ]
  },
  { 
    name: 'Regulatory', 
    path: '/regulatory',
    subLinks: [
      { name: 'Telecommunications', path: '/regulatory/telecom' },
      { name: 'Broadcasting', path: '/regulatory/broadcasting' },
      { name: 'Internet', path: '/regulatory/internet' },
      { name: 'Postal Services', path: '/regulatory/postal' },
      { name: 'Spectrum Management', path: '/regulatory/spectrum' },
      { name: 'Type Approval', path: '/regulatory/type-approval' },
    ]
  },
  { 
    name: 'Consumer', 
    path: '/consumer',
    subLinks: [
      { name: 'Log a Complaint', path: '/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints' },
      { name: 'Price Comparison', path: '/consumer/price-comparison' },
      { name: 'Consumer Rights & Education', path: '/consumer/rights-and-education' },
      { name: 'Tenders & Vacancies', path: '/consumer/tenders-and-vacancies' },
      { name: 'Licensee KYC', path: '/consumer/licensee-kyc' },
    ]
  },
  { name: 'Licensing', path: '/licensing' },
  { name: 'Media', path: '/media' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white dark:bg-gray-900 shadow-md py-2" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://op-web.bocra.org.bw/assets/bocra-logo.png" 
              alt="BOCRA Logo" 
              className="h-10 md:h-12 w-auto object-contain brightness-100 dark:brightness-110"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  to={link.path}
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors hover:text-bocra-blue dark:hover:text-blue-400",
                    location.pathname === link.path ? "text-bocra-blue dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {link.name}
                  {link.subLinks && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown */}
                {link.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800"
                      >
                        <div className="p-2">
                          {link.subLinks.map((sub) => {
                            const isExternal = sub.path.startsWith('http');
                            return isExternal ? (
                              <a 
                                key={sub.name}
                                href={sub.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-bocra-light dark:hover:bg-gray-800 hover:text-bocra-blue dark:hover:text-blue-400 rounded-lg transition-colors"
                              >
                                {sub.name}
                              </a>
                            ) : (
                              <Link 
                                key={sub.name}
                                to={sub.path}
                                className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-bocra-light dark:hover:bg-gray-800 hover:text-bocra-blue dark:hover:text-blue-400 rounded-lg transition-colors"
                              >
                                {sub.name}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link to="/track" className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-bocra-blue text-bocra-blue font-semibold hover:bg-bocra-blue hover:text-white transition-all text-sm">
              <Search className="w-4 h-4" />
              Track
            </Link>
            <Link to="/qos-audit" className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-yellow-600 text-yellow-600 font-semibold hover:bg-yellow-600 hover:text-white transition-all text-sm">
              <Target className="w-4 h-4" />
              QoS Audit
            </Link>
            <Link to="/contact" className="flex items-center justify-center w-10 h-10 rounded-full bg-bocra-blue text-white hover:bg-blue-800 transition-all">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-bocra-blue dark:text-blue-400"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col gap-2">
                    <Link 
                      to={link.path}
                      className={cn(
                        "text-lg font-semibold",
                        location.pathname === link.path ? "text-bocra-blue dark:text-blue-400" : "text-bocra-blue dark:text-blue-400"
                      )}
                    >
                      {link.name}
                    </Link>
                    {link.subLinks && (
                      <div className="pl-4 flex flex-col gap-2 border-l-2 border-gray-100 dark:border-gray-800">
                        {link.subLinks.map((sub) => {
                          const isExternal = sub.path.startsWith('http');
                          return isExternal ? (
                            <a 
                              key={sub.name}
                              href={sub.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400"
                            >
                              {sub.name}
                            </a>
                          ) : (
                            <Link 
                              key={sub.name}
                              to={sub.path}
                              className="text-sm text-gray-500 dark:text-gray-400 hover:text-bocra-blue dark:hover:text-blue-400"
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 flex flex-col gap-4">
                  <Link to="/track" className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-bocra-blue text-bocra-blue font-semibold hover:bg-bocra-blue hover:text-white transition-all">
                    <Search className="w-5 h-5" />
                    Track
                  </Link>
                  <Link to="/qos-audit" className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-yellow-600 text-yellow-600 font-semibold hover:bg-yellow-600 hover:text-white transition-all">
                    <Target className="w-5 h-5" />
                    QoS Audit
                  </Link>
                  <Link to="/contact" className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-bocra-blue text-white hover:bg-blue-800 transition-all">
                    Portal Login
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
