import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function RedirectPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const to = searchParams.get('to');

  useEffect(() => {
    if (!to) {
      navigate('/');
      return;
    }

    // Small delay to show the transition
    const timer = setTimeout(() => {
      window.location.href = to;
    }, 1500);

    return () => clearTimeout(timer);
  }, [to, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="w-24 h-24 bg-bocra-light dark:bg-gray-900 rounded-3xl flex items-center justify-center text-bocra-blue dark:text-blue-400">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border-2 border-dashed border-bocra-blue/20 dark:border-blue-400/20 rounded-[2rem]"
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-display font-bold text-bocra-blue dark:text-blue-400">
            Connecting to Portal
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            Please wait while we securely connect you to the BOCRA Complaint Management System.
          </p>
        </div>

        <div className="flex items-center gap-3 text-bocra-blue dark:text-blue-400 font-medium">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Redirecting...</span>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 w-full">
          <img 
            src="https://op-web.bocra.org.bw/assets/bocra-logo.png" 
            alt="BOCRA Logo" 
            className="h-8 mx-auto opacity-50 grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
}
