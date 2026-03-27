import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, ArrowUpDown, Download, Briefcase, Mail, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Tender = {
  title: string;
  reference: string;
  closingDate: string;
  status: 'Open' | 'Closed';
};

type Vacancy = {
  title: string;
  department: string;
  closingDate: string;
  status: 'Open' | 'Closed';
};

const tendersData: Tender[] = [
  { title: 'Supply and Delivery of ICT Equipment', reference: 'BOCRA/ICT/2024/01', closingDate: '15 March 2024', status: 'Closed' },
  { title: 'Provision of Security Services', reference: 'BOCRA/SEC/2024/02', closingDate: '30 April 2024', status: 'Closed' },
  { title: 'Development of Cybersecurity Awareness Campaign Materials', reference: 'BOCRA/CYB/2024/03', closingDate: '15 June 2024', status: 'Closed' },
  { title: 'Supply and Installation of Office Furniture', reference: 'BOCRA/OFS/2024/04', closingDate: '10 July 2024', status: 'Closed' },
  { title: 'Consultancy Services for Strategic Plan Review', reference: 'BOCRA/CON/2024/05', closingDate: '25 August 2024', status: 'Closed' },
  { title: 'Provision of Cleaning and Hygiene Services', reference: 'BOCRA/CLN/2024/06', closingDate: '05 September 2024', status: 'Closed' },
  { title: 'Supply of Radio Frequency Monitoring Equipment', reference: 'BOCRA/RFQ/2024/07', closingDate: '20 October 2024', status: 'Closed' },
  { title: 'Upgrading of Network Infrastructure', reference: 'BOCRA/NET/2025/01', closingDate: '28 February 2025', status: 'Open' },
];

const vacanciesData: Vacancy[] = [
  { title: 'Principal Legal Officer', department: 'Legal Services', closingDate: '31 January 2024', status: 'Closed' },
  { title: 'Senior Network Engineer', department: 'Engineering & Technology', closingDate: '15 February 2024', status: 'Closed' },
  { title: 'Communications Officer', department: 'Corporate Services', closingDate: '10 March 2024', status: 'Closed' },
  { title: 'Cybersecurity Analyst', department: 'Cybersecurity', closingDate: '05 April 2024', status: 'Closed' },
  { title: 'Human Resources Business Partner', department: 'Human Resources', closingDate: '20 May 2024', status: 'Closed' },
  { title: 'Internal Auditor', department: 'Audit', closingDate: '12 June 2024', status: 'Closed' },
  { title: 'Database Administrator', department: 'ICT', closingDate: '30 August 2024', status: 'Closed' },
  { title: 'Manager – Consumer Affairs', department: 'Consumer Affairs', closingDate: '15 March 2025', status: 'Open' },
];

type SortConfig = { key: string; direction: 'asc' | 'desc' } | null;

