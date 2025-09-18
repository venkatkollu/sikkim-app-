import React from 'react';
import { Map, LayoutDashboard, Box, User, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'map', icon: Map, label: 'Map' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'viewer', icon: Box, label: '3D Viewer' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'notifications', icon: Bell, label: 'Alerts' }
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="bg-white border-t border-stone-200 px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[64px]"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-amber-100 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              <div className="relative z-10">
                <Icon 
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? 'text-amber-600' : 'text-stone-400'
                  }`} 
                />
              </div>
              
              <span 
                className={`text-xs transition-colors duration-200 relative z-10 ${
                  isActive ? 'text-amber-600 font-medium' : 'text-stone-400'
                }`}
              >
                {item.label}
              </span>
              
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 w-1 h-1 bg-amber-600 rounded-full"
                  initial={{ scale: 0, x: '-50%' }}
                  animate={{ scale: 1, x: '-50%' }}
                  transition={{ delay: 0.1 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}