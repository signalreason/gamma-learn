import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ConceptCards from "@/components/ConceptCards";
import GammaSimulator from "@/components/GammaSimulator";
import GammaVisualization from "@/components/GammaVisualization";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ConceptCards />
      <GammaSimulator />
      <GammaVisualization />
      <InteractiveQuiz />
      <Footer />
    </div>
  );
};

export default Index;
