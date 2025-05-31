
import React from 'react';
import { ExpertiseArea, ExpertiseAreaId } from '../types';
import { EXPERTISE_AREAS } from '../constants.tsx';

interface SidebarProps {
  currentExpertise: ExpertiseAreaId;
  onExpertiseChange: (expertise: ExpertiseAreaId) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentExpertise, onExpertiseChange, isCollapsed, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <aside className={`fixed lg:static top-0 left-0 h-full bg-gray-800 text-gray-200 transition-all duration-300 ease-in-out z-40 flex flex-col shadow-lg
                         ${isCollapsed ? 'w-0 -translate-x-full lg:w-16' : 'w-64 lg:w-64'} `}>
        <div className={`flex items-center p-4 border-b border-gray-700 ${isCollapsed && 'lg:justify-center'}`}>
          {!isCollapsed && <h1 className="text-xl font-semibold text-sky-400">DevAI Pro</h1>}
        </div>

        <nav className="flex-grow p-2 space-y-1 overflow-y-auto">
          {EXPERTISE_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() => onExpertiseChange(area.id)}
              title={area.name}
              className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors
                          ${currentExpertise === area.id ? 'bg-sky-600 text-white' : 'text-gray-300'}
                          ${isCollapsed && 'lg:justify-center'}`}
            >
              {React.cloneElement(area.icon, { className: `w-5 h-5 ${!isCollapsed ? 'mr-3' : ''}` })}
              {!isCollapsed && <span className="ml-0">{area.name}</span>} 
              {isCollapsed && <span className="sr-only">{area.name}</span>}
            </button>
          ))}
        </nav>
        
        <div className={`p-4 border-t border-gray-700 ${isCollapsed && 'lg:hidden'}`}>
          {!isCollapsed && (
            <p className="text-xs text-gray-500">
              Select an expertise to tailor the AI's responses.
            </p>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;