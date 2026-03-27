import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Globe, Mail, Phone, Info, BarChart3, Users, Activity, Zap, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const isps = [
  { id: 1, name: 'Orange Botswana', type: 'ISP', status: 'Active', coverage: 'National', email: 'support@orange.co.bw', phone: '+267 316 3333', website: 'www.orange.co.bw', address: 'Plot 166 Queens road main mall, Gaborone', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR89y1PgmYiRXZ9eTPqWvHkArd68LoY8hl0ZA&s', color: 'bg-orange-500', validityPeriod: '01 SEPT 2018 – 03 AUG 2033', licenseNumber: 'SAP 02-18/19 PTO' },
  { id: 2, name: 'Liquid Intelligent Technologies', type: 'ISP', status: 'Active', coverage: 'National', email: 'info@liquid.tech', phone: '+267 391 2345', website: 'www.liquid.tech', address: '2nd Floor, Union Building, CBD, Gaborone', logo: 'https://liquid.tech/wp-content/uploads/2023/05/LIQUID-IT_RGB1000x1000-e1683037331943.jpg', color: 'bg-red-500', validityPeriod: '20 JUN 2018 - 19 JUN 2033', licenseNumber: 'SAP 2018/062' },
  { id: 3, name: 'Paratus Botswana', type: 'ISP', status: 'Active', coverage: 'National', email: 'sales.bw@paratus.africa', phone: '+267 397 2345', website: 'www.paratus.africa', address: 'Plot 85, Unit 3, Gaborone Int Commerce Park', logo: 'https://paratus.africa/botswana/wp-content/uploads/2023/02/Paratus-Africa-Group.jpg', color: 'bg-red-500', validityPeriod: '14 JUNE 2017 - 13 JUNE 2032', licenseNumber: 'SAP2017/031' },
];

export default function RegisteredISPs() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig?.key !== key) return <ArrowUpDown size={16} className="inline ml-1 opacity-50" />;
    return sortConfig.direction === 'asc' ? <ArrowUp size={16} className="inline ml-1" /> : <ArrowDown size={16} className="inline ml-1" />;
  };

  const sortedISPs = React.useMemo(() => {
    let sortableISPs = [...isps];
    if (sortConfig !== null) {
      sortableISPs.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableISPs;
  }, [sortConfig]);

  const filteredISPs = sortedISPs.filter(isp =>
    isp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    isp.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-sector-internet dark:hover:text-yellow-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/licensing" className="hover:text-sector-internet dark:hover:text-yellow-400 transition-colors">Licensing</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-sector-internet dark:text-yellow-400">Registered ISPs</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sector-internet dark:text-yellow-400 mb-4">
              Registered Internet Service Providers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive list of licensed internet service providers in Botswana, including coverage areas and contact information.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search ISPs by name or type..."
              className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-sector-internet/20 focus:border-sector-internet transition-all text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ISPs Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sector-internet text-bocra-dark">
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('name')}>ISP {getSortIcon('name')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('type')}>Type {getSortIcon('type')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('coverage')}>Coverage {getSortIcon('coverage')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('licenseNumber')}>License No. {getSortIcon('licenseNumber')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('validityPeriod')}>Validity Period {getSortIcon('validityPeriod')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm">Contact Details</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm text-center cursor-pointer hover:bg-yellow-500 transition-colors" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredISPs.map((isp) => (
                    <tr key={isp.id} className="hover:bg-yellow-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-sm overflow-hidden">
                            <img src={isp.logo} alt={isp.name} className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
                          </div>
                          <p className="font-bold text-gray-800 dark:text-gray-100">{isp.name}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{isp.type}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{isp.coverage}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{isp.licenseNumber}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{isp.validityPeriod}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Phone size={14} className="text-sector-internet" />
                            <span>{isp.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <MapPin size={14} className="text-sector-internet mt-0.5 flex-shrink-0" />
                            <span>{isp.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                          {isp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Info size={20} className="text-sector-internet" />
                <p>Data last updated: March 2026.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
