import { motion } from 'motion/react';
import { Smartphone, Radio, Mail, Zap, FileText, Download, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const sectors = [
  {
    id: 'telecom',
    title: 'Telecommunications',
    icon: Smartphone,
    desc: 'Regulating fixed and mobile telephony, internet services, and data communications.',
    iconClass: 'bg-sector-telecom/10 text-sector-telecom group-hover:bg-sector-telecom group-hover:text-white',
    borderClass: 'hover:border-sector-telecom',
    bulletClass: 'bg-sector-telecom',
    details: [
      'Quality of Service Monitoring',
      'Tariff Regulation',
      'Interconnection Framework',
      'Numbering Resource Management'
    ],
    link: '/regulatory/telecom'
  },
  {
    id: 'broadcasting',
    title: 'Broadcasting',
    icon: Radio,
    desc: 'Overseeing radio and television services to ensure diverse and quality content.',
    iconClass: 'bg-sector-broadcast/10 text-sector-broadcast group-hover:bg-sector-broadcast group-hover:text-white',
    borderClass: 'hover:border-sector-broadcast',
    bulletClass: 'bg-sector-broadcast',
    details: [
      'Content Regulation',
      'Licensing of Broadcasters',
      'Digital Migration Support',
      'Compliance Monitoring'
    ],
    link: '/regulatory/broadcasting'
  },
  {
    id: 'postal',
    title: 'Postal Services',
    icon: Mail,
    desc: 'Ensuring universal access to efficient and reliable postal and courier services.',
    iconClass: 'bg-sector-postal/10 text-sector-postal group-hover:bg-sector-postal group-hover:text-white',
    borderClass: 'hover:border-sector-postal',
    bulletClass: 'bg-sector-postal',
    details: [
      'Universal Service Obligations',
      'Courier Licensing',
      'Service Standards',
      'Market Competition'
    ],
    link: '/regulatory/postal'
  },
  {
    id: 'internet',
    title: 'Internet Services',
    icon: Zap,
    desc: 'Regulating and promoting the development of internet services and digital infrastructure.',
    iconClass: 'bg-sector-internet/20 text-[#b39500] dark:text-sector-internet group-hover:bg-sector-internet group-hover:text-bocra-dark',
    borderClass: 'hover:border-sector-internet',
    bulletClass: 'bg-sector-internet',
    details: [
      'ISP Licensing',
      'Internet Exchange Points',
      'Domain Name Management',
      'Digital Inclusion'
    ],
    link: '/regulatory/internet'
  },
  {
    id: 'spectrum',
    title: 'Spectrum Management',
    icon: Radio,
    desc: 'Optimizing the national radio frequency spectrum for efficient wireless communications.',
    iconClass: 'bg-sector-spectrum/20 text-sector-spectrum group-hover:bg-sector-spectrum group-hover:text-white',
    borderClass: 'hover:border-sector-spectrum',
    bulletClass: 'bg-sector-spectrum',
    details: [
      'Frequency Allocation',
      'Spectrum Licensing',
      'Interference Resolution',
      'Spectrum Monitoring'
    ],
    link: '/regulatory/spectrum'
  },
  {
    id: 'type-approval',
    title: 'Type Approval',
    icon: ShieldCheck,
    desc: 'Ensuring all radio and telecommunications equipment meets national standards.',
    iconClass: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white',
    borderClass: 'hover:border-teal-600',
    bulletClass: 'bg-teal-600',
    details: [
      'Equipment Certification',
      'Standards Compliance',
      'Market Surveillance',
      'Mutual Recognition Agreements'
    ],
    link: '/regulatory/type-approval'
  }
];

export default function Regulatory() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900/50 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Regulatory Framework</h1>
            <p className="text-xl text-blue-50 leading-relaxed">
              We provide a stable and predictable regulatory environment that encourages investment, promotes competition, and protects consumer interests.
            </p>
          </div>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {sectors.map((sector, i) => (
            <motion.div 
              key={sector.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn("bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden", sector.borderClass)}
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50 dark:bg-gray-800/50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 text-gray-200 dark:text-gray-800 pattern-dots opacity-50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2" />
              
              <div className="flex items-start gap-6 mb-8 relative z-10">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors", sector.iconClass)}>
                  <sector.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-bocra-blue dark:text-blue-400 mb-2">{sector.title}</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{sector.desc}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {sector.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className={cn("w-1.5 h-1.5 rounded-full", sector.bulletClass)} />
                    {detail}
                  </div>
                ))}
              </div>

              <Link to={sector.link} className="w-full py-4 rounded-xl border-2 border-bocra-blue/10 dark:border-blue-500/20 text-bocra-blue dark:text-blue-400 font-bold hover:bg-bocra-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all flex items-center justify-center gap-2">
                View Detailed Framework <FileText className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Documents Section */}
      <section className="bg-bocra-light dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">Legal & Policy Documents</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">Access the acts, regulations, and policies that govern the communications sector in Botswana.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'CRA Act 2012', size: '2.4 MB', type: 'PDF' },
              { title: 'Broadcasting Regulations', size: '1.8 MB', type: 'PDF' },
              { title: 'Telecom Guidelines', size: '3.1 MB', type: 'PDF' },
              { title: 'Postal Services Act', size: '1.2 MB', type: 'PDF' },
              { title: 'Spectrum Policy', size: '4.5 MB', type: 'PDF' },
              { title: 'Quality of Service Rules', size: '2.1 MB', type: 'PDF' },
            ].map((doc, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:border-bocra-blue dark:hover:border-blue-500 border border-transparent dark:border-gray-800 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-xl flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-bocra-blue transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-bocra-blue dark:text-blue-400">{doc.title}</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 dark:text-gray-500 hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
