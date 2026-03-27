import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  UserCheck, 
  Truck, 
  Radio, 
  Globe, 
  Mail, 
  Zap, 
  ShieldCheck, 
  FileCheck, 
  LogOut, 
  Search, 
  Bell, 
  Settings, 
  ChevronRight, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  Plus,
  MoreVertical,
  Filter,
  Download,
  Home,
  Eye,
  Ban,
  PauseCircle,
  Trash2,
  CheckCircle,
  Phone,
  MapPin,
  ExternalLink,
  Smartphone,
  Newspaper,
  Calendar,
  Briefcase,
  BookOpen,
  Upload,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

// Mock data for Telecom operators
const operatorsData = [
  { id: 1, name: 'CLICK CONNECT (PTY)LTD', type: 'Services and Applications Provider', status: 'Active', marketShare: 10, subscribers: 'N/A', email: 'info@clickconnect.co.bw', phone: '+267 390 1234', website: 'www.clickconnect.co.bw', address: 'Plot 123, Commerce Park, Gaborone', logo: 'https://picsum.photos/seed/clickconnect/200/200', color: 'bg-blue-500', validityPeriod: '17 NOV 2015 - 16 NOV 2030', licenseNumber: 'SAP2015/001' },
  { id: 2, name: 'KI-TECH (PTY)Ltd', type: 'Services and Applications Provider', status: 'Active', marketShare: 5, subscribers: 'N/A', email: 'support@kitech.co.bw', phone: '+267 390 5678', website: 'www.kitech.co.bw', address: 'Plot 456, Broadhurst, Gaborone', logo: 'https://picsum.photos/seed/kitech/200/200', color: 'bg-orange-500', validityPeriod: '16 DEC 2015 - 15 DEC 2030', licenseNumber: 'SAP2015/002' },
  { id: 3, name: 'CARAX (PTY)Ltd', type: 'Services and Applications Provider', status: 'Active', marketShare: 3, subscribers: 'N/A', email: 'info@carax.co.bw', phone: '+267 390 9012', website: 'www.carax.co.bw', address: 'Plot 789, Industrial Site, Francistown', logo: 'https://picsum.photos/seed/carax/200/200', color: 'bg-green-600', validityPeriod: '18 DEC 2015 - 17 DEC 2030', licenseNumber: 'SAP2015/003' },
  { id: 4, name: 'VIRTUAL BUSINESS NETWORK SERVICES', type: 'Services and Applications Provider', status: 'Active', marketShare: 8, subscribers: 'N/A', email: 'sales@vbns.co.bw', phone: '+267 390 3456', website: 'www.vbns.co.bw', address: 'Plot 101, Main Mall, Gaborone', logo: 'https://picsum.photos/seed/vbns/200/200', color: 'bg-red-500', validityPeriod: '18 MAY 2016 - 17 MAY 2031', licenseNumber: 'SAP2016/005' },
  { id: 5, name: 'CONCEROTEL', type: 'Services and Applications Provider', status: 'Active', marketShare: 4, subscribers: 'N/A', email: 'info@concerotel.co.bw', phone: '+267 390 7890', website: 'www.concerotel.co.bw', address: 'Plot 202, Village, Gaborone', logo: 'https://picsum.photos/seed/concerotel/200/200', color: 'bg-red-500', validityPeriod: '11 JUL 2016 - 10 JUL 2031', licenseNumber: 'SAP2016/006' },
  { id: 6, name: 'Mascom Wireless', type: 'Mobile Network Operator', status: 'Active', marketShare: 42, subscribers: '1.8M', email: 'info@mascom.bw', phone: '+267 390 3396', website: 'www.mascom.bw', address: 'Plot 50676, Fairgrounds Office Park, Gaborone', logo: 'https://www.mascom.bw/wp-content/uploads/2021/05/Mascom-Logo.png', color: 'bg-yellow-500', validityPeriod: '15 Years', licenseNumber: 'TEL-MNO-001' },
  { id: 7, name: 'Orange Botswana', type: 'Mobile Network Operator', status: 'Active', marketShare: 38, subscribers: '1.6M', email: 'regulatory@orange.co.bw', phone: '+267 316 3333', website: 'www.orange.co.bw', address: 'Plot 165, Gaborone International Finance Park', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/1200px-Orange_logo.svg.png', color: 'bg-orange-600', validityPeriod: '15 Years', licenseNumber: 'TEL-MNO-002' },
  { id: 8, name: 'BTC Limited', type: 'Fixed & Mobile Operator', status: 'Active', marketShare: 20, subscribers: '0.8M', email: 'info@btc.bw', phone: '+267 395 8000', website: 'www.btc.bw', address: 'Megaleng House, Plot 50350, Gaborone', logo: 'https://www.btc.bw/wp-content/uploads/2021/06/BTC-Logo.png', color: 'bg-blue-600', validityPeriod: '15 Years', licenseNumber: 'TEL-FMO-003' }
];

// Types for our dashboard
type Tab = 'overview' | 'complaints' | 'kyc' | 'suppliers' | 'regulatory' | 'content';

interface ModalConfig {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  type: 'info' | 'confirm' | 'form';
  onConfirm?: () => void;
}

// Mock Data for Regulatory
const complaintsData = [
  { id: 'CMP-2024-001', name: 'James Botho', category: 'Billing', operator: 'Orange', status: 'New', date: '2024-03-26' },
  { id: 'CMP-2024-002', name: 'Maria Lesedi', category: 'Internet', operator: 'BTC', status: 'In Progress', date: '2024-03-25' },
  { id: 'CMP-2024-003', name: 'Pako Tshepo', category: 'Voice', operator: 'Mascom', status: 'Resolved', date: '2024-03-24' },
  { id: 'CMP-2024-004', name: 'Neo Gofaone', category: 'Spectrum', operator: 'Liquid', status: 'New', date: '2024-03-23' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    title: '',
    content: null,
    type: 'info'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('bocra_admin_auth');
    const userData = localStorage.getItem('bocra_admin_user');
    if (!auth || !userData) {
      navigate('/admin/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('bocra_admin_auth');
    localStorage.removeItem('bocra_admin_user');
    navigate('/');
  };

  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
  const openModal = (config: Omit<ModalConfig, 'isOpen'>) => setModalConfig({ ...config, isOpen: true });

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare, badge: 12 },
    { id: 'kyc', label: 'Licensee KYC', icon: UserCheck, badge: 5 },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'regulatory', label: 'Regulatory', icon: ShieldCheck },
    { id: 'content', label: 'Content CMS', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between">
            <div className={cn("flex items-center gap-3 overflow-hidden transition-all", isSidebarOpen ? "opacity-100" : "opacity-0 w-0")}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm p-1">
                <img 
                  src="https://op-web.bocra.org.bw/assets/bocra-logo.png" 
                  alt="BOCRA Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap">BOCRA Admin</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative",
                  activeTab === item.id 
                    ? "bg-bocra-blue text-white shadow-lg shadow-blue-500/20" 
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className={cn("font-medium transition-all", isSidebarOpen ? "opacity-100" : "opacity-0 w-0")}>{item.label}</span>
                {item.badge && isSidebarOpen && (
                  <span className={cn(
                    "ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold",
                    activeTab === item.id ? "bg-white text-bocra-blue" : "bg-red-500 text-white"
                  )}>
                    {item.badge}
                  </span>
                )}
                {!isSidebarOpen && activeTab === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={handleLogout}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all",
                !isSidebarOpen && "justify-center"
              )}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {isSidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-400 hover:text-bocra-blue flex items-center gap-2"
              title="Go to Website Home"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-bold hidden sm:inline">Home</span>
            </Link>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{activeTab}</h2>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              Last updated: Just now
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-none text-sm focus:ring-2 focus:ring-bocra-blue outline-none w-64"
              />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bocra-blue to-blue-400 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                {user?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewTab key="overview" onNavigate={setActiveTab} />}
            {activeTab === 'complaints' && <ComplaintsTab key="complaints" />}
            {activeTab === 'kyc' && <KYCTab key="kyc" openModal={openModal} closeModal={closeModal} />}
            {activeTab === 'suppliers' && <SuppliersTab key="suppliers" />}
            {activeTab === 'regulatory' && <RegulatoryTab key="regulatory" openModal={openModal} closeModal={closeModal} />}
            {activeTab === 'content' && <ContentTab key="content" openModal={openModal} closeModal={closeModal} />}
          </AnimatePresence>
        </div>
      </main>

      {/* Global Modal */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={cn(
                "bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-gray-100 dark:border-gray-800",
                modalConfig.type === 'form' ? "w-full max-w-4xl" : "w-full max-w-lg"
              )}
            >
              <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{modalConfig.title}</h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {modalConfig.content}
              </div>
              {modalConfig.type === 'confirm' && (
                <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800 flex justify-end gap-4">
                  <button onClick={closeModal} className="px-6 py-2 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">Cancel</button>
                  <button 
                    onClick={() => {
                      modalConfig.onConfirm?.();
                      closeModal();
                    }}
                    className="px-6 py-2 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                  >
                    Confirm Action
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const stats = [
    { label: 'Total Complaints', value: '1,284', trend: '+12%', icon: MessageSquare, color: 'blue', tab: 'complaints' },
    { label: 'Active Licenses', value: '452', trend: '+3%', icon: ShieldCheck, color: 'green', tab: 'regulatory' },
    { label: 'KYC Submissions', value: '89', trend: '+24%', icon: UserCheck, color: 'purple', tab: 'kyc' },
    { label: 'Pending Tenders', value: '14', trend: '-2%', icon: FileCheck, color: 'orange', tab: 'content' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-bocra-blue to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-blue-100 max-w-xl">
            Everything is running smoothly. You have 12 new complaints and 5 KYC updates pending review today.
          </p>
          <div className="mt-6 flex gap-4">
            <button 
              onClick={() => onNavigate('complaints')}
              className="bg-white text-bocra-blue px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all"
            >
              Review Complaints
            </button>
            <button className="bg-blue-600/30 text-white border border-white/20 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-600/50 transition-all">
              System Logs
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate(stat.tab as Tab)}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                stat.color === 'blue' && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                stat.color === 'green' && "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
                stat.color === 'purple' && "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
                stat.color === 'orange' && "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
              )}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.trend.startsWith('+') ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Complaints</h3>
            <button onClick={() => onNavigate('complaints')} className="text-bocra-blue font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {[
              { id: 'CMP-892', user: 'Kabelo Molefe', type: 'Billing Dispute', status: 'New', time: '10 mins ago' },
              { id: 'CMP-891', user: 'Sarah Tlou', type: 'Network Outage', status: 'In Progress', time: '2 hours ago' },
              { id: 'CMP-890', user: 'Thabo Dube', type: 'Data Depletion', status: 'Resolved', time: '5 hours ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-bold">
                    {item.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{item.user}</p>
                    <p className="text-xs text-gray-500">{item.type} • {item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    item.status === 'New' && "bg-blue-50 text-blue-600",
                    item.status === 'In Progress' && "bg-orange-50 text-orange-600",
                    item.status === 'Resolved' && "bg-green-50 text-green-600",
                  )}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Tender', icon: Plus, color: 'blue', tab: 'content' },
              { label: 'Update Prices', icon: Zap, color: 'orange', tab: 'content' },
              { label: 'New Project', icon: Globe, color: 'green', tab: 'content' },
              { label: 'Export Data', icon: Download, color: 'purple', tab: 'overview' },
            ].map((action, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate(action.tab as Tab)}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-bocra-blue hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110",
                  action.color === 'blue' && "bg-blue-50 text-blue-600",
                  action.color === 'orange' && "bg-orange-50 text-orange-600",
                  action.color === 'green' && "bg-green-50 text-green-600",
                  action.color === 'purple' && "bg-purple-50 text-purple-600",
                )}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{action.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 p-6 bg-bocra-light dark:bg-gray-800 rounded-2xl">
            <p className="text-xs font-bold text-bocra-blue dark:text-blue-400 uppercase tracking-widest mb-2">System Status</p>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComplaintsTab() {
  const [complaints, setComplaints] = useState(complaintsData);

  const updateStatus = (id: string, newStatus: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
    >
      <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Consumer Complaints</h3>
          <p className="text-gray-500 text-sm">Manage and respond to consumer issues</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-bocra-blue rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-xs uppercase tracking-widest font-bold">
            <tr>
              <th className="px-8 py-4">Complaint ID</th>
              <th className="px-8 py-4">Consumer</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Operator</th>
              <th className="px-8 py-4">Status</th>
              <th className="px-8 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {complaints.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <td className="px-8 py-4 font-mono text-xs font-bold text-bocra-blue">{item.id}</td>
                <td className="px-8 py-4">
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</p>
                </td>
                <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400">{item.category}</td>
                <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400">{item.operator}</td>
                <td className="px-8 py-4">
                  <select 
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value)}
                    className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider outline-none border-none cursor-pointer",
                      item.status === 'New' && "bg-blue-50 text-blue-600",
                      item.status === 'In Progress' && "bg-orange-50 text-orange-600",
                      item.status === 'Resolved' && "bg-green-50 text-green-600",
                    )}
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td className="px-8 py-4 text-right">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 group-hover:text-bocra-blue transition-all">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function KYCTab({ openModal, closeModal }: { openModal: (config: any) => void; closeModal: () => void }) {
  const [kycSubmissions, setKycSubmissions] = useState([
    { 
      id: 1, 
      company: 'Orange Botswana', 
      category: 'Mobile Operator', 
      date: '2024-03-25', 
      status: 'Pending',
      email: 'regulatory@orange.co.bw',
      phone: '+267 390 1234',
      documents: [
        { name: 'Company Registration', status: 'Valid' },
        { name: 'Tax Clearance', status: 'Valid' },
        { name: 'Shareholder Agreement', status: 'Pending Review' }
      ]
    },
    { id: 2, company: 'BTC Limited', category: 'Fixed & Mobile', date: '2024-03-24', status: 'Verified' },
    { id: 3, company: 'Mascom Wireless', category: 'Mobile Operator', date: '2024-03-23', status: 'Verified' },
    { 
      id: 4, 
      company: 'Liquid Intelligent', 
      category: 'Internet Provider', 
      date: '2024-03-22', 
      status: 'Pending',
      email: 'compliance@liquid.co.bw',
      phone: '+267 390 5678',
      documents: [
        { name: 'Company Registration', status: 'Valid' },
        { name: 'Technical Proposal', status: 'Missing Signature' }
      ]
    },
  ]);

  const verifyKYC = (id: number) => {
    setKycSubmissions(prev => prev.map(k => k.id === id ? { ...k, status: 'Verified' } : k));
  };

  const handleViewApplication = (item: any) => {
    openModal({
      title: `Application Details: ${item.company}`,
      type: 'info',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Company Name</p>
              <p className="font-bold text-gray-900 dark:text-white">{item.company}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Category</p>
              <p className="font-bold text-gray-900 dark:text-white">{item.category}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Contact Email</p>
              <p className="font-bold text-gray-900 dark:text-white">{item.email || 'N/A'}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</p>
              <p className="font-bold text-gray-900 dark:text-white">{item.phone || 'N/A'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-bocra-blue" /> Submitted Documents
            </h4>
            <div className="space-y-3">
              {item.documents?.map((doc: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{doc.name}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                    doc.status === 'Valid' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {doc.status}
                  </span>
                </div>
              )) || <p className="text-sm text-gray-500 italic">No documents listed.</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => {
                closeModal();
                handleReachOut(item);
              }}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Reach Out
            </button>
            {item.status === 'Pending' && (
              <button 
                onClick={() => {
                  verifyKYC(item.id);
                  closeModal();
                }}
                className="flex-1 bg-bocra-blue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Approve & Verify
              </button>
            )}
          </div>
        </div>
      )
    });
  };

  const handleReachOut = (item: any) => {
    openModal({
      title: `Contact Licensee: ${item.company}`,
      type: 'form',
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl flex gap-3 text-blue-700 dark:text-blue-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Send a direct message to the regulatory contact person for this application.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Subject</label>
              <input 
                type="text" 
                defaultValue={`Clarification Required: KYC Submission - ${item.company}`}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
              <textarea 
                rows={5}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue resize-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
            <button 
              onClick={() => {
                alert('Message sent successfully!');
                closeModal();
              }}
              className="flex-1 bg-bocra-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20"
            >
              Send Message
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {kycSubmissions.map((item, i) => (
        <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500 font-bold text-xl">
              {item.company.charAt(0)}
            </div>
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              item.status === 'Pending' ? "bg-orange-50 text-orange-600" : "bg-green-50 text-green-600"
            )}>
              {item.status}
            </span>
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.company}</h4>
          <p className="text-sm text-gray-500 mb-4">{item.category}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
            <Clock className="w-3 h-3" /> Submitted on {item.date}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => handleViewApplication(item)}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all"
            >
              View Application
            </button>
            <button 
              onClick={() => handleReachOut(item)}
              className="p-2 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              title="Reach Out"
            >
              <Mail className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function SuppliersTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Supplier Registrations</h3>
          <p className="text-gray-500 text-sm">Review and manage vendor applications</p>
        </div>
        <button className="bg-bocra-blue text-white px-6 py-2 rounded-xl font-bold text-sm">Add New Supplier</button>
      </div>
      <div className="space-y-4">
        {[
          { name: 'TechSolutions Ltd', services: 'IT Infrastructure', location: 'Gaborone', status: 'Approved' },
          { name: 'Global Logistics', services: 'Courier Services', location: 'Francistown', status: 'Pending' },
          { name: 'PowerConnect', services: 'Electrical Works', location: 'Maun', status: 'Approved' },
        ].map((supplier, i) => (
          <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-bocra-blue transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{supplier.name}</p>
                <p className="text-xs text-gray-500">{supplier.services} • {supplier.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                supplier.status === 'Approved' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
              )}>
                {supplier.status}
              </span>
              <button className="p-2 text-gray-400 hover:text-bocra-blue">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContentTab({ openModal, closeModal }: { openModal: (config: any) => void; closeModal: () => void }) {
  const [sections, setSections] = useState(contentSections);

  const handleAddListing = (section: any) => {
    let title = '';
    let date = '';
    let category = 'General';
    let description = '';

    openModal({
      title: `Add New ${section.name.slice(0, -1)}`,
      type: 'form',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Title</label>
              <input 
                type="text" 
                onChange={(e) => title = e.target.value}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue" 
                placeholder="Enter title..." 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Date</label>
                <input 
                  type="date" 
                  onChange={(e) => date = e.target.value}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Category</label>
                <select 
                  onChange={(e) => category = e.target.value}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue"
                >
                  <option>General</option>
                  <option>Regulatory</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Content / Description</label>
              <textarea 
                rows={6} 
                onChange={(e) => description = e.target.value}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-bocra-blue resize-none" 
                placeholder="Enter content..." 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Featured Image</label>
              <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-bocra-blue transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
            <button 
              onClick={() => {
                if (!title) {
                  alert('Please enter a title');
                  return;
                }
                setSections(prev => prev.map(s => s.id === section.id ? { ...s, items: s.items + 1 } : s));
                alert('Listing added successfully!');
                closeModal();
              }}
              className="flex-1 bg-bocra-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20"
            >
              Publish Listing
            </button>
          </div>
        </div>
      )
    });
  };

  const handleBulkUpload = () => {
    openModal({
      title: 'Bulk Content Upload',
      type: 'form',
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-2xl flex gap-3 text-blue-700 dark:text-blue-300 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>Upload a CSV or Excel file to update multiple listings at once. Download the <span className="underline font-bold cursor-pointer">template here</span>.</p>
          </div>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-12 text-center hover:border-bocra-blue transition-colors cursor-pointer">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-bold mb-1">Select Data File</h4>
            <p className="text-sm text-gray-500">Drag and drop your .csv or .xlsx file here</p>
          </div>
          <div className="flex gap-4">
            <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
            <button 
              onClick={() => {
                alert('Processing bulk upload...');
                closeModal();
              }}
              className="flex-1 bg-bocra-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20"
            >
              Start Upload
            </button>
          </div>
        </div>
      )
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Website Content Management</h3>
          <p className="text-gray-500 text-sm">Update listings, news, and regulatory documents</p>
        </div>
        <button 
          onClick={handleBulkUpload}
          className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-6 py-2 rounded-xl font-bold text-sm hover:shadow-md transition-all"
        >
          <Upload className="w-4 h-4" /> Bulk Upload
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-bocra-blue rounded-2xl flex items-center justify-center">
                <section.icon className="w-7 h-7" />
              </div>
              <span className="bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase">
                {section.items} Items
              </span>
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{section.name}</h4>
            <div className="flex gap-2 mt-6">
              <button 
                onClick={() => handleAddListing(section)}
                className="flex-1 bg-bocra-blue text-white py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all"
              >
                + Add New
              </button>
              <button className="flex-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-2 rounded-xl text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                Manage All
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full flex items-center justify-center shrink-0">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-1">System Maintenance Notice</h4>
          <p className="text-orange-700 dark:text-orange-300 text-sm">Scheduled maintenance for the CMS will occur this Sunday at 02:00 AM CAT. Website updates may be delayed during this period.</p>
        </div>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
          Acknowledge
        </button>
      </div>
    </motion.div>
  );
}

function RegulatoryTab({ openModal, closeModal }: { openModal: (config: any) => void; closeModal: () => void }) {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = [
    { id: 'telecom', name: 'Telecommunication', count: 12, icon: Smartphone, color: '#076090' },
    { id: 'broadcasting', name: 'Broadcasting', count: 8, icon: Radio, color: '#006d55' },
    { id: 'postal', name: 'Postal Services', count: 5, icon: Mail, color: '#800000' },
    { id: 'internet', name: 'Internet (ISP)', count: 24, icon: Zap, color: '#D4AC0D' },
    { id: 'spectrum', name: 'Spectrum', count: 156, icon: TrendingUp, color: '#7C3AED' },
    { id: 'type-approval', name: 'Type Approval', count: 342, icon: ShieldCheck, color: '#0d9488' },
  ];

  const mockLicenses = [
    { id: 'LIC-001', company: 'Gaborone Telecom', issued: '2023-01-15', expiry: '2028-01-14', status: 'Active' },
    { id: 'LIC-002', company: 'Desert Connect', issued: '2022-06-20', expiry: '2027-06-19', status: 'Active' },
    { id: 'LIC-003', company: 'SkyLink Botswana', issued: '2024-02-10', expiry: '2029-02-09', status: 'Pending' },
  ];

  const handleIssueLicense = () => {
    openModal({
      title: `Issue New ${selectedSector} License`,
      type: 'form',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Company Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" placeholder="e.g. Botswana Fiber" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">License Type</label>
              <select className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <option>Commercial</option>
                <option>Non-Commercial</option>
                <option>Special Purpose</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Issue Date</label>
              <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Expiry Date</label>
              <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Terms & Conditions</label>
            <textarea rows={3} className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 resize-none" placeholder="Enter license terms..." />
          </div>
          <div className="flex gap-4">
            <button onClick={closeModal} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancel</button>
            <button 
              onClick={() => {
                alert('License issued successfully!');
                closeModal();
              }}
              className="flex-1 bg-bocra-blue text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20"
            >
              Issue License
            </button>
          </div>
        </div>
      )
    });
  };

  const handleAction = (type: string, company: string) => {
    openModal({
      title: `${type} License: ${company}`,
      type: 'confirm',
      content: (
        <div className="text-center space-y-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
            type === 'Revoke' || type === 'Delete' ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
          )}>
            {type === 'Revoke' && <Ban className="w-8 h-8" />}
            {type === 'Suspend' && <PauseCircle className="w-8 h-8" />}
            {type === 'Delete' && <Trash2 className="w-8 h-8" />}
            {type === 'Approve' && <CheckCircle className="w-8 h-8 text-green-600" />}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Are you sure you want to <strong>{type.toLowerCase()}</strong> the license for <strong>{company}</strong>? This action will be logged in the audit trail.
          </p>
        </div>
      ),
      onConfirm: () => {
        alert(`License ${type.toLowerCase()}d successfully.`);
      }
    });
  };

  const viewCompanyDetails = (company: any) => {
    openModal({
      title: `Company Profile: ${company.name || company.company}`,
      type: 'info',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl">
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
              <img src={company.logo || `https://picsum.photos/seed/${company.name}/200/200`} className="w-full h-full object-contain p-2" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{company.name || company.company}</h4>
              <p className="text-gray-500">{company.type || 'Licensed Operator'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                <ShieldCheck className="w-3 h-3" /> License Number
              </div>
              <p className="font-bold">{company.licenseNumber || company.id}</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                <Globe className="w-3 h-3" /> Website
              </div>
              <p className="font-bold text-bocra-blue">{company.website || 'N/A'}</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                <Mail className="w-3 h-3" /> Email
              </div>
              <p className="font-bold">{company.email || 'N/A'}</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                <Phone className="w-3 h-3" /> Contact
              </div>
              <p className="font-bold">{company.phone || 'N/A'}</p>
            </div>
            <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-2xl md:col-span-2">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase mb-1">
                <MapPin className="w-3 h-3" /> Address
              </div>
              <p className="font-bold text-sm">{company.address || 'N/A'}</p>
            </div>
          </div>

          {company.marketShare && (
            <div className="p-6 bg-bocra-blue/5 rounded-3xl border border-bocra-blue/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-bocra-blue">Market Share</span>
                <span className="text-sm font-bold text-bocra-blue">{company.marketShare}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-bocra-blue" style={{ width: `${company.marketShare}%` }} />
              </div>
            </div>
          )}
        </div>
      )
    });
  };

  if (selectedSector) {
    const isTelecom = selectedSector === 'Telecommunication';
    const displayData = isTelecom ? operatorsData : mockLicenses;

    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <button 
          onClick={() => setSelectedSector(null)}
          className="flex items-center gap-2 text-sm font-bold text-bocra-blue hover:underline mb-4"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to Sectors
        </button>
        
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedSector} Licenses</h3>
              <p className="text-gray-500 text-sm">Managing active and pending licenses for this sector</p>
            </div>
            <button 
              onClick={handleIssueLicense}
              className="bg-bocra-blue text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              + Issue New License
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 text-xs uppercase tracking-widest font-bold">
                <tr>
                  <th className="px-8 py-4">License No.</th>
                  <th className="px-8 py-4">Operator</th>
                  <th className="px-8 py-4">{isTelecom ? 'License Type' : 'Issued Date'}</th>
                  <th className="px-8 py-4">{isTelecom ? 'Validity Period' : 'Expiry Date'}</th>
                  <th className="px-8 py-4">{isTelecom ? 'Market Share' : 'Status'}</th>
                  {isTelecom && <th className="px-8 py-4">Subscribers</th>}
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {displayData.map((lic: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-8 py-4 font-mono text-xs font-bold text-bocra-blue">{lic.licenseNumber || lic.id}</td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        {isTelecom && (
                          <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden p-1 shadow-sm">
                            <img src={lic.logo} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                        <span className="font-bold text-gray-900 dark:text-white text-sm">{lic.company || lic.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400">{isTelecom ? lic.type : lic.issued}</td>
                    <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400">{isTelecom ? lic.validityPeriod : lic.expiry}</td>
                    <td className="px-8 py-4">
                      {isTelecom ? (
                        <div className="flex flex-col gap-1.5 min-w-[100px]">
                          <span className="text-xs font-bold text-gray-500">{lic.marketShare}%</span>
                          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className={cn("h-full", lic.color || 'bg-bocra-blue')} style={{ width: `${lic.marketShare}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          lic.status === 'Active' ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                        )}>
                          {lic.status}
                        </span>
                      )}
                    </td>
                    {isTelecom && (
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                          <Users className="w-4 h-4 text-gray-400" />
                          {lic.subscribers}
                        </div>
                      </td>
                    )}
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => viewCompanyDetails(lic)}
                          className="p-2 text-gray-400 hover:text-bocra-blue transition-colors" 
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {lic.status === 'Pending' && (
                          <button 
                            onClick={() => handleAction('Approve', lic.company || lic.name)}
                            className="p-2 text-gray-400 hover:text-green-600 transition-colors" 
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleAction('Suspend', lic.company || lic.name)}
                          className="p-2 text-gray-400 hover:text-orange-600 transition-colors" 
                          title="Suspend"
                        >
                          <PauseCircle className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAction('Revoke', lic.company || lic.name)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
                          title="Revoke"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleAction('Delete', lic.company || lic.name)}
                          className="p-2 text-gray-400 hover:text-red-800 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedSector(sector.name)}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all group cursor-pointer"
          >
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-3"
              style={{ backgroundColor: `${sector.color}15`, color: sector.color }}
            >
              <sector.icon className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{sector.name}</h4>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm font-medium">{sector.count} Active Licenses</p>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-bocra-blue group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
