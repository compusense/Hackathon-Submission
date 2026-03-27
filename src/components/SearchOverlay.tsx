import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, FileText, Users, Shield, Radio, BookOpen, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search index - in a real app, this would be fetched from an API or generated at build time
const searchIndex = [
  { id: '1', title: 'Telecommunications Regulation', category: 'Regulatory', path: '/regulatory/telecom', description: 'Guidelines and regulations for telecom operators.' },
  { id: '2', title: 'Broadcasting Licenses', category: 'Licensing', path: '/licensing', description: 'Apply for commercial and community broadcasting licenses.' },
  { id: '3', title: 'Consumer Rights & Education', category: 'Consumer', path: '/consumer/rights-and-education', description: 'Know your rights as a consumer and learn about online safety.' },
  { id: '4', title: 'Log a Complaint', category: 'Consumer', path: '/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints', description: 'How to lodge a complaint against a service provider.' },
  { id: '5', title: 'Board of Directors', category: 'Corporate', path: '/about/board', description: 'Meet the BOCRA Board of Directors.' },
  { id: '6', title: 'Strategic Plan 2024-2027', category: 'Corporate', path: '/about/strategic-plan', description: 'Our vision and strategic goals for the future.' },
  { id: '7', title: 'Postal Services', category: 'Regulatory', path: '/regulatory/postal', description: 'Regulation of public postal and courier services.' },
  { id: '8', title: 'Spectrum Management', category: 'Regulatory', path: '/regulatory/spectrum', description: 'Allocation and management of the radio frequency spectrum.' },
  { id: '9', title: 'Type Approval', category: 'Regulatory', path: '/regulatory/type-approval', description: 'Certification of radio and telecommunications equipment.' },
  { id: '10', title: 'Press Releases', category: 'Media', path: '/media', description: 'Latest news and announcements from BOCRA.' },
  { id: '11', title: 'Tenders & Vacancies', category: 'Consumer', path: '/consumer/tenders-and-vacancies', description: 'View open tenders and job vacancies at BOCRA.' },
  { id: '12', title: 'Our Projects', category: 'Corporate', path: '/about/projects', description: 'Overview of BOCRA\'s key projects and initiatives.' },
  { id: '13', title: 'Licensee KYC', category: 'Consumer', path: '/consumer/licensee-kyc', description: 'Complete your Licensee Know Your Customer (KYC) registration.' },
  { id: '14', title: 'Price Comparison Tool', category: 'Consumer', path: '/consumer/price-comparison', description: 'Compare data bundle prices across mobile network operators.' },
];

const popularSearches = ['Tariffs', 'File a Complaint', 'Type Approval', 'Spectrum Fees'];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Corporate': return <Users className="w-5 h-5 text-blue-500" />;
    case 'Regulatory': return <Shield className="w-5 h-5 text-blue-600" />;
    case 'Consumer': return <BookOpen className="w-5 h-5 text-green-500" />;
    case 'Licensing': return <FileText className="w-5 h-5 text-bocra-blue" />;
    case 'Media': return <Radio className="w-5 h-5 text-purple-500" />;
    default: return <FileText className="w-5 h-5 text-gray-500" />;
  }
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchIndex);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
    } else {
      const lowercaseQuery = query.toLowerCase();
      const filtered = searchIndex.filter(
        item => 
          item.title.toLowerCase().includes(lowercaseQuery) || 
          item.description.toLowerCase().includes(lowercaseQuery) ||
          item.category.toLowerCase().includes(lowercaseQuery)
      );
      setResults(filtered);
    }
  }, [query]);

  const handleResultClick = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="relative flex items-center p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
              <Search className="w-6 h-6 text-bocra-blue dark:text-blue-500 ml-2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for services, regulations, documents..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg md:text-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-200/50 dark:bg-gray-800 rounded-lg mr-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="overflow-y-auto p-4 md:p-6 flex-grow">
              {query.trim() === '' ? (
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-bocra-blue hover:text-white dark:hover:bg-blue-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
                    <h3 className="text-sm font-bold text-bocra-blue dark:text-blue-400 mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Can't find what you're looking for? Try browsing our main sections or contact our support team.</p>
                    <div className="flex gap-4">
                      <button onClick={() => handleResultClick('/contact')} className="text-sm font-bold text-bocra-blue hover:underline">Contact Us</button>
                      <button onClick={() => handleResultClick('/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints')} className="text-sm font-bold text-bocra-blue hover:underline">File a Complaint</button>
                    </div>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-2">
                    Search Results ({results.length})
                  </h3>
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result.path)}
                      className="w-full text-left p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-all group flex items-start gap-4 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                    >
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shrink-0 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors shadow-sm">
                        {getCategoryIcon(result.category)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-bocra-blue bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md">
                            {result.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-bocra-blue dark:group-hover:text-blue-400 transition-colors">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                          {result.description}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-bocra-blue dark:group-hover:text-blue-400 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                    We couldn't find anything matching "{query}". Try adjusting your search terms or browse the categories.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-900/80 border-t border-gray-100 dark:border-gray-800 p-4 text-center sm:text-left flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-md font-mono text-xs mx-1">ESC</kbd> to close
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                Search powered by BOCRA
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
