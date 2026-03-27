import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, BarChart3, TrendingDown, Zap, Filter } from 'lucide-react';
import { motion } from 'motion/react';
import { mnoData } from '../data/mnoData';

export default function PriceComparison() {
  const [durationFilter, setDurationFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const durations = useMemo(() => ['All', ...Array.from(new Set(mnoData.map(item => item.duration)))], []);

  const filteredData = useMemo(() => {
    return mnoData.filter(item => {
      const matchesDuration = durationFilter === 'All' || item.duration === durationFilter;
      const matchesSearch = item.bundle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDuration && matchesSearch;
    });
  }, [durationFilter, searchQuery]);

  const stats = useMemo(() => {
    const totalBundles = mnoData.length;
    const allPrices = mnoData.flatMap(d => [d.orange, d.btc, d.mascom].filter(p => p !== null) as number[]);
    const avgPrice = allPrices.length ? (allPrices.reduce((a, b) => a + b, 0) / allPrices.length).toFixed(2) : '0.00';
    return { totalBundles, avgPrice };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      {/* Hero Section */}
      <section className="bg-bocra-blue dark:bg-blue-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center flex-wrap gap-2 text-white/70 mb-6 font-medium" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <Link to="/consumer" className="hover:text-white transition-colors">Consumer</Link>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
            <span className="text-white" aria-current="page">Price Comparison Tool</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">Data Price Comparison Tool</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Compare data bundle prices across mobile network operators to make informed choices.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="region" aria-label="Statistics">
          {[
            { title: 'Total Bundles Compared', value: stats.totalBundles, icon: BarChart3 },
            { title: 'Average Bundle Price (BWP)', value: stats.avgPrice, icon: TrendingDown },
            { title: 'Market Transparency', value: 'High', icon: Zap },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className="w-12 h-12 bg-bocra-light dark:bg-gray-800 rounded-xl flex items-center justify-center text-bocra-blue dark:text-blue-400">
                <stat.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Bundle Comparison</h2>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative w-full sm:w-48">
                <label htmlFor="duration-filter" className="sr-only">Filter by Duration</label>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                <select 
                  id="duration-filter"
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none appearance-none cursor-pointer"
                >
                  {durations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="relative w-full sm:w-72">
                <label htmlFor="search-bundles" className="sr-only">Search Bundles</label>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                <input 
                  id="search-bundles"
                  type="text" 
                  placeholder="Search by bundle size (e.g. 1 GB)..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-bocra-blue outline-none"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto" role="region" aria-label="Data Bundle Comparison Table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th scope="col" className="p-4 font-bold text-gray-900 dark:text-white">Duration</th>
                  <th scope="col" className="p-4 font-bold text-gray-900 dark:text-white">Data Bundle</th>
                  <th scope="col" className="p-4 font-bold text-orange-600 dark:text-orange-400">Orange (BWP)</th>
                  <th scope="col" className="p-4 font-bold text-blue-700 dark:text-blue-400">BTC (BWP)</th>
                  <th scope="col" className="p-4 font-bold text-green-700 dark:text-green-400">Mascom (BWP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredData.map((item, idx) => {
                  const prices = [
                    { name: 'orange', val: item.orange },
                    { name: 'btc', val: item.btc },
                    { name: 'mascom', val: item.mascom }
                  ].filter(p => p.val !== null);
                  
                  const minPrice = prices.length > 0 ? Math.min(...prices.map(p => p.val as number)) : Infinity;

                  return (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 text-gray-600 dark:text-gray-400">{item.duration}</td>
                      <td className="p-4 font-bold text-bocra-blue dark:text-blue-400">{item.bundle}</td>
                      <td className={`p-4 font-medium ${item.orange === minPrice && minPrice !== Infinity ? 'text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.orange !== null ? item.orange.toFixed(2) : '-'}
                      </td>
                      <td className={`p-4 font-medium ${item.btc === minPrice && minPrice !== Infinity ? 'text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.btc !== null ? item.btc.toFixed(2) : '-'}
                      </td>
                      <td className={`p-4 font-medium ${item.mascom === minPrice && minPrice !== Infinity ? 'text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.mascom !== null ? item.mascom.toFixed(2) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-gray-400">No bundles found matching your criteria.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
