import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GovernorMessage from './pages/GovernorMessage';
import GovernorPage from './pages/GovernorPage';
import DeputyPage from './pages/DeputyPage';
import SecretaryPage from './pages/SecretaryPage';
import AssistantPage from './pages/AssistantPage';
import Services from './pages/Services';
import SpatialServices from './pages/SpatialServices';
import SiteValidityVillage from './pages/SiteValidityVillage';
import SiteValidityCity from './pages/SiteValidityCity';
import BuildingPermits from './pages/BuildingPermits';
import Reconciliation from './pages/Reconciliation';
import SpatialInquiry from './pages/SpatialInquiry';
import UtilitiesRequest from './pages/UtilitiesRequest';
import KioskLicensing from './pages/KioskLicensing';
import StoreOccupancy from './pages/StoreOccupancy';
import ResumeBuilding from './pages/ResumeBuilding';
import MobileTowers from './pages/MobileTowers';
import HeightLimitStudy from './pages/HeightLimitStudy';
import SurveyingLift from './pages/SurveyingLift';
import SurveyingMark from './pages/SurveyingMark';
import NetworkBudget from './pages/NetworkBudget';
import FixedPointCard from './pages/FixedPointCard';
import LevelCertificate from './pages/LevelCertificate';
import SurveyNetwork from './pages/SurveyNetwork';
import ExcavationReport from './pages/ExcavationReport';
import PrivatePropertyAds from './pages/PrivatePropertyAds';
import NewAdLicense from './pages/NewAdLicense';
import RenewAdLicense from './pages/RenewAdLicense';
import EstidamaPage from './pages/EstidamaPage';
import TrainingPrograms from './pages/TrainingPrograms';
import PlanModification from './pages/PlanModification';
import DetailedPlanModification from './pages/DetailedPlanModification';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FloatingClock from './components/FloatingClock';
import GovernorateMap from './pages/GovernorateMap';
import News from './pages/News';
import NewsDetails from './pages/NewsDetails';
import NationalProjectDetails from './pages/NationalProjectDetails';
import Investment from './pages/Investment';
import InvestmentPlan from './pages/InvestmentPlan';
import DiverseOpportunities from './pages/DiverseOpportunities';
import ServiceCategory from './pages/ServiceCategory';
import ServiceRequest from './pages/ServiceRequest';
import IndustrialZones from './pages/IndustrialZones';
import InvestmentContact from './pages/InvestmentContact';
import Tourism from './pages/Tourism';
import TourismDetails from './pages/TourismDetails';
import PhoneDirectory from './pages/PhoneDirectory';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintForm from './pages/ComplaintForm';
import UrgentReportForm from './pages/UrgentReportForm';
import SubmitProposal from './pages/SubmitProposal';
import EvaluatePerformance from './pages/EvaluatePerformance';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/message" element={<GovernorMessage />} />
          <Route path="/about/leaders/governor" element={<GovernorPage />} />
          <Route path="/about/leaders/deputy" element={<DeputyPage />} />
          <Route path="/about/leaders/secretary" element={<SecretaryPage />} />
          <Route path="/about/leaders/assistant" element={<AssistantPage />} />
          <Route path="/about/map" element={<GovernorateMap />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<ErrorBoundary><NewsDetails /></ErrorBoundary>} />
          <Route path="/national-projects/:id" element={<ErrorBoundary><NationalProjectDetails /></ErrorBoundary>} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/spatial" element={<SpatialServices />} />
          <Route path="/services/spatial/site-validity-village" element={<SiteValidityVillage />} />
          <Route path="/services/spatial/site-validity-city" element={<SiteValidityCity />} />
          <Route path="/services/spatial/building-permits" element={<BuildingPermits />} />
          <Route path="/services/spatial/reconciliation" element={<Reconciliation />} />
          <Route path="/services/spatial/inquiry" element={<SpatialInquiry />} />
          <Route path="/services/spatial/utilities-request" element={<UtilitiesRequest />} />
          <Route path="/services/spatial/kiosk-licensing" element={<KioskLicensing />} />
          <Route path="/services/spatial/store-occupancy" element={<StoreOccupancy />} />
          <Route path="/services/spatial/resume-building" element={<ResumeBuilding />} />
          <Route path="/services/spatial/mobile-towers" element={<MobileTowers />} />
          <Route path="/services/spatial/height-limit" element={<HeightLimitStudy />} />
          <Route path="/services/spatial/surveying-lift" element={<SurveyingLift />} />
          <Route path="/services/spatial/surveying-mark" element={<SurveyingMark />} />
          <Route path="/services/spatial/network-budget" element={<NetworkBudget />} />
          <Route path="/services/spatial/fixed-point-card" element={<FixedPointCard />} />
          <Route path="/services/spatial/level-certificate" element={<LevelCertificate />} />
          <Route path="/services/spatial/survey-network" element={<SurveyNetwork />} />
          <Route path="/services/spatial/excavation-report" element={<ExcavationReport />} />
          <Route path="/services/private-property-ads" element={<PrivatePropertyAds />} />
          <Route path="/services/private-property-ads/new-license" element={<NewAdLicense />} />
          <Route path="/services/private-property-ads/renew-license" element={<RenewAdLicense />} />
          <Route path="/services/training" element={<EstidamaPage />} />
          <Route path="/training-programs" element={<TrainingPrograms />} />
          <Route path="/services/plan-modification" element={<PlanModification />} />
          <Route path="/services/detailed-plan-modification" element={<DetailedPlanModification />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/investments" element={<Investment />} />
          <Route path="/investment-plan" element={<ErrorBoundary><InvestmentPlan /></ErrorBoundary>} />
          
          {/* Government Services Routes */}
          <Route path="/services/:categoryId" element={<ErrorBoundary><ServiceCategory /></ErrorBoundary>} />
          <Route path="/service/request" element={<ErrorBoundary><ServiceRequest /></ErrorBoundary>} />

          <Route path="/investments/diverse-opportunities" element={<ErrorBoundary><DiverseOpportunities /></ErrorBoundary>} />
          <Route path="/investments/industrial" element={<ErrorBoundary><IndustrialZones /></ErrorBoundary>} />
          <Route path="/investments/contact" element={<ErrorBoundary><InvestmentContact /></ErrorBoundary>} />
          <Route path="/tourism" element={<ErrorBoundary><Tourism /></ErrorBoundary>} />
          <Route path="/tourism/:id" element={<ErrorBoundary><TourismDetails /></ErrorBoundary>} />
          <Route path="/directory" element={<ErrorBoundary><PhoneDirectory /></ErrorBoundary>} />
          <Route path="/submit-complaint" element={<ErrorBoundary><SubmitComplaint /></ErrorBoundary>} />
          <Route path="/submit-complaint/form" element={<ErrorBoundary><ComplaintForm /></ErrorBoundary>} />
          <Route path="/submit-complaint/urgent" element={<ErrorBoundary><UrgentReportForm /></ErrorBoundary>} />
          <Route path="/submit-proposal" element={<ErrorBoundary><SubmitProposal /></ErrorBoundary>} />
          <Route path="/evaluate-performance" element={<ErrorBoundary><EvaluatePerformance /></ErrorBoundary>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingClock />
    </div>
  );
};

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;









