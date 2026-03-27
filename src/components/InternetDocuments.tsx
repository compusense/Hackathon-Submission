import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, Download } from 'lucide-react';

const documents = [
  { title: 'Accreditation Procedure', size: '1.2 MB', type: 'PDF' },
  { title: 'ACS standards', size: '2.5 MB', type: 'PDF' },
  { title: 'ACS Checklist', size: '0.8 MB', type: 'PDF' },
  { title: 'List of Approved Auditors', size: '1.1 MB', type: 'PDF' },
  { title: 'Electronic Communications and Transactions Act', size: '3.0 MB', type: 'PDF' },
  { title: 'Certifying Agents Application Form', size: '0.5 MB', type: 'PDF' },
  { title: 'Guide For Certifying Agents', size: '1.8 MB', type: 'PDF' },
  { title: 'List of Approved Certifying Agents', size: '0.9 MB', type: 'PDF' },
  { title: 'Electronic Evidence Regulations', size: '1.4 MB', type: 'PDF' }
];

export default function InternetDocuments() {
  const [showAll, setShowAll] = useState(false);
  const visibleDocs = showAll ? documents : documents.slice(0, 4);

  return (
    <div className="p-8 rounded-3xl text-white bg-yellow-500 dark:bg-yellow-900">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Download className="w-5 h-5" /> Documents
      </h3>
      <ul className="flex flex-col gap-4">
        {visibleDocs.map((doc, i) => (
          <li key={i}>
            <a href="#" className="flex items-start gap-4 group bg-yellow-400/50 p-4 rounded-xl hover:bg-yellow-400/70 transition-colors">
              <FileText className="w-6 h-6 text-white shrink-0" />
              <div>
                <p className="font-bold text-sm group-hover:text-white/90 transition-colors">{doc.title}</p>
                <p className="text-xs text-white/70 mt-1">{doc.type} • {doc.size}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      {documents.length > 4 && (
        <button 
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-bold text-white hover:text-yellow-100 transition-colors"
        >
          {showAll ? 'Show less' : 'See more'} {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </div>
  );
}
