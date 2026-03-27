import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LicensingApplicationForm from '../components/LicensingApplicationForm';

export default function ApplyLicense() {
  return (
    <div className="pt-24 pb-24 bg-bocra-light dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/licensing" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Licensing</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-bocra-blue dark:text-blue-400">Apply for License</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">
              Online License Application
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Complete the multi-step form below to submit your application for a new communications license in Botswana.
            </p>
          </div>

          <LicensingApplicationForm />
        </motion.div>
      </div>
    </div>
  );
}
