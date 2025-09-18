import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapScreen } from './components/map-screen';
import { DashboardScreen } from './components/dashboard-screen';
import { Viewer3DScreen } from './components/viewer-3d-screen';
import { ProfileScreen } from './components/profile-screen';
import { NotificationsScreen } from './components/notifications-screen';
import { BottomNavigation } from './components/bottom-navigation';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedMonastery, setSelectedMonastery] = useState(null);

  const handleMonasterySelect = (monastery: any) => {
    setSelectedMonastery(monastery);
    setActiveTab('dashboard');
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'map':
        return <MapScreen onMonasterySelect={handleMonasterySelect} />;
      case 'dashboard':
        return <DashboardScreen monastery={selectedMonastery} />;
      case 'viewer':
        return <Viewer3DScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      default:
        return <MapScreen onMonasterySelect={handleMonasterySelect} />;
    }
  };

  return (
    <div className="h-screen bg-stone-50 flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Status Bar Simulation */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
          <span className="ml-2">Sikkim Sacred</span>
        </div>
        <div className="flex items-center gap-1">
          <span>9:41</span>
          <div className="w-6 h-3 border border-white/50 rounded-sm">
            <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.3
            }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Home Indicator for iPhone */}
      <div className="h-1 bg-transparent">
        <div className="w-32 h-1 bg-black/20 rounded-full mx-auto"></div>
      </div>
    </div>
  );
}