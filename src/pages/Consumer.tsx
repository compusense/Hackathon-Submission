import { motion } from 'motion/react';
import { ShieldCheck, HelpCircle, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Consumer() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Consumer Rights & Education</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Empowering and protecting consumers of communications services in Botswana. We ensure your rights are respected, your voice is heard, and you are educated on online safety.
            </p>
          </div>
        </div>
      </section>

      {/* Consumer Rights */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">Your Rights as a Consumer</h2>
          <p className="text-gray-600 dark:text-gray-400">Every user of communications services in Botswana is entitled to specific rights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Right to Information', desc: 'To receive clear, accurate, and up-to-date information about services and prices.', icon: HelpCircle },
            { title: 'Right to Choice', desc: 'To choose from a variety of service providers and products that meet your needs.', icon: CheckCircle2 },
            { title: 'Right to Quality', desc: 'To receive reliable services that meet the quality standards set by BOCRA.', icon: ShieldCheck },
            { title: 'Right to Privacy', desc: 'To have your personal data and communications kept private and secure.', icon: ShieldCheck },
            { title: 'Right to Redress', desc: 'To have your complaints resolved fairly and efficiently by your provider or BOCRA.', icon: MessageSquare },
            { title: 'Right to Safety', desc: 'To be protected from harmful content and unfair commercial practices.', icon: AlertTriangle },
          ].map((right, i) => (
            <motion.div 
              key={right.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-200 dark:text-gray-800 pattern-dots opacity-50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2" />

              <div className="w-12 h-12 bg-bocra-light dark:bg-gray-800 text-bocra-blue dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-bocra-blue group-hover:text-white dark:group-hover:bg-blue-600">
                <right.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-4">{right.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{right.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Online Safety Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">Online Safety & Education</h2>
          <p className="text-gray-600 dark:text-gray-400">Essential guidelines to help you navigate the digital world securely.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Protecting Personal Data', desc: 'Use strong passwords and be cautious about sharing personal information on social media.' },
            { title: 'Avoiding Scams', desc: 'Verify the source of unsolicited emails or messages before clicking links or sharing info.' },
            { title: 'Child Online Protection', desc: 'Educate children about internet risks and use parental controls to restrict access.' },
            { title: 'Secure Connections', desc: 'Avoid public Wi-Fi for sensitive transactions and ensure websites use HTTPS.' },
          ].map((safety, i) => (
            <motion.div 
              key={safety.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-4">{safety.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{safety.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Log a Complaint */}
      <section className="bg-bocra-light dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400">How to File a Complaint</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If you have an issue with your service provider, follow these steps to get it resolved. BOCRA acts as an arbitrator if the provider fails to resolve the issue.
              </p>
              
              <div className="flex flex-col gap-6">
                {[
                  { step: '01', title: 'Contact Your Provider', desc: 'First, report the issue to your service provider\'s customer service and get a reference number.' },
                  { step: '02', title: 'Wait for Resolution', desc: 'Allow the provider the stipulated time (usually 14 days) to resolve your complaint.' },
                  { step: '03', title: 'Escalate to BOCRA', desc: 'If the issue is not resolved or you are unhappy with the outcome, bring it to us.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="text-4xl font-display font-black text-bocra-blue/20 dark:text-blue-500/20">{item.step}</div>
                    <div>
                      <h3 className="text-lg font-bold text-bocra-blue dark:text-blue-400 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link 
                to="/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints" 
                className="btn-primary w-fit mt-4"
              >
                File a Complaint Online
              </Link>
            </div>

            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <img 
                  src="https://picsum.photos/seed/consumer/800/600" 
                  alt="Consumer Support" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl shadow-xl max-w-xs">
                <p className="text-sm font-bold text-bocra-blue dark:text-blue-400 mb-2">Need Immediate Help?</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Call our consumer hotline for guidance on your rights.</p>
                <p className="text-xl font-bold text-bocra-blue">+267 395 7755</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
