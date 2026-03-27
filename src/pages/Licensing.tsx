import { motion } from 'motion/react';
import { FileText, CheckCircle, Clock, ArrowRight, Download, Search, CheckCircle2, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const licenseTypes = [
  {
    title: 'Telecommunications',
    types: [
      'Network Facilities Provider (NFP)',
      'Services and Applications Provider (SAP)',
      'Public Telecommunications Operator (PTO)',
      'Value Added Network Services (VANS)',
      'Mobile Virtual Network Operators (MVNO)',
      'Content Services Provider (CSP)'
    ]
  },
  {
    title: 'Broadcasting',
    types: ['Commercial Radio/TV', 'Community Radio', 'Subscription Management']
  },
  {
    title: 'Postal & Courier',
    types: ['Public Postal Operator', 'Commercial Courier License', 'International Courier']
  }
];

export default function Licensing() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Licensing</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We manage the licensing process for all communications service providers in Botswana, ensuring a fair and competitive market.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-grow relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for license types or requirements..." 
              className="w-full pl-12 pr-4 py-4 bg-bocra-light dark:bg-gray-800 rounded-xl border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none dark:text-white transition-colors"
            />
          </div>
          <button className="btn-primary w-full md:w-auto px-12">Search</button>
        </div>
      </section>

      {/* License Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {licenseTypes.map((category, i) => {
            const isBroadcasting = category.title === 'Broadcasting';
            const textColor = isBroadcasting ? 'text-sector-broadcast dark:text-green-400' : 'text-bocra-blue dark:text-blue-400';
            const iconBg = isBroadcasting ? 'bg-green-50 dark:bg-green-900/20 text-sector-broadcast' : 'bg-blue-50 dark:bg-blue-900/20 text-bocra-blue';
            const iconHover = isBroadcasting ? 'group-hover:bg-sector-broadcast' : 'group-hover:bg-bocra-blue';
            const textHover = isBroadcasting ? 'group-hover:text-sector-broadcast dark:group-hover:text-green-400' : 'group-hover:text-bocra-blue dark:group-hover:text-blue-400';
            const btnColor = isBroadcasting ? 'text-sector-broadcast' : 'text-bocra-blue';

            return (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
              >
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-200 dark:text-gray-800 pattern-dots opacity-50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2" />

                <h2 className={cn("text-2xl font-bold mb-8 relative z-10", textColor)}>{category.title}</h2>
                <ul className="flex flex-col gap-6 relative z-10">
                  {category.types.map((type) => (
                    <li key={type} className="flex items-start gap-4 group cursor-pointer">
                      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 transition-colors", iconBg, iconHover, "group-hover:text-white")}>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className={cn("text-gray-600 dark:text-gray-300 font-medium transition-colors", textHover)}>{type}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn("mt-12 flex items-center gap-2 font-bold group", btnColor)}>
                  View Requirements <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-bocra-light dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">Application Process</h2>
            <p className="text-gray-600 dark:text-gray-400">Follow these steps to apply for a license with BOCRA.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Company Info', desc: 'Provide your registered company details.', icon: FileText },
              { title: 'License Details', desc: 'Select the license category and type.', icon: CheckCircle },
              { title: 'Documents', desc: 'Upload all required supporting documents.', icon: UploadCloud },
              { title: 'Review & Submit', desc: 'Review your application and submit it.', icon: CheckCircle2 },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-6">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center relative">
                  <step.icon className="w-8 h-8 text-bocra-blue dark:text-blue-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-bocra-blue text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white dark:border-gray-900">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-bocra-blue dark:text-blue-400 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/licensing/telecom-registration" className="bg-white dark:bg-gray-800 text-bocra-blue dark:text-blue-400 border-2 border-bocra-blue dark:border-blue-500 hover:bg-bocra-blue hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-12 py-4 text-lg rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
              Telecom Registration <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/licensing/broadcasting-registration" className="bg-white dark:bg-gray-800 text-sector-broadcast dark:text-green-400 border-2 border-sector-broadcast dark:border-green-500 hover:bg-sector-broadcast hover:text-white dark:hover:bg-green-600 dark:hover:text-white px-12 py-4 text-lg rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
              Broadcasting Registration <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/licensing/postal-registration" className="bg-white dark:bg-gray-800 text-sector-postal dark:text-red-400 border-2 border-sector-postal dark:border-red-500 hover:bg-sector-postal hover:text-white dark:hover:bg-red-700 dark:hover:text-white px-12 py-4 text-lg rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
              Postal Registration <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/licensing/internet-registration" className="bg-white dark:bg-gray-800 text-sector-internet dark:text-yellow-400 border-2 border-sector-internet dark:border-yellow-500 hover:bg-sector-internet hover:text-white dark:hover:bg-yellow-600 dark:hover:text-white px-12 py-4 text-lg rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm">
              Internet Registration <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
