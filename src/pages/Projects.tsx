import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data/projectsData';

const sectors = ['All', 'Cybersecurity', 'Education', 'Infrastructure', 'Innovation', 'Broadcasting', 'Sector Development'];

export default function Projects() {
  const [activeSector, setActiveSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSector = activeSector === 'All' || project.sector === activeSector;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSector && matchesSearch;
    });
  }, [activeSector, searchQuery]);

  const getStatusColor = (status: string) => {
    if (status.includes('Ongoing')) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (status.includes('Underway')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    if (status.includes('Completed')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (status.includes('Planning')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center flex-wrap gap-2 text-white/70 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Our Projects</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl"
          >
            BOCRA is committed to driving infrastructure development, enhancing cybersecurity, fostering education, and advancing digital inclusion across Botswana.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {sectors.map(sector => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeSector === sector 
                      ? 'bg-bocra-blue text-white shadow-lg shadow-blue-500/20' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-bocra-blue outline-none transition-all"
              />
            </div>
          </div>

          {/* Cards Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col"
                >
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-bocra-light dark:bg-gray-800 rounded-lg text-bocra-blue dark:text-blue-400">
                        <project.icon className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">{project.description}</p>
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="w-full py-3 rounded-xl border border-bocra-blue text-bocra-blue dark:text-blue-400 dark:border-blue-400 hover:bg-bocra-blue hover:text-white font-bold transition-colors"
                    >
                      Learn More
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-300" />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 object-cover" referrerPolicy="no-referrer" />
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProject.description}</p>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Status: {selectedProject.status}</span>
                  <span className="font-medium">Sector: {selectedProject.sector}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Call to Action Section */}
      <section className="py-20 bg-bocra-light dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-6">Collaborate With Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              We welcome partnerships with stakeholders and organizations committed to advancing Botswana's digital landscape. Contact us to explore future collaboration opportunities.
            </p>
            <a href="mailto:projects@bocra.org.bw" className="bg-bocra-blue hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 mx-auto w-fit">
              <Mail className="w-5 h-5" />
              Email projects@bocra.org.bw
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
