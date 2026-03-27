import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Globe, Mail, Phone, Info, BarChart3, Users, Activity, Radio, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const broadcasters = [
  { id: 1, name: 'Duma FM', type: 'Commercial Radio', status: 'Active', coverage: 'Regional', email: 'info@dumafm.co.bw', phone: '+267 395 5555', website: 'www.dumafm.co.bw', address: 'Plot 59140, Block 7, Gaborone', logo: 'https://cdn-profiles.tunein.com/s138245/images/logog.jpg?t=1664783776000', validityPeriod: '4 MAY 2007 - 3 MAY 2022', licenseNumber: 'RBL 003/07' },
  { id: 2, name: 'Gabz FM', type: 'Commercial Radio', status: 'Active', coverage: 'Regional', email: 'studio@gabzfm.bw', phone: '+267 391 2345', website: 'www.gabzfm.bw', address: 'Plot 64516, Showgrounds Close, Gaborone', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBi7YdG62a23QxNopEVArTwDnIownziJI50w&s', validityPeriod: '4 MAY 2007 - 3 MAY 2022', licenseNumber: 'RBL 002/07' },
  { id: 3, name: 'Yarona FM', type: 'Commercial Radio', status: 'Active', coverage: 'Regional', email: 'info@yaronafm.co.bw', phone: '+267 390 0000', website: 'www.yaronafm.co.bw', address: 'Plot 28562, Samora Machel Drive, Gaborone', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Yarona_fm_new_logo.jpg/250px-Yarona_fm_new_logo.jpg', validityPeriod: '4 MAY 2007 - 3 MAY 2022', licenseNumber: 'RBL 001/07' },
  { id: 4, name: 'YTV', type: 'Free to Air TV', status: 'Active', coverage: 'National', email: 'info@ytv.bw', phone: '+267 390 0000', website: 'www.ytv.bw', address: 'Plot 128 Unit 1, Kgale Court, Gaborone', logo: 'https://picsum.photos/seed/ytv/200/200', validityPeriod: '07 April 2021 - 06 April 2031', licenseNumber: 'CSP 04-20/21' },
  { id: 5, name: 'On Air News', type: 'Free to Air TV', status: 'Active', coverage: 'National', email: 'info@onairnews.bw', phone: '+267 390 0000', website: 'www.onairnews.bw', address: 'Plot 1363, Mophane Road, Gaborone', logo: 'https://picsum.photos/seed/onairnews/200/200', validityPeriod: '21 January 2021 - 20 January 2031', licenseNumber: 'CSP 03-20/21' },
  { id: 6, name: 'Maru TV', type: 'Free to Air TV', status: 'Active', coverage: 'National', email: 'info@marutv.bw', phone: '+267 390 0000', website: 'www.marutv.bw', address: 'Plot F21, Fairgrounds Mall, Gaborone', logo: 'https://picsum.photos/seed/marutv/200/200', validityPeriod: '23 JUNE 2017 - 22 JUNE 2027', licenseNumber: 'SBS 03-17/18' },
];

export default function RegisteredBroadcasters() {
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

  const sortedBroadcasters = React.useMemo(() => {
    let sortableBroadcasters = [...broadcasters];
    if (sortConfig !== null) {
      sortableBroadcasters.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBroadcasters;
  }, [sortConfig]);

  const filteredBroadcasters = sortedBroadcasters.filter(br =>
    br.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    br.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 pb-24 bg-green-50/30 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-sector-broadcast dark:hover:text-green-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/licensing" className="hover:text-sector-broadcast dark:hover:text-green-400 transition-colors">Licensing</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-sector-broadcast dark:text-green-400">Registered Broadcasters</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sector-broadcast dark:text-green-400 mb-4">
              Registered Broadcasters
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Comprehensive list of licensed broadcasting service providers in Botswana, including coverage areas and contact information.
            </p>
          </div>

          {/* Search Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search broadcasters by name or type..."
              className="w-full p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-sector-broadcast/20 focus:border-sector-broadcast transition-all text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Broadcasters Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sector-broadcast dark:bg-green-900 text-white">
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('name')}>Broadcaster {getSortIcon('name')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('type')}>Type {getSortIcon('type')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('coverage')}>Coverage {getSortIcon('coverage')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('licenseNumber')}>License No. {getSortIcon('licenseNumber')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('validityPeriod')}>Validity Period {getSortIcon('validityPeriod')}</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm">Contact Details</th>
                    <th className="p-6 font-display font-bold uppercase tracking-wider text-sm text-center cursor-pointer hover:bg-green-600 transition-colors" onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredBroadcasters.map((br) => (
                    <tr key={br.id} className="hover:bg-green-50 dark:hover:bg-gray-800/50 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white border border-gray-100 shadow-sm overflow-hidden">
                            <img src={br.logo} alt={br.name} className="w-full h-full object-contain p-1" referrerPolicy="no-referrer" />
                          </div>
                          <p className="font-bold text-gray-800 dark:text-gray-100">{br.name}</p>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{br.type}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{br.coverage}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{br.licenseNumber}</span>
                      </td>
                      <td className="p-6">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{br.validityPeriod}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <Phone size={14} className="text-sector-broadcast" />
                            <span>{br.phone}</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <MapPin size={14} className="text-sector-broadcast mt-0.5 flex-shrink-0" />
                            <span>{br.address}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          {br.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Info size={20} className="text-sector-broadcast" />
                <p>Data last updated: March 2026.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
