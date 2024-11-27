import HeroSection from "../../components/sections/HeroSection";
import PlatformOverview from "../../components/sections/PlatformOverview";
import MainFeatures from "../../components/sections/MainFeatures";
import Testimonials from "../../components/sections/Testimonials";
import ValueProposition from "../../components/sections/ValueProposition";
import FinalCTA from "../../components/sections/FinalCTA";

function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <PlatformOverview />
      <MainFeatures />
      <Testimonials />
      <ValueProposition />
      <FinalCTA />
    </div>
  );
}

export default LandingPage;
