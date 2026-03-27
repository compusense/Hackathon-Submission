import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import About from './pages/About';
import Regulatory from './pages/Regulatory';
import Consumer from './pages/Consumer';
import Licensing from './pages/Licensing';
import ApplyLicense from './pages/ApplyLicense';
import RegisteredOperators from './pages/RegisteredOperators';
import RegisteredBroadcasters from './pages/RegisteredBroadcasters';
import RegisteredISPs from './pages/RegisteredISPs';
import TelecommunicationRegistration from './pages/TelecommunicationRegistration';
import InternetRegistration from './pages/InternetRegistration';
import BroadcastingRegistration from './pages/BroadcastingRegistration';
import PostalRegistration from './pages/PostalRegistration';
import SpectrumRegistration from './pages/SpectrumRegistration';
import RegisteredPostalProvidersPage from './pages/RegisteredPostalProvidersPage';
import ApprovedEquipment from './pages/ApprovedEquipment';
import Media from './pages/Media';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import DynamicSubPage from './pages/DynamicSubPage';
import SupplierRegistration from './pages/SupplierRegistration';
import LicenseeKYC from './pages/LicenseeKYC';
import TendersAndVacancies from './pages/TendersAndVacancies';
import PriceComparison from './pages/PriceComparison';
import RedirectPage from './pages/RedirectPage';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="bocra-theme">
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/redirect" element={<RedirectPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/projects" element={<Projects />} />
            <Route path="/about/:slug" element={<DynamicSubPage />} />
            <Route path="/regulatory" element={<Regulatory />} />
            <Route path="/regulatory/:slug" element={<DynamicSubPage />} />
            <Route path="/consumer" element={<Consumer />} />
            <Route path="/consumer/tenders-and-vacancies" element={<TendersAndVacancies />} />
            <Route path="/consumer/price-comparison" element={<PriceComparison />} />
            <Route path="/consumer/supplier-registration" element={<SupplierRegistration />} />
            <Route path="/consumer/licensee-kyc" element={<LicenseeKYC />} />
            <Route path="/consumer/:slug" element={<DynamicSubPage />} />
            <Route path="/licensing" element={<Licensing />} />
            <Route path="/licensing/apply" element={<ApplyLicense />} />
            <Route path="/licensing/operators" element={<RegisteredOperators />} />
            <Route path="/licensing/broadcasters" element={<RegisteredBroadcasters />} />
            <Route path="/licensing/isps" element={<RegisteredISPs />} />
            <Route path="/licensing/telecom-registration" element={<TelecommunicationRegistration />} />
            <Route path="/licensing/internet-registration" element={<InternetRegistration />} />
            <Route path="/licensing/broadcasting-registration" element={<BroadcastingRegistration />} />
            <Route path="/licensing/postal-registration" element={<PostalRegistration />} />
            <Route path="/licensing/spectrum-registration" element={<SpectrumRegistration />} />
            <Route path="/licensing/postal-providers" element={<RegisteredPostalProvidersPage />} />
            <Route path="/licensing/approved-equipment" element={<ApprovedEquipment />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            {/* Fallback for subpages or missing routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
