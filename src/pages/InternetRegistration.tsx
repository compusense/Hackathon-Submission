import { motion } from 'motion/react';
import { ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import InternetRegistrationForm from '../components/InternetRegistrationForm';

export default function InternetRegistration() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
          <Link to="/" className="hover:text-sector-internet transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/regulatory" className="hover:text-sector-internet transition-colors">Regulatory</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/regulatory/internet" className="hover:text-sector-internet transition-colors">Internet Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-sector-internet dark:text-yellow-400">ISP Registration</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Info */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl"
            >
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 text-sector-internet dark:text-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">ISP Registration</h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Register your internet services with BOCRA. This application is required for all new internet service providers seeking to operate within the Botswana communications sector.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sector-internet dark:text-yellow-400 text-xs font-bold shrink-0 mt-1">1</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete the online registration form.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sector-internet dark:text-yellow-400 text-xs font-bold shrink-0 mt-1">2</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Submit required corporate and technical documentation.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-sector-internet dark:text-yellow-400 text-xs font-bold shrink-0 mt-1">3</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pay the registration fee securely online.</p>
                </div>
              </div>
            </motion.div>

            <div className="bg-sector-internet p-8 rounded-[2.5rem] text-white shadow-xl shadow-yellow-900/20">
              <h3 className="text-xl font-bold mb-4">Need Assistance?</h3>
              <p className="text-yellow-100 text-sm leading-relaxed mb-6">
                Our internet services team is available to help you with regulatory requirements and licensing procedures.
              </p>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between"><span>Email:</span> <span className="font-bold">internet@bocra.org.bw</span></p>
                <p className="flex justify-between"><span>Phone:</span> <span className="font-bold">+267 368 5500</span></p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <InternetRegistrationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
