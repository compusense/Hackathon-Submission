import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Radio, 
  Smartphone, 
  Mail, 
  BarChart3,
  Globe,
  Zap,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { newsData } from '../data/news';
import ImageModal from '../components/ImageModal';

const BOCRA_COLORS = ['#076090', '#006d55', '#D4AC0D', '#800000'];

const AnimatedCharacter = ({ char, defaultColor, mousePos }: { char: string; defaultColor: string; mousePos: { x: number; y: number } | null }) => {
  const charRef = useRef<HTMLSpanElement>(null);
  const [isNear, setIsNear] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!mousePos || !charRef.current || shouldReduceMotion) {
      setIsNear(false);
      return;
    }

    const rect = charRef.current.getBoundingClientRect();
    const charX = rect.left + rect.width / 2;
    const charY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - charX, 2) + Math.pow(mousePos.y - charY, 2)
    );

    // Increased coverage size (90px radius)
    setIsNear(distance < 90);
  }, [mousePos, shouldReduceMotion]);

  return (
    <motion.span
      ref={charRef}
      className="inline-block cursor-default"
      animate={{ 
        color: isNear ? BOCRA_COLORS : defaultColor 
      }}
      transition={{ 
        color: isNear ? {
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : {
          duration: 0.4,
          ease: "easeOut"
        }
      }}
    >
      {char}
    </motion.span>
  );
};

const AnimatedWord = ({ children, defaultColor, mousePos }: { children: string; defaultColor: string; mousePos: { x: number; y: number } | null }) => {
  return (
    <span className="inline-block whitespace-nowrap">
      {children.split('').map((char, i) => (
        <AnimatedCharacter key={i} char={char} defaultColor={defaultColor} mousePos={mousePos} />
      ))}
    </span>
  );
};

const AnimatedHeroText = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  return (
    <h1 
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setMousePos(null)}
      className="text-5xl lg:text-7xl font-display font-extrabold leading-[1.1] tracking-tight text-black dark:text-white"
    >
      <AnimatedWord defaultColor="currentColor" mousePos={mousePos}>Your</AnimatedWord>{' '}
      <AnimatedWord defaultColor="currentColor" mousePos={mousePos}>trusted</AnimatedWord>{' '}
      <AnimatedWord defaultColor="currentColor" mousePos={mousePos}>communications</AnimatedWord>{' '}
      <AnimatedWord defaultColor="currentColor" mousePos={mousePos}>regulator</AnimatedWord>
    </h1>
  );
};

const services = [
  {
    title: 'Telecommunications',
    description: 'Regulating voice and data services to ensure quality and affordability.',
    icon: Smartphone,
    color: 'bg-[#0974ae] text-white shadow-lg shadow-[#0974ae]/30',
    linkColor: 'text-[#0974ae]',
    path: '/regulatory/telecom'
  },
  {
    title: 'Broadcasting',
    description: 'Managing the airwaves for diverse and high-quality media content.',
    icon: Radio,
    color: 'bg-sector-broadcast text-white shadow-lg shadow-sector-broadcast/30',
    linkColor: 'text-sector-broadcast',
    path: '/regulatory/broadcasting'
  },
  {
    title: 'Postal Services',
    description: 'Ensuring efficient and reliable mail delivery across Botswana.',
    icon: Mail,
    color: 'bg-sector-postal text-white shadow-lg shadow-sector-postal/30',
    linkColor: 'text-sector-postal',
    path: '/regulatory/postal'
  },
  {
    title: 'Internet & Spectrum',
    description: 'Optimizing the use of radio frequencies and internet services.',
    icon: Zap,
    color: 'bg-sector-internet text-bocra-dark shadow-lg shadow-sector-internet/30',
    linkColor: 'text-sector-internet',
    path: '/regulatory/spectrum'
  },
  {
    title: 'Type Approval',
    description: 'Ensuring all communications equipment meets national standards.',
    icon: ShieldCheck,
    color: 'bg-gray-500 text-white shadow-lg shadow-gray-500/30',
    linkColor: 'text-gray-500',
    path: '/regulatory/type-approval'
  }
];

