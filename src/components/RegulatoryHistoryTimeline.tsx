import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronRight, ChevronLeft, Info, Landmark, Radio, Smartphone, Globe, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const timelineData = [
  {
    year: '1980',
    title: 'Establishment of BTC',
    description: 'The Botswana Telecommunications Corporation (BTC) was established as a parastatal to provide all public telecommunications services in the country.',
    icon: Landmark,
    category: 'Institutional',
    color: 'bg-blue-500',
    analysis: 'This foundational step centralized communication infrastructure, ensuring a unified national network during the early years of independence.',
    status: 'Foundation Laid',
    legacy: 'Infrastructure Core'
  },
  {
    year: '1996',
    title: 'Telecommunications Act',
    description: 'The Telecommunications Act of 1996 was passed, leading to the establishment of the Botswana Telecommunications Authority (BTA) as an independent regulator.',
    icon: ShieldCheck,
    category: 'Legislative',
    color: 'bg-teal-500',
    analysis: 'The creation of BTA marked the end of the monopoly era, introducing the concept of independent oversight and fair competition.',
    status: 'Reform Enacted',
    legacy: 'Regulatory Autonomy'
  },
  {
    year: '1998',
    title: 'Mobile Market Entry',
    description: 'The BTA licensed the first two mobile operators, Mascom Wireless and Vista Communications (now Orange Botswana), introducing competition in the mobile sector.',
    icon: Smartphone,
    category: 'Market',
    color: 'bg-bocra-blue',
    analysis: 'Competition immediately drove innovation and accessibility, rapidly increasing the teledensity across both urban and rural areas.',
    status: 'Market Opened',
    legacy: 'Mobile Revolution'
  },
  {
    year: '2004',
    title: 'Further Liberalization',
    description: 'The government approved a further liberalization of the telecommunications market, allowing for more competition and the introduction of new services.',
    icon: Zap,
    category: 'Market',
    color: 'bg-yellow-500',
    analysis: 'This policy shift allowed for the entry of Internet Service Providers and enhanced the diversity of communication solutions available to citizens.',
    status: 'Expansion Phase',
    legacy: 'Service Diversity'
  },
  {
    year: '2008',
    title: 'Broadcasting Support',
    description: 'While broadcasting was regulated by the National Broadcasting Board (NBB), the BTA provided technical support, reflecting the growing convergence of technologies.',
    icon: Radio,
    category: 'Convergence',
    color: 'bg-purple-500',
    analysis: 'Technical collaboration between BTA and NBB was the precursor to full regulatory convergence, acknowledging that data, voice, and video were merging.',
    status: 'Technical Alignment',
    legacy: 'Convergence Path'
  },
  {
    year: '2012',
    title: 'CRA Act of 2012',
    description: 'The Communications Regulatory Authority (CRA) Act was enacted to provide for the regulation of the communications sector, including telecommunications, broadcasting, and postal services.',
    icon: Globe,
    category: 'Legislative',
    color: 'bg-violet-500',
    analysis: 'A landmark piece of legislation that unified the regulation of all communication services under one comprehensive legal framework.',
    status: 'Legal Consolidation',
    legacy: 'Unified Mandate'
  },
  {
    year: '2013',
    title: 'BOCRA Officially Established',
    description: 'On 1st April 2013, the Botswana Communications Regulatory Authority (BOCRA) officially commenced operations, replacing both the BTA and the NBB.',
    icon: Landmark,
    category: 'Institutional',
    color: 'bg-bocra-blue',
    analysis: 'The birth of BOCRA represented a modern approach to regulation, capable of handling the complexities of a fully digital and converged market.',
    status: 'Operational Launch',
    legacy: 'Modern Authority'
  },
  {
    year: '2015',
    title: 'UASF Intensification',
    description: 'BOCRA intensified its efforts through the Universal Access and Service Fund (UASF) to ensure that all Batswana have access to basic communications services.',
    icon: Info,
    category: 'Social',
    color: 'bg-green-500',
    analysis: 'Focusing on inclusivity, the UASF projects bridged the digital divide, bringing connectivity to the most remote parts of the country.',
    status: 'Social Impact',
    legacy: 'Universal Access'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'BOCRA launched various initiatives to promote online safety and cybersecurity awareness, supporting Botswana\'s transition to a digital economy.',
    icon: ShieldCheck,
    category: 'Digital',
    color: 'bg-red-500',
    analysis: 'As the world moved online, BOCRA pivoted to ensure that the digital space remained safe, secure, and conducive for economic growth.',
    status: 'Cyber Resilience',
    legacy: 'Digital Trust'
  },
  {
    year: '2022',
    title: '5G Spectrum Allocation',
    description: 'BOCRA allocated spectrum for 5G technology, paving the way for high-speed mobile internet and advanced digital services across the country.',
    icon: Zap,
    category: 'Technology',
    color: 'bg-cyan-500',
    analysis: 'The move to 5G positions Botswana at the forefront of the Fourth Industrial Revolution, enabling IoT, smart cities, and ultra-fast data.',
    status: 'Future Ready',
    legacy: 'Next-Gen Connectivity'
  }
];

