import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Page Components
import Banner from './components/Banner';
import ContactUs from './components/ContactUs';
import Destinations from './components/Destinations';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Institutes from './components/Institutes';
import NewsAndArticles from './components/News';
import ReviewsPage from './components/Reviews';
import Services from './components/Services';
import SuccessStories from './components/Story';
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

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* Home Page Route */}
        <Route path="/" element={
          <>
            <Hero />
            <Banner />
            <Services />
            <Destinations />
            <Institutes />
            <Events />
            <SuccessStories />
            <ReviewsPage />
            <NewsAndArticles />
            <Gallery />
            <ContactUs />
          </>
        } />

        {/* আলাদা পেজসমূহ */}
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/news" element={<NewsAndArticles />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<AllServices />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/countries" element={<AllCountries />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path="/all-institutes" element={<AllInstitutes />} />
        <Route path="/institute/:id" element={<InstituteDetails />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/all-news" element={<AllNews />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/photos" element={<AllPhotos />} />
        <Route path="/all-stories" element={<AllStoriesPage />} />
        <Route path="/consult" element={<Consultation />} />












        {/* Error 404 Page */}
        <Route path="*" element={
          <div className="h-screen flex flex-col items-center justify-center font-black">
            <h1 className="text-9xl text-slate-200">404</h1>
            <p className="text-2xl text-slate-600 mt-4">Oops! Page Not Found</p>
            <a href="/" className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl">Back to Home</a>
          </div>
        } />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;