const stats = [
  { 
    label: 'Mobile\nSubscribers', 
    value: '4.5M+', 
    icon: Smartphone, 
    color: 'bg-[#0974ae]', 
    textColor: 'text-[#0974ae]',
    border: 'border-[#0974ae]/20', 
    glass: 'bg-[#0974ae]/20' 
  },
  { 
    label: 'Internet\nPenetration', 
    value: '72%', 
    icon: Globe, 
    color: 'bg-[#008165]', 
    textColor: 'text-[#008165]',
    border: 'border-[#008165]/20', 
    glass: 'bg-[#008165]/20' 
  },
  { 
    label: 'Licensed\nOperators', 
    value: '120+', 
    icon: ShieldCheck, 
    color: 'bg-[#800000]', 
    textColor: 'text-[#800000]',
    border: 'border-[#800000]/20', 
    glass: 'bg-[#800000]/20' 
  },
  { 
    label: 'Type\nApproval', 
    value: '2.5K+', 
    icon: ShieldCheck, 
    color: 'bg-gray-500', 
    textColor: 'text-gray-500',
    border: 'border-gray-500/20', 
    glass: 'bg-gray-500/20' 
  },
  { 
    label: 'Regulatory\nCompliance', 
    value: '98%', 
    icon: CheckCircle2, 
    color: 'bg-[#FDD207]', 
    textColor: 'text-[#FDD207]',
    border: 'border-[#FDD207]/20', 
    glass: 'bg-[#FDD207]/20' 
  },
];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-bocra-light dark:bg-gray-900/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-bocra-blue/5 dark:bg-blue-500/5 rounded-l-full blur-3xl transform translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-sector-broadcast/5 dark:bg-green-500/5 rounded-r-full blur-3xl transform -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8 py-20"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 w-fit">
                <span className="w-2 h-2 bg-sector-broadcast rounded-full animate-pulse" />
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Regulating for the Future</span>
              </div>
              
              <AnimatedHeroText />
              
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                BOCRA ensures high-quality, reliable, and affordable communications services for all citizens, fostering innovation and economic growth in the communications sector.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/regulatory" className="btn-primary flex items-center gap-2">
                  Explore Regulations <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/consumer" className="px-6 py-3 rounded-lg font-semibold border-2 border-bocra-blue dark:border-blue-500 text-bocra-blue dark:text-blue-400 hover:bg-bocra-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all">
                  Consumer Rights & Education
                </Link>
              </div>
            </motion.div>
            <div className="hidden lg:block" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-0 w-1/2 h-full hidden lg:block z-0"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-bocra-light dark:from-gray-900 via-transparent to-transparent z-10 w-1/2" />
            <img 
              src="https://images.pexels.com/photos/2415405/pexels-photo-2415405.jpeg" 
              alt="Digital Botswana" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 justify-items-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative group px-4 py-6 rounded-[2rem] border ${stat.border} ${stat.glass} backdrop-blur-xl hover:scale-[1.02] transition-all duration-300 w-full max-w-[200px]`}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-current/20`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={cn("text-3xl font-bold mb-1", stat.textColor)}>{stat.value}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 whitespace-pre-line leading-tight">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-sector-broadcast">Regulatory Sectors</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            We provide oversight across various communication sectors to ensure a competitive and fair environment for both operators and consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group px-4 py-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden w-full max-w-[240px]"
            >
              {/* Decorative Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-gray-800/50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 text-gray-200 dark:text-gray-800 pattern-dots opacity-50 -z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2" />

              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", service.color)}>
                <service.icon className="w-6 h-6 fill-current" />
              </div>
              <h3 className={cn("text-lg font-bold mb-2", service.linkColor)}>{service.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4">
                {service.description}
              </p>
              <Link to={service.path} className={cn("flex items-center gap-2 font-bold text-xs group/link", service.linkColor)}>
                Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News & Media Section */}
      <section className="bg-bocra-light dark:bg-gray-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-bocra-blue dark:text-blue-400">Media Centre</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">Stay updated with the latest news, press releases, and announcements from the authority.</p>
            </div>
            <Link to="/media" className="btn-primary">View All News</Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((item) => (
              <motion.article 
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
              >
                <div 
                  className="h-56 overflow-hidden relative group/image cursor-pointer"
                  onClick={() => setSelectedImage({ src: item.image, alt: item.title })}
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                    <Maximize2 className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity w-8 h-8 drop-shadow-md" />
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4 text-xs font-bold text-bocra-blue uppercase tracking-widest">
                    <span>{item.category}</span>
                    <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                    <span className="text-gray-400">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 leading-tight hover:text-sector-broadcast dark:hover:text-green-400 cursor-pointer transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3">
                    {item.summary}
                  </p>
                  <Link to={`/media/${item.id}`} className="flex items-center gap-2 text-bocra-blue dark:text-blue-400 font-bold text-sm mt-4">
                    Read Full Story <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-sector-broadcast dark:bg-green-900/50 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center gap-12">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
          
          <div className="flex-grow relative z-10 flex flex-col gap-6 text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-display font-bold">Have a Complaint?</h2>
            <p className="text-lg text-green-50 max-w-2xl">
              We are here to protect your rights as a consumer. If you have an unresolved issue with your service provider, let us help you.
            </p>
          </div>
          
          <div className="shrink-0 relative z-10">
            <Link 
              to="/redirect?to=https://studio--loanmanagement-2381a.us-central1.hosted.app/consumer/complaints" 
              className="bg-white dark:bg-gray-900 text-sector-broadcast dark:text-green-400 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-bocra-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all inline-block"
            >
              File a Complaint
            </Link>
          </div>
        </div>
      </section>

      <ImageModal 
        src={selectedImage?.src || null} 
        alt={selectedImage?.alt || ''} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
