import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, ArrowRight, PlayCircle, FileText, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsData as news } from '../data/news';
import ImageModal from '../components/ImageModal';

export default function Media() {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Header */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-display font-bold mb-8">Media Centre</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Stay informed with the latest news, press releases, events, and publications from the Botswana Communications Regulatory Authority.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {['All', 'News', 'Events', 'Reports', 'Public Notice'].map((cat) => (
              <button 
                key={cat}
                className="px-6 py-2 rounded-full text-sm font-bold transition-all hover:bg-bocra-blue dark:hover:bg-blue-600 hover:text-white bg-bocra-light dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search news..." 
              className="w-full pl-10 pr-4 py-2 bg-bocra-light dark:bg-gray-800 rounded-full border-none focus:ring-2 focus:ring-bocra-blue dark:focus:ring-blue-500 outline-none text-sm dark:text-white transition-colors"
            />
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((item, i) => (
            <motion.article 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col gap-6"
            >
              <div 
                className="relative h-64 rounded-[2rem] overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 cursor-pointer group/image"
                onClick={() => setSelectedImage({ src: item.image, alt: item.title })}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center z-10">
                  <Maximize2 className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity w-10 h-10 drop-shadow-md" />
                </div>
                <div className="absolute top-4 left-4 px-4 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-[10px] font-bold text-bocra-blue dark:text-blue-400 uppercase tracking-widest z-20">
                  {item.category}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
                <h3 className="text-xl font-bold text-bocra-blue dark:text-blue-400 leading-tight group-hover:text-bocra-blue dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <Link to={`/media/${item.id}`} className="flex items-center gap-2 text-bocra-blue font-bold text-sm mt-2">
                  Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="px-12 py-4 rounded-xl border-2 border-bocra-blue dark:border-blue-500 text-bocra-blue dark:text-blue-400 font-bold hover:bg-bocra-blue dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all">
            Load More Stories
          </button>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="bg-bocra-dark dark:bg-gray-950 text-white py-24 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl font-display font-bold">Featured Publications</h2>
              <p className="text-gray-400 leading-relaxed">
                Access our latest annual reports, strategic plans, and sector performance reviews to understand the impact of our regulatory work.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'BOCRA 2025 Annual Report', icon: FileText, url: 'https://www.bocra.org.bw/sites/default/files/sites/default/files/documents/BOCRA2025_ANNUAL_REPORT_%28WEB%29_compressed.pdf' },
                  { title: 'BOCRA Newsletter - July 2025', icon: FileText, url: 'https://www.bocra.org.bw/sites/default/files/BOCRA_NEWSLETTER_-_JULY_2025.pdf' },
                  { title: 'BOCRA Customer Satisfaction Report', icon: FileText, url: 'https://www.bocra.org.bw/sites/default/files/documents/Final_Report_BOCRA_Cust_Satisfaction.pdf' },
                ].map((pub) => (
                  <a key={pub.title} href={pub.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <pub.icon className="w-6 h-6 text-bocra-blue" />
                      <span className="font-bold">{pub.title}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-800 rounded-[2rem] overflow-hidden relative border border-gray-700">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/Bk-6y3lgALU" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
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