export default function RegulatoryHistoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % timelineData.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);

  const activeItem = timelineData[activeIndex];

  return (
    <div className="flex flex-col gap-12">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>
          The history of communication regulation in Botswana is a journey of transformation, from a state-led monopoly to a dynamic, competitive, and converged regulatory environment. Explore the key milestones that have shaped the industry.
        </p>
      </div>

      {/* Interactive Timeline Map */}
      <div className="relative bg-bocra-light dark:bg-gray-900 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 pattern-grid" />
        </div>

        <div className="relative z-10 flex flex-col gap-12">
          {/* Year Selector - Refined UI */}
          <div className="flex items-center gap-6">
            <button 
              onClick={prev}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-bocra-blue hover:text-white transition-all shrink-0 group/btn"
            >
              <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex-1 relative py-10">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-bocra-blue/30"
                  initial={false}
                  animate={{ width: `${(activeIndex / (timelineData.length - 1)) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between relative z-10">
                {timelineData.map((item, index) => (
                  <button
                    key={item.year}
                    onClick={() => setActiveIndex(index)}
                    className="group relative flex flex-col items-center"
                  >
                    <motion.div 
                      animate={{ 
                        scale: activeIndex === index ? 1.5 : 1,
                        backgroundColor: activeIndex === index ? '#FF6321' : 'var(--dot-bg)'
                      }}
                      className={cn(
                        "w-5 h-5 rounded-full border-4 transition-colors duration-300 z-20",
                        activeIndex === index 
                          ? "border-white dark:border-gray-900 shadow-[0_0_20px_rgba(255,99,33,0.6)]" 
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 group-hover:border-bocra-blue"
                      )}
                      style={{ '--dot-bg': 'white' } as any}
                    />
                    <div className={cn(
                      "absolute -bottom-10 flex flex-col items-center transition-all duration-300",
                      activeIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    )}>
                      <span className={cn(
                        "text-sm font-black whitespace-nowrap",
                        activeIndex === index ? "text-bocra-blue dark:text-blue-400" : "text-gray-400"
                      )}>
                        {item.year}
                      </span>
                      {activeIndex === index && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="w-1 h-1 bg-bocra-blue rounded-full mt-1"
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={next}
              className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:bg-bocra-blue hover:text-white transition-all shrink-0 group/btn"
            >
              <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Active Milestone Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl", activeItem.color)}>
                    <activeItem.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-bocra-blue uppercase tracking-widest">{activeItem.category}</span>
                    <h2 className="text-3xl font-display font-bold text-bocra-blue dark:text-blue-400">{activeItem.year}</h2>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeItem.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Milestone {activeIndex + 1} of {timelineData.length}</span>
                </div>
              </div>

              <div className="relative group/card">
                <div className={cn("absolute inset-0 rounded-3xl blur-3xl opacity-20 transition-opacity duration-500 group-hover/card:opacity-30", activeItem.color)} />
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900 dark:text-white">Impact Analysis</h4>
                      <div className="px-3 py-1 bg-bocra-light dark:bg-gray-700 rounded-full text-xs font-bold text-bocra-blue dark:text-blue-400">
                        Historical Context
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className={cn("w-1 h-16 rounded-full shrink-0", activeItem.color.replace('bg-', 'bg-opacity-50 bg-'))} />
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
                          "{activeItem.analysis}"
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-400 uppercase font-bold mb-1">Status</p>
                          <p className="text-sm font-bold text-green-500">{activeItem.status}</p>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                          <p className="text-xs text-gray-400 uppercase font-bold mb-1">Legacy</p>
                          <p className="text-sm font-bold text-bocra-blue dark:text-blue-400">{activeItem.legacy}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-4">
            <motion.div 
              className="h-full bg-bocra-blue"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / timelineData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Landmark, title: 'Institutional Growth', desc: 'From a single parastatal to a multi-sector regulatory body.' },
          { icon: Zap, title: 'Technological Leap', desc: 'Transitioning from basic telephony to high-speed 5G networks.' },
          { icon: ShieldCheck, title: 'Regulatory Maturity', desc: 'Developing robust frameworks for a converged digital world.' }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <item.icon className="w-8 h-8 text-bocra-blue mb-4" />
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
