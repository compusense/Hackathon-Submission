import { motion } from 'motion/react';
import { Shield, Target, Eye, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">About BOCRA</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              The Botswana Communications Regulatory Authority (BOCRA) was established through the Communications Regulatory Authority Act, 2012 (CRA Act) to regulate the communications sector in Botswana.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-bocra-light dark:bg-gray-900 rounded-[3rem] flex flex-col gap-6"
          >
            <div className="w-16 h-16 bg-bocra-blue/10 dark:bg-blue-900/20 text-bocra-blue rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-bocra-blue dark:text-blue-400">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To regulate the communications sector for the promotion of competition, innovation, and consumer protection through effective and efficient regulatory frameworks.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 bg-bocra-blue dark:bg-blue-800 text-white rounded-[3rem] flex flex-col gap-6"
          >
            <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center">
              <Eye className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-blue-100 leading-relaxed">
              To be a world-class regulator of a vibrant and sustainable communications sector that contributes to Botswana's socio-economic development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">Our Core Values</h2>
          <p className="text-gray-600 dark:text-gray-400">The principles that guide our actions and decisions.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Integrity', desc: 'We are ethical, honest, and transparent in our dealings.', icon: Shield },
            { title: 'Innovation', desc: 'We embrace change and encourage creative solutions.', icon: Award },
            { title: 'Professionalism', desc: 'We maintain high standards of competence and conduct.', icon: Users },
            { title: 'Accountability', desc: 'We take responsibility for our actions and outcomes.', icon: Shield },
          ].map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center flex flex-col items-center gap-4 relative overflow-hidden group"
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-200 dark:text-gray-800 pattern-dots opacity-50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2" />

              <div className="w-12 h-12 bg-bocra-light dark:bg-gray-800 text-bocra-blue dark:text-blue-400 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-bocra-blue group-hover:text-white dark:group-hover:bg-blue-600">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400">{value.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* History/Timeline */}
      <section className="bg-bocra-light dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-12 text-center">Our Journey</h2>
            <div className="space-y-12">
              {[
                { year: '1996', title: 'BTA Establishment', desc: 'The Botswana Telecommunications Authority (BTA) was established as an independent regulator.' },
                { year: '2012', title: 'CRA Act Passed', desc: 'The Communications Regulatory Authority Act was passed, expanding the mandate to include postal and spectrum.' },
                { year: '2013', title: 'BOCRA Launch', desc: 'BOCRA was officially launched, replacing the BTA with a broader regulatory scope.' },
                { year: '2024', title: 'Digital Transformation', desc: 'Accelerating Botswana\'s transition to a high-income, knowledge-based economy.' },
              ].map((item, i) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div className="shrink-0 w-24 text-right">
                    <span className="text-2xl font-bold text-bocra-blue">{item.year}</span>
                  </div>
                  <div className="relative pt-2 pb-8 pl-8 border-l-2 border-bocra-blue/20 dark:border-blue-500/20">
                    <div className="absolute top-3 -left-[9px] w-4 h-4 bg-bocra-blue dark:bg-blue-500 rounded-full border-4 border-white dark:border-gray-900" />
                    <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