export default function TendersAndVacancies() {
  const [activeTab, setActiveTab] = useState<'tenders' | 'vacancies'>('tenders');

  const [tendersSearch, setTendersSearch] = useState('');
  const [tendersSort, setTendersSort] = useState<SortConfig>(null);

  const [vacanciesSearch, setVacanciesSearch] = useState('');
  const [vacanciesSort, setVacanciesSort] = useState<SortConfig>(null);

  const handleSort = (key: string, currentSort: SortConfig, setSort: React.Dispatch<React.SetStateAction<SortConfig>>) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (currentSort && currentSort.key === key && currentSort.direction === 'asc') {
      direction = 'desc';
    }
    setSort({ key, direction });
  };

  const sortData = (data: any[], sortConfig: SortConfig) => {
    if (!sortConfig) {
      // Default sort: Open first
      return [...data].sort((a, b) => {
        if (a.status === 'Open' && b.status === 'Closed') return -1;
        if (a.status === 'Closed' && b.status === 'Open') return 1;
        return 0;
      });
    }
    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'closingDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredTenders = useMemo(() => {
    const filtered = tendersData.filter(tender => 
      Object.values(tender).some(val => 
        val.toString().toLowerCase().includes(tendersSearch.toLowerCase())
      )
    );
    return sortData(filtered, tendersSort);
  }, [tendersSearch, tendersSort]);

  const filteredVacancies = useMemo(() => {
    const filtered = vacanciesData.filter(vacancy => 
      Object.values(vacancy).some(val => 
        val.toString().toLowerCase().includes(vacanciesSearch.toLowerCase())
      )
    );
    return sortData(filtered, vacanciesSort);
  }, [vacanciesSearch, vacanciesSort]);

  const handleDownload = () => {
    alert('Document preview would open here');
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === 'Open' 
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center flex-wrap gap-2 text-white/70 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/consumer" className="hover:text-white transition-colors">Consumer</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Tenders & Vacancies</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-display font-bold mb-6"
          >
            Tenders & Vacancies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl"
          >
            Explore the latest procurement opportunities and career openings at the Botswana Communications Regulatory Authority.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('tenders')}
              className={`flex items-center gap-2 px-6 py-4 text-lg font-medium border-b-2 transition-colors ${
                activeTab === 'tenders'
                  ? 'border-bocra-blue text-bocra-blue dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              Tenders
            </button>
            <button
              onClick={() => setActiveTab('vacancies')}
              className={`flex items-center gap-2 px-6 py-4 text-lg font-medium border-b-2 transition-colors ${
                activeTab === 'vacancies'
                  ? 'border-bocra-blue text-bocra-blue dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Vacancies
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'tenders' ? (
              <motion.div 
                key="tenders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-20"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <h2 className="text-3xl font-display font-bold text-bocra-blue dark:text-blue-400">Current Tenders</h2>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search tenders..." 
                  value={tendersSearch}
                  onChange={(e) => setTendersSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-bocra-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('title', tendersSort, setTendersSort)}>
                      <div className="flex items-center gap-2">Tender Title <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('reference', tendersSort, setTendersSort)}>
                      <div className="flex items-center gap-2">Reference Number <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('closingDate', tendersSort, setTendersSort)}>
                      <div className="flex items-center gap-2">Closing Date <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('status', tendersSort, setTendersSort)}>
                      <div className="flex items-center gap-2">Status <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredTenders.length > 0 ? (
                    filteredTenders.map((tender, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                        <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">{tender.title}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{tender.reference}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{tender.closingDate}</td>
                        <td className="p-4"><StatusBadge status={tender.status} /></td>
                        <td className="p-4">
                          <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 text-sm font-medium text-bocra-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            View PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No tenders found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
            ) : (
          <motion.div 
            key="vacancies"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-3xl font-display font-bold text-bocra-blue dark:text-blue-400">Current Vacancies</h2>
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search vacancies..." 
                  value={vacanciesSearch}
                  onChange={(e) => setVacanciesSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-bocra-blue outline-none transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('title', vacanciesSort, setVacanciesSort)}>
                      <div className="flex items-center gap-2">Job Title <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('department', vacanciesSort, setVacanciesSort)}>
                      <div className="flex items-center gap-2">Department <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('closingDate', vacanciesSort, setVacanciesSort)}>
                      <div className="flex items-center gap-2">Closing Date <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" onClick={() => handleSort('status', vacanciesSort, setVacanciesSort)}>
                      <div className="flex items-center gap-2">Status <ArrowUpDown className="w-4 h-4 text-gray-400" /></div>
                    </th>
                    <th className="p-4 font-semibold text-gray-700 dark:text-gray-300">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {filteredVacancies.length > 0 ? (
                    filteredVacancies.map((vacancy, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group">
                        <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">{vacancy.title}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400">{vacancy.department}</td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{vacancy.closingDate}</td>
                        <td className="p-4"><StatusBadge status={vacancy.status} /></td>
                        <td className="p-4">
                          <button 
                            onClick={handleDownload}
                            className="flex items-center gap-2 text-sm font-medium text-bocra-blue dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            View PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No vacancies found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-bocra-light dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-6">Join Our Network</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              Vendors are encouraged to register on our supplier database for future opportunities. Job seekers can send their resumes to our HR department.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/consumer/supplier-registration" className="bg-bocra-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                <Briefcase className="w-5 h-5" />
                Register as Supplier
              </Link>
              <a href="mailto:careers@bocra.org.bw" className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-bocra-blue dark:text-blue-400 border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                <Mail className="w-5 h-5" />
                Email careers@bocra.org.bw
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
