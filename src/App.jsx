import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Layout & User Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import Banner from './components/Banner';
import Services from './components/Services';
import Destinations from './components/Destinations';
import Institutes from './components/Institutes';
import Events from './components/Events';
import SuccessStories from './components/Story';
import NewsAndArticles from './components/News';
import Gallery from './components/Gallery';
import ContactUs from './components/ContactUs';
import ApplyForm from './pages/ApplyForm';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetail';
import CountryDetails from './pages/CountryDetails';
import AllCountries from './pages/AllCountries';
import AllInstitutes from './pages/AllInstitutes';
import InstituteDetails from './pages/InstituteDetails';
import AllEvents from './pages/AllEvents';
import EventDetails from './pages/EventDetails';
import AllNews from './pages/AllNews';
import NewsDetails from './pages/NewsDetails';
import AllPhotos from './pages/AllPhotos';
import AllStoriesPage from './pages/AllStories';
import Consultation from './pages/Consultation';

// NEW PAGES (Institutes → Programmes → Requirements)
import CountryInstitutes from './pages/CountryInstitures';
import Programmes from './pages/Programmes';
import ProgrammeDetails from './pages/ProgrammeDetails';

// Admin Components 
import Dashboard from './Admin/Dashboard';
import DashboardHome from './Admin/DashboardHome';
import ManageServices from './Admin Pages/ManageServices';
import EligibilityForm from './pages/EligibilityForm';
import ManageEligibility from './Admin Pages/ManageEligibility';
import ApplicationRequests from './Admin Pages/ManageRequests';
import AddCourse from './Admin Pages/AddCourse';
import AddCountry from './Admin/AddCountry';
import AddInstitute from './Admin Pages/AddInstitute';

// === NEW ADMIN PAGES FOR EVENTS ===
import ManageEvents from './Admin Pages/ManageEvent';
import BookingRequests from './Admin Pages/BookingRequests';
import ShareFeedback from './components/Feedback';
import AdminReviews from './Admin Pages/ManageReview';
import UploadNews from './Admin Pages/UploadNews';


// Layout Manager
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPath && <Navbar />}
      {children}
      {!isAdminPath && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>

          {/* ================= HOME PAGE ================= */}
          <Route path="/" element={
            <>
              <Hero />
              <Banner />
              <Services />
              <Destinations />
              <Institutes />
              <Events />
              <SuccessStories />
              <ShareFeedback />
              <NewsAndArticles />
              <ContactUs />
            </>
          } />

          {/* ================= USER PAGES ================= */}

          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/eligibility" element={<EligibilityForm />} />

          <Route path="/news" element={<NewsAndArticles />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/services" element={<AllServices />} />
          <Route path="/service/:id" element={<ServiceDetails />} />

          {/* Countries */}
          <Route path="/countries" element={<AllCountries />} />
          <Route path="/country/:id" element={<CountryDetails />} />

          {/* NEW FLOW */}
          <Route path="/country/:countrySlug/institutes" element={<CountryInstitutes />} />
          <Route path="/institute/:countrySlug/:instSlug/programmes" element={<Programmes />} />
          <Route path="/programme/:countrySlug/:instSlug/:programId" element={<ProgrammeDetails />} />

          {/* Institutes */}
          <Route path="/all-institutes" element={<AllInstitutes />} />
          <Route path="/institute/:slug" element={<InstituteDetails />} />

          {/* Events (User Side) */}
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />

          {/* News */}
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/news/:id" element={<NewsDetails />} />

          {/* Others */}
          <Route path="/photos" element={<AllPhotos />} />
          <Route path="/all-stories" element={<AllStoriesPage />} />
          <Route path="/consult" element={<Consultation />} />

          {/* ================= ADMIN ROUTES ================= */}

          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />

            <Route path="services" element={<ManageServices />} />
            <Route path="applications" element={<ApplicationRequests />} />
            <Route path="eligibility" element={<ManageEligibility />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="add-country" element={<AddCountry />} />
            <Route path="add-institute" element={<AddInstitute />} />

            {/* === NEW EVENT MANAGEMENT ROUTES === */}
            <Route path="manage-events" element={<ManageEvents />} />
            <Route path="event-bookings" element={<BookingRequests />} />



            <Route path="/admin/review" element={<AdminReviews/>} />
            <Route path="/admin/news" element={<UploadNews/>} />

          </Route>



          {/* ================= 404 ================= */}

          <Route path="*" element={
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
              <h1 className="text-9xl font-black text-slate-200">404</h1>
              <p className="text-xl text-slate-500 font-medium mt-4">
                Pawa jayni!
              </p>
              <a
                href="/"
                className="mt-6 px-6 py-2 bg-[#0055FF] text-white rounded-lg shadow-lg"
              >
                Home-e firun
              </a>
            </div>
          } />

        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;