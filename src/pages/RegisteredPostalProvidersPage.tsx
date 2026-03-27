import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Globe, Mail, Phone, Info, Users, Activity, Package, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const providers = [
  { id: 1, name: 'Botswana Post Services Limited', type: 'Public Postal Operator', status: 'Active', coverage: 'National', email: 'info@botswanapost.co.bw', phone: '+267 391 1000', website: 'www.botswanapost.co.bw', address: 'Plot 53952, Khama Crescent, Gaborone', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Botswana_Post_logo.svg/1200px-Botswana_Post_logo.svg.png', color: 'bg-green-600', validityPeriod: '23 AUG 2016 - 22 AUG 2031', licenseNumber: 'DP0 01-16/17' },
  { id: 2, name: 'Aramex Botswana (Pty) Ltd', type: 'Commercial', status: 'Active', coverage: 'International', email: 'gaborone@aramex.com', phone: '+267 390 0000', website: 'www.aramex.com', address: 'Plot 69369, Unit 3, Broadhurst Industrial, Gaborone', logo: 'https://picsum.photos/seed/aramex/200/200', color: 'bg-blue-500', validityPeriod: '23 AUG 2018 - 22 AUG 2028', licenseNumber: 'CPO 11-14/15' },
  { id: 3, name: 'DHL International Botswana (Pty) Ltd', type: 'Commercial', status: 'Active', coverage: 'International', email: 'bw.info@dhl.com', phone: '+267 391 2345', website: 'www.dhl.com', address: 'Plot 20610, Block 3 Industrial, Gaborone', logo: 'https://picsum.photos/seed/dhl/200/200', color: 'bg-red-600', validityPeriod: '23 AUG 2018 - 22 AUG 2028', licenseNumber: 'CPO 11-14/15' },
  { id: 4, name: 'FedEx Express Botswana (Pty) Ltd', type: 'Commercial', status: 'Active', coverage: 'International', email: 'info@fedex.com', phone: '+267 395 5555', website: 'www.fedex.com', address: 'Plot 79, Unit 1 International Commerce Park, Gaborone', logo: 'https://picsum.photos/seed/fedex/200/200', color: 'bg-orange-500', validityPeriod: '23 AUG 2018 - 22 AUG 2028', licenseNumber: 'CPO 04-13/14' },
];

export default function RegisteredPostalProvidersPage() {
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

  const sortedProviders = React.useMemo(() => {
    let sortableProviders = [...providers];
    if (sortConfig !== null) {
      sortableProviders.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProviders;
  }, [sortConfig]);

  const filteredProviders = sortedProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 bg-bocra-light dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-sector-postal dark:hover:text-red-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/licensing" className="hover:text-sector-postal dark:hover:text-red-400 transition-colors">Licensing</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-sector-postal dark:text-red-400">Registered Postal Providers</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sector-postal dark:text-red-400 mb-4">
              Registered Postal Service Providers
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive list of licensed postal and courier service providers in Botswana.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search providers by name or type..."
              className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-sector-postal/20 focus:border-sector-postal transition-all text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Providers Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sector-postal dark:bg-red-900 text-white">
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('name')}>Provider {getSortIcon('name')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('type')}>Type {getSortIcon('type')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('coverage')}>Coverage {getSortIcon('coverage')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('licenseNumber')}>License No. {getSortIcon('licenseNumber')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('validityPeriod')}>Validity Period {getSortIcon('validityPeriod')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm">Contact Details</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm text-center cursor-pointer hover:bg-red-700 transition-colors" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProviders.map((op) => (
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
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.coverage}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.licenseNumber}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{op.validityPeriod}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2">
                          {op.phone !== 'N/A' && (
                            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                              <Phone size={14} className="text-sector-postal" />
                              <span>{op.phone}</span>
                            </div>
                          )}
                          <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <MapPin size={14} className="text-sector-postal mt-0.5 flex-shrink-0" />
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
                <Info size={20} className="text-sector-postal" />
                <p>Data last updated: March 2026.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
