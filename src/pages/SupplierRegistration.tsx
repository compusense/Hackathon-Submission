import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Building, Phone, FileText, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function SupplierRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl max-w-lg text-center border border-gray-100 dark:border-gray-800"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Registration Submitted!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you for registering your company on the BOCRA Supplier Database. Your application reference number is <strong>BOCRA-SUP-{Math.floor(1000 + Math.random() * 9000)}</strong>. We will review your details and contact you via email.
          </p>
          <Link to="/consumer/tenders-and-vacancies" className="btn-primary inline-block">
            Return to Tenders
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      {/* Hero Section */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center flex-wrap gap-2 text-white/70 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/consumer/tenders-and-vacancies" className="hover:text-white transition-colors">Tenders & Vacancies</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Supplier Registration</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Supplier Registration
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl"
          >
            Register your business on the BOCRA Supplier Database to be considered for future procurement opportunities.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-10 max-w-4xl mx-auto"
        >
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-4 items-start border border-blue-100 dark:border-blue-800/30">
            <AlertCircle className="w-6 h-6 text-bocra-blue dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
              Please ensure all information provided is accurate and matches your official company registration documents. Fields marked with an asterisk (*) are mandatory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Company Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="w-10 h-10 bg-bocra-light dark:bg-gray-800 rounded-lg flex items-center justify-center text-bocra-blue dark:text-blue-400">
                  <Building className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company Name *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="Registered Company Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Trading Name (if different)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="Trading As" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Company Registration Number *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="e.g. UIN 123456789" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tax Identification Number (TIN) *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="TIN Number" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Type of Business *</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all">
                    <option value="">Select Business Type</option>
                    <option value="sole_trader">Sole Trader</option>
                    <option value="partnership">Partnership</option>
                    <option value="private_limited">Private Limited Company (Pty Ltd)</option>
                    <option value="public_limited">Public Limited Company (Ltd)</option>
                    <option value="ngo">Non-Governmental Organization (NGO)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="w-10 h-10 bg-bocra-light dark:bg-gray-800 rounded-lg flex items-center justify-center text-bocra-blue dark:text-blue-400">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Contact Person Name *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Designation / Title *</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="e.g. Director, Sales Manager" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address *</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="company@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number *</label>
                  <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all" placeholder="+267 123 4567" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Physical Address *</label>
                  <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none transition-all resize-none" placeholder="Plot Number, Street, City/Town"></textarea>
                </div>
              </div>
            </div>

            {/* Categories of Supply */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="w-10 h-10 bg-bocra-light dark:bg-gray-800 rounded-lg flex items-center justify-center text-bocra-blue dark:text-blue-400">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categories of Supply</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select the categories of goods or services your company provides (Select all that apply):</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Information Technology (Hardware & Software)',
                  'Office Furniture & Equipment',
                  'Stationery & Printing Services',
                  'Consultancy & Professional Services',
                  'Cleaning & Hygiene Services',
                  'Security Services',
                  'Marketing, PR & Advertising',
                  'Event Management & Catering',
                  'Building Maintenance & Works'
                ].map((category, idx) => (
                  <label key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-bocra-blue transition-colors group">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-bocra-blue rounded border-gray-300 focus:ring-bocra-blue" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                <div className="w-10 h-10 bg-bocra-light dark:bg-gray-800 rounded-lg flex items-center justify-center text-bocra-blue dark:text-blue-400">
                  <Upload className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Required Documents</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Certificate of Incorporation', desc: 'CIPA Registration Certificate' },
                  { title: 'Tax Clearance Certificate', desc: 'Valid BURS Tax Clearance' },
                  { title: 'Company Profile', desc: 'Overview of services and experience' }
                ].map((doc, idx) => (
                  <div key={idx} className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-bocra-blue dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-500 dark:text-gray-400">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{doc.title} *</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{doc.desc}</p>
                    <span className="text-xs font-semibold text-bocra-blue dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full">Browse File</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              <label className="flex items-start gap-4 cursor-pointer">
                <input required type="checkbox" className="mt-1 w-5 h-5 text-bocra-blue rounded border-gray-300 focus:ring-bocra-blue shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  I hereby declare that the information provided in this application is true and correct to the best of my knowledge. I understand that any false information may result in the rejection of this application or removal from the BOCRA Supplier Database.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-bocra-blue hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>Submit Registration <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </section>
    </div>
  );
}
