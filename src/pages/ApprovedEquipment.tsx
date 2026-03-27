import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Search, Filter, Download, ArrowUpDown, ArrowUp, ArrowDown, Info, Smartphone, Wifi, Router as RouterIcon, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const approvedEquipment = [
  { 
    id: '17104', 
    companyName: 'ZTE CORPORATION, SA PTY LTD', 
    taNumber: 'BOCRA/TA/2016/2741', 
    manufacturer: 'ZTE', 
    model: 'V7 LITE', 
    description: 'Computer', 
    approvalDate: '2016-08-15', 
    expiryDate: '2017-07-31T12:00:00', 
    status: 'Approved',
    downloadUrl: '#'
  },
  { 
    id: '18250', 
    companyName: 'Apple South Africa', 
    taNumber: 'BOCRA/TA/2023/4567', 
    manufacturer: 'Apple', 
    model: 'iPhone 15', 
    description: 'Mobile Phone', 
    approvalDate: '2023-09-20', 
    expiryDate: '2024-09-20T12:00:00', 
    status: 'Approved',
    downloadUrl: '#'
  },
  { 
    id: '19112', 
    companyName: 'Samsung Electronics BW', 
    taNumber: 'BOCRA/TA/2024/0012', 
    manufacturer: 'Samsung', 
    model: 'Galaxy S24', 
    description: 'Mobile Phone', 
    approvalDate: '2024-01-15', 
    expiryDate: '2025-01-15T12:00:00', 
    status: 'Approved',
    downloadUrl: '#'
  },
  { 
    id: '16554', 
    companyName: 'Huawei Technologies Botswana', 
    taNumber: 'BOCRA/TA/2022/1189', 
    manufacturer: 'Huawei', 
    model: 'Mate 50 Pro', 
    description: 'Mobile Phone', 
    approvalDate: '2022-11-05', 
    expiryDate: '2023-11-05T12:00:00', 
    status: 'Approved',
    downloadUrl: '#'
  },
  { 
    id: '15443', 
    companyName: 'Cisco Systems International', 
    taNumber: 'BOCRA/TA/2021/0882', 
    manufacturer: 'Cisco', 
    model: 'Catalyst 9300', 
    description: 'Network Switch', 
    approvalDate: '2021-06-12', 
    expiryDate: '2022-06-12T12:00:00', 
    status: 'Approved',
    downloadUrl: '#'
  }
];

export default function ApprovedEquipment() {
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

  const sortedEquipment = React.useMemo(() => {
    let sortableItems = [...approvedEquipment];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const filteredEquipment = sortedEquipment.filter(item =>
    item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.taNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTypeIcon = (description: string) => {
    const t = description.toLowerCase();
    if (t.includes('phone')) return <Smartphone size={18} className="text-gray-400" />;
    if (t.includes('router') || t.includes('gateway')) return <RouterIcon size={18} className="text-gray-400" />;
    if (t.includes('wifi') || t.includes('access point')) return <Wifi size={18} className="text-gray-400" />;
    return <Radio size={18} className="text-gray-400" />;
  };

  return (
    <div className="pt-24 pb-24 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium mb-8">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/regulatory" className="hover:text-gray-900 dark:hover:text-white transition-colors">Regulatory</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/regulatory/type-approval" className="hover:text-gray-900 dark:hover:text-white transition-colors">Type Approval</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">Approved Equipment</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Type Approval Database
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
              Search and verify the approval status of communications equipment in Botswana. All equipment listed here has been certified by BOCRA for use in the national network.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by company, manufacturer, model, or TA number..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm">
              <Filter size={20} />
              Filters
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg">
              <Download size={20} />
              Export CSV
            </button>
          </div>

          {/* Equipment Table */}
          <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 border-bottom border-gray-200 dark:border-gray-800">
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('companyName')}>Company Name {getSortIcon('companyName')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('taNumber')}>TA Number {getSortIcon('taNumber')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('id')}>ID {getSortIcon('id')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('manufacturer')}>Manufacturer {getSortIcon('manufacturer')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('model')}>Model {getSortIcon('model')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('description')}>Description {getSortIcon('description')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('approvalDate')}>Approval Date {getSortIcon('approvalDate')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap" onClick={() => handleSort('expiryDate')}>Expiry Date {getSortIcon('expiryDate')}</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-center">Status</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[10px] text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredEquipment.length > 0 ? (
                    filteredEquipment.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                        <td className="p-4">
                          <p className="font-bold text-gray-900 dark:text-white text-xs">{item.companyName}</p>
                        </td>
                        <td className="p-4">
                          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-[10px] font-mono text-gray-700 dark:text-gray-300">
                            {item.taNumber}
                          </code>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">
                          {item.id}
                        </td>
                        <td className="p-4 text-gray-900 dark:text-white font-medium text-xs">
                          {item.manufacturer}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">
                          {item.model}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            {getTypeIcon(item.description)}
                            <span className="text-xs">{item.description}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">
                          {item.approvalDate ? new Date(item.approvalDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                        </td>
                        <td className="p-4 text-gray-600 dark:text-gray-400 text-xs">
                          {new Date(item.expiryDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            {item.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" title="Download Certificate">
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="p-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400">
                            <Search size={32} />
                          </div>
                          <p className="text-gray-500 dark:text-gray-400 font-medium">No equipment found matching your search criteria.</p>
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="text-gray-900 dark:text-white underline font-bold"
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm">
                <Info size={20} className="text-gray-400" />
                <p>Showing {filteredEquipment.length} of {approvedEquipment.length} approved models. Data updated daily.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold disabled:opacity-50" disabled>Previous</button>
                <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold">1</button>
                <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
