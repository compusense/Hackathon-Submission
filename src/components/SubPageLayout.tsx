import { Link } from 'react-router-dom';
import { ChevronRight, Download, FileText, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { SubPageData } from '../data/subpagesData';
import { cn } from '@/src/lib/utils';

export default function SubPageLayout({ data }: { data: SubPageData }) {
  const getHeaderBg = () => {
    switch (data.colorScheme) {
      case 'green': return 'bg-sector-broadcast dark:bg-green-900';
      case 'red': return 'bg-sector-postal dark:bg-red-900';
      case 'yellow': return 'bg-sector-internet dark:bg-yellow-900';
      case 'violet': return 'bg-sector-spectrum dark:bg-violet-900';
      case 'maroon': return 'bg-sector-postal dark:bg-red-900';
      case 'grey': return 'bg-gray-600 dark:bg-gray-800';
      default: return 'bg-bocra-blue dark:bg-blue-900';
    }
  };

  const getSidebarBorder = () => {
    switch (data.colorScheme) {
      case 'green': return 'border-sector-broadcast dark:border-green-500';
      case 'red': return 'border-sector-postal dark:border-red-500';
      case 'yellow': return 'border-sector-internet dark:border-yellow-500';
      case 'violet': return 'border-sector-spectrum dark:border-violet-500';
      case 'maroon': return 'border-sector-postal dark:border-red-500';
      case 'grey': return 'border-gray-400 dark:border-gray-600';
      default: return 'border-bocra-blue dark:border-blue-500';
    }
  };

  const getTextColor = () => {
    switch (data.colorScheme) {
      case 'green': return 'text-sector-broadcast dark:text-green-400';
      case 'red': return 'text-sector-postal dark:text-red-400';
      case 'yellow': return 'text-sector-internet dark:text-yellow-400';
      case 'violet': return 'text-sector-spectrum dark:text-violet-400';
      case 'maroon': return 'text-sector-postal dark:text-red-400';
      case 'grey': return 'text-gray-600 dark:text-gray-400';
      default: return 'text-bocra-blue dark:text-blue-400';
    }
  };

  const getHoverTextColor = () => {
    switch (data.colorScheme) {
      case 'green': return 'group-hover:text-sector-broadcast';
      case 'red': return 'group-hover:text-sector-postal';
      case 'yellow': return 'group-hover:text-sector-internet';
      case 'violet': return 'group-hover:text-sector-spectrum';
      case 'maroon': return 'group-hover:text-sector-postal';
      case 'grey': return 'group-hover:text-gray-600';
      default: return 'group-hover:text-bocra-blue';
    }
  };

  const getDownloadBg = () => {
    switch (data.colorScheme) {
      case 'green': return 'bg-sector-broadcast dark:bg-green-900';
      case 'red': return 'bg-sector-postal dark:bg-red-900';
      case 'yellow': return 'bg-sector-internet dark:bg-yellow-900';
      case 'violet': return 'bg-sector-spectrum dark:bg-violet-900';
      case 'maroon': return 'bg-sector-postal dark:bg-red-900';
      case 'grey': return 'bg-gray-600 dark:bg-gray-800';
      default: return 'bg-bocra-blue dark:bg-blue-900';
    }
  };

  const getSidebarBg = () => {
    switch (data.colorScheme) {
      case 'green': return 'bg-green-50/50 dark:bg-green-900/10';
      case 'red': return 'bg-red-50/50 dark:bg-red-900/10';
      case 'yellow': return 'bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'violet': return 'bg-violet-50/50 dark:bg-violet-900/10';
      case 'maroon': return 'bg-red-50/50 dark:bg-red-900/10';
      case 'grey': return 'bg-gray-50 dark:bg-gray-900/10';
      default: return 'bg-bocra-light dark:bg-gray-900';
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-24 bg-white dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <section className={cn("text-white pt-32 pb-16 relative overflow-hidden", getHeaderBg())}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center flex-wrap gap-2 text-white/70 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {data.breadcrumbs.map((bc, i) => (
              <div key={i} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" />
                <Link to={bc.path} className="hover:text-white transition-colors">{bc.label}</Link>
              </div>
            ))}
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-display font-bold"
          >
            {data.title}
          </motion.h1>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {data.content}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 flex flex-col gap-8"
          >
            {/* Related Links */}
            {data.sidebarLinks && data.sidebarLinks.length > 0 && (
              <div className={cn("p-8 rounded-3xl border-2", getSidebarBg(), getSidebarBorder())}>
                <h3 className={cn("text-xl font-bold mb-6 flex items-center gap-2", getTextColor())}>
                  <LinkIcon className="w-5 h-5" /> Related Links
                </h3>
                <ul className="flex flex-col gap-4">
                  {data.sidebarLinks.map((link, i) => {
                    const isExternal = link.path.startsWith('http');
                    
                    if (isExternal) {
                      return (
                        <li key={i}>
                          <a 
                            href={link.path} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between group"
                          >
                            <span className={cn("text-gray-600 dark:text-gray-300 font-medium transition-colors", getHoverTextColor())}>
                              {link.label}
                            </span>
                            <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-colors", getHoverTextColor())} />
                          </a>
                        </li>
                      );
                    }

                    return (
                      <li key={i}>
                        <Link 
                          to={link.path} 
                          className="flex items-center justify-between group"
                        >
                          <span className={cn("text-gray-600 dark:text-gray-300 font-medium transition-colors", getHoverTextColor())}>
                            {link.label}
                          </span>
                          <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-colors", getHoverTextColor())} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Sidebar Content */}
            {data.sidebarContent && (
              <div>
                {data.sidebarContent}
              </div>
            )}

            {/* Downloads */}
            {data.downloads && data.downloads.length > 0 && (
              <div className={cn("p-8 rounded-3xl text-white", getDownloadBg())}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Download className="w-5 h-5" /> Documents
                </h3>
                <ul className="flex flex-col gap-4">
                  {data.downloads.map((doc, i) => (
                    <li key={i}>
                      <a href={doc.url} className="flex items-start gap-4 group bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-colors">
                        <FileText className="w-6 h-6 text-white shrink-0" />
                        <div>
                          <p className="font-bold text-sm group-hover:text-white/80 transition-colors">{doc.title}</p>
                          <p className="text-xs text-white/70 mt-1">{doc.type} • {doc.size}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
