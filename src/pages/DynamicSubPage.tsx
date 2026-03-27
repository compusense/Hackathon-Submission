import { useLocation, Link } from 'react-router-dom';
import { subpagesData } from '../data/subpagesData';
import SubPageLayout from '../components/SubPageLayout';
import { ArrowLeft } from 'lucide-react';

export default function DynamicSubPage() {
  const location = useLocation();
  const data = subpagesData[location.pathname];

  if (!data) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center flex-col gap-6 text-center px-4">
        <div className="w-24 h-24 bg-bocra-light dark:bg-gray-900 rounded-full flex items-center justify-center text-bocra-blue text-4xl font-bold mb-4">
          404
        </div>
        <h1 className="text-4xl font-display font-bold text-bocra-blue dark:text-blue-400">Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          The subpage you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary flex items-center gap-2 mt-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return <SubPageLayout data={data} />;
}
