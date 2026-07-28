import { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { SideNav } from './components/SideNav';
import { BottomNav } from './components/BottomNav';
import { ShaderBackground } from './components/ShaderBackground';
import { LandingHeroView } from './components/LandingHeroView';
import { HousingSchemesView } from './components/HousingSchemesView';
import { SelectPlotView } from './components/SelectPlotView';
import { FootprintSelectionView } from './components/FootprintSelectionView';
import { InteriorCustomizationView } from './components/InteriorCustomizationView';
import { InvestmentSummaryView } from './components/InvestmentSummaryView';
import { DemoModal } from './components/DemoModal';
import { AiRecommendationsModal } from './components/AiRecommendationsModal';
import { PLOTS, HOUSE_FOOTPRINTS, MATERIAL_OPTIONS } from './data/mockData';
import { Plot, HouseFootprint, MaterialOption, HousingScheme } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedScheme, setSelectedScheme] = useState<HousingScheme | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(PLOTS[2]); // P-103
  const [selectedFootprint, setSelectedFootprint] = useState<HouseFootprint | null>(HOUSE_FOOTPRINTS[2]); // 8 Marla
  const [selectedMaterials, setSelectedMaterials] = useState<MaterialOption[]>([
    MATERIAL_OPTIONS[0], // Venetian Plaster
    MATERIAL_OPTIONS[1], // Walnut Panel
  ]);

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const totalCustomizationCost = selectedMaterials.reduce((acc, m) => acc + m.priceDelta, 0);

  const handleNextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    switch (currentTab) {
      case 'landing':
        setCurrentTab('schemes');
        break;
      case 'schemes':
        setCurrentTab('plot');
        break;
      case 'plot':
        setCurrentTab('footprint');
        break;
      case 'footprint':
        setCurrentTab('customization');
        break;
      case 'customization':
        setCurrentTab('investment');
        break;
      case 'investment':
        setCurrentTab('landing');
        break;
      default:
        setCurrentTab('landing');
    }
  };

  const handleToggleMaterial = (mat: MaterialOption) => {
    setSelectedMaterials((prev) => {
      const exists = prev.some((m) => m.id === mat.id);
      if (exists) {
        return prev.filter((m) => m.id !== mat.id);
      } else {
        return [...prev, mat];
      }
    });
  };

  const handleSelectPlotById = (plotId: string) => {
    const found = PLOTS.find((p) => p.id === plotId);
    if (found) {
      setSelectedPlot(found);
      setCurrentTab('plot');
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans relative selection:bg-primary/30">
      {/* Interactive WebGL Shader Background */}
      <ShaderBackground />

      {/* Top Header Navigation */}
      <HeaderNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleSideNav={() => setIsSideNavOpen(!isSideNavOpen)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Side Progress & Navigation Drawer */}
      <SideNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Screen Router Views */}
      <main className="md:pl-20 transition-all duration-300">
        {currentTab === 'landing' && (
          <LandingHeroView
            onStartExploring={() => {
              setCurrentTab('schemes');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onWatchDemo={() => setIsDemoOpen(true)}
            onPlotSelect={(plotId) => {
              handleSelectPlotById(plotId);
            }}
          />
        )}

        {currentTab === 'schemes' && (
          <HousingSchemesView
            onSelectScheme={(scheme) => {
              setSelectedScheme(scheme);
              setCurrentTab('plot');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'plot' && (
          <SelectPlotView
            selectedPlot={selectedPlot}
            onSelectPlot={(plot) => setSelectedPlot(plot)}
            onContinueToSize={() => {
              setCurrentTab('footprint');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'footprint' && (
          <FootprintSelectionView
            selectedFootprint={selectedFootprint}
            onSelectFootprint={(footprint) => setSelectedFootprint(footprint)}
            onContinueToCustomizer={() => {
              setCurrentTab('customization');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'customization' && (
          <InteriorCustomizationView
            selectedMaterials={selectedMaterials}
            onToggleMaterial={handleToggleMaterial}
            onContinueToInvestment={() => {
              setCurrentTab('investment');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            totalCustomizationCost={totalCustomizationCost}
          />
        )}

        {currentTab === 'investment' && (
          <InvestmentSummaryView
            selectedPlot={selectedPlot}
            selectedFootprint={selectedFootprint}
            selectedMaterials={selectedMaterials}
            totalCustomizationCost={totalCustomizationCost}
          />
        )}
      </main>

      {/* Bottom Floating Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNextStep={handleNextStep}
      />

      {/* Global Footer */}
      <footer className="w-full py-12 px-4 md:px-20 flex flex-col md:flex-row justify-between items-center opacity-70 bg-[#0e0e0e] border-t border-white/5 mt-20 text-xs font-mono text-on-surface-variant md:pl-28">
        <p>© 2024 HomeVista 3D Luxury Real Estate. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="mailto:ar2701699@gmail.com" className="hover:text-primary transition-colors">
            ar2701699@gmail.com
          </a>
        </div>
      </footer>

      {/* Modals */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      <AiRecommendationsModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onSelectPlotById={handleSelectPlotById}
      />
    </div>
  );
}
