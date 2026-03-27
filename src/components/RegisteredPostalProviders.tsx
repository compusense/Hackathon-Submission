import React from 'react';

const providers = [
  { name: 'Gaborone Courier Services Ltd', type: 'Commercial', coverage: 'National' },
  { name: 'Botswana Post', type: 'Public', coverage: 'National' },
  { name: 'FastTrack Logistics', type: 'Commercial', coverage: 'International' },
  { name: 'Swift Delivery Solutions', type: 'Commercial', coverage: 'Local' },
];

export default function RegisteredPostalProviders() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
      <h2 className="text-2xl font-display font-bold text-sector-postal dark:text-red-400 mb-6">Registered Postal Service Providers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="py-4 px-4 font-bold text-gray-600 dark:text-gray-300">Provider Name</th>
              <th className="py-4 px-4 font-bold text-gray-600 dark:text-gray-300">Type</th>
              <th className="py-4 px-4 font-bold text-gray-600 dark:text-gray-300">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider, i) => (
              <tr key={i} className="border-b border-gray-50 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200">{provider.name}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{provider.type}</td>
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{provider.coverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
