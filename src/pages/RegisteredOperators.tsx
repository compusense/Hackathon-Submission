import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Globe, Mail, Phone, Info, BarChart3, Users, Activity, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const operators = [
  { id: 1, name: 'CLICK CONNECT (PTY)LTD', type: 'Services and Applications Provider', status: 'Active', marketShare: 10, subscribers: 'N/A', email: 'info@clickconnect.co.bw', phone: '+267 390 1234', website: 'www.clickconnect.co.bw', address: 'Plot 123, Commerce Park, Gaborone', logo: 'https://picsum.photos/seed/clickconnect/200/200', color: 'bg-blue-500', validityPeriod: '17 NOV 2015 - 16 NOV 2030', licenseNumber: 'SAP2015/001' },
  { id: 2, name: 'KI-TECH (PTY)Ltd', type: 'Services and Applications Provider', status: 'Active', marketShare: 5, subscribers: 'N/A', email: 'support@kitech.co.bw', phone: '+267 390 5678', website: 'www.kitech.co.bw', address: 'Plot 456, Broadhurst, Gaborone', logo: 'https://picsum.photos/seed/kitech/200/200', color: 'bg-orange-500', validityPeriod: '16 DEC 2015 - 15 DEC 2030', licenseNumber: 'SAP2015/002' },
  { id: 3, name: 'CARAX (PTY)Ltd', type: 'Services and Applications Provider', status: 'Active', marketShare: 3, subscribers: 'N/A', email: 'info@carax.co.bw', phone: '+267 390 9012', website: 'www.carax.co.bw', address: 'Plot 789, Industrial Site, Francistown', logo: 'https://picsum.photos/seed/carax/200/200', color: 'bg-green-600', validityPeriod: '18 DEC 2015 - 17 DEC 2030', licenseNumber: 'SAP2015/003' },
  { id: 4, name: 'VIRTUAL BUSINESS NETWORK SERVICES', type: 'Services and Applications Provider', status: 'Active', marketShare: 8, subscribers: 'N/A', email: 'sales@vbns.co.bw', phone: '+267 390 3456', website: 'www.vbns.co.bw', address: 'Plot 101, Main Mall, Gaborone', logo: 'https://picsum.photos/seed/vbns/200/200', color: 'bg-red-500', validityPeriod: '18 MAY 2016 - 17 MAY 2031', licenseNumber: 'SAP2016/005' },
  { id: 5, name: 'CONCEROTEL', type: 'Services and Applications Provider', status: 'Active', marketShare: 4, subscribers: 'N/A', email: 'info@concerotel.co.bw', phone: '+267 390 7890', website: 'www.concerotel.co.bw', address: 'Plot 202, Village, Gaborone', logo: 'https://picsum.photos/seed/concerotel/200/200', color: 'bg-red-500', validityPeriod: '11 JUL 2016 - 10 JUL 2031', licenseNumber: 'SAP2016/006' },
];

export default function RegisteredOperators() {
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

  const sortedOperators = React.useMemo(() => {
    let sortableOperators = [...operators];
    if (sortConfig !== null) {
      sortableOperators.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOperators;
  }, [sortConfig]);

  const filteredOperators = sortedOperators.filter(operator =>
    operator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    operator.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 bg-bocra-light dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/licensing" className="hover:text-bocra-blue dark:hover:text-blue-400 transition-colors">Licensing</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-bocra-blue dark:text-blue-400">Registered Operators</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-bocra-blue dark:text-blue-400 mb-4">
              Registered Telecommunication Operators
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive list of licensed telecommunications service providers in Botswana, including market analytics and contact information.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search operators by name or type..."
              className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-bocra-blue/20 focus:border-bocra-blue transition-all text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Operators Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bocra-blue dark:bg-blue-900 text-white">
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('name')}>Operator {getSortIcon('name')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('type')}>License Type {getSortIcon('type')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('licenseNumber')}>License No. {getSortIcon('licenseNumber')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('validityPeriod')}>Validity Period {getSortIcon('validityPeriod')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('marketShare')}>Market Share {getSortIcon('marketShare')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('subscribers')}>Subscribers {getSortIcon('subscribers')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm">Contact Details</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm text-center cursor-pointer hover:bg-blue-600 transition-colors" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredOperators.map((op) => (
                    <tr key={op.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-sm overflow-hidden">
                            <img 
                              src={op.logo} 
                              alt={op.name} 
                              className="w-full h-full object-contain p-1" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                          <p className="font-bold text-gray-800 dark:text-gray-100">{op.name}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.type}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.licenseNumber}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.validityPeriod}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>{op.marketShare}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${op.marketShare}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full ${op.color}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Users size={16} className="text-gray-400" />
                          <span className="font-bold">{op.subscribers}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Phone size={14} className="text-bocra-blue" />
                            <span>{op.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <MapPin size={14} className="text-bocra-blue mt-0.5 flex-shrink-0" />
                            <span>{op.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          {op.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Info size={20} className="text-bocra-blue" />
                <p>Data last updated: March 2026. Market share based on active mobile subscriptions.</p>
              </div>
              <Link to="/regulatory/statistics" className="btn-secondary text-sm py-2">
                View Full Statistics Report
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
