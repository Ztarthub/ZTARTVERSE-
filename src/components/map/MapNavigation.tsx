import { useState } from 'react';
import EarthView from './EarthView';
import RegionView from './RegionView';
import ZoneView from './ZoneView';
import type { Region, Zone } from '../../types/game';

type NavigationLevel = 'earth' | 'region' | 'zone';

interface NavigationState {
  level: NavigationLevel;
  selectedRegion: Region | null;
  selectedZone: Zone | null;
}

interface MapNavigationProps {
  onZoneEnter?: (zone: Zone) => void;
  className?: string;
}

export default function MapNavigation({ onZoneEnter, className = '' }: MapNavigationProps) {
  const [navState, setNavState] = useState<NavigationState>({
    level: 'earth',
    selectedRegion: null,
    selectedZone: null,
  });

  const handleRegionSelect = (region: Region) => {
    setNavState({
      level: 'region',
      selectedRegion: region,
      selectedZone: null,
    });
  };

  const handleZoneSelect = (zone: Zone) => {
    setNavState({
      level: 'zone',
      selectedRegion: navState.selectedRegion,
      selectedZone: zone,
    });
  };

  const handleBackToEarth = () => {
    setNavState({
      level: 'earth',
      selectedRegion: null,
      selectedZone: null,
    });
  };

  const handleBackToRegion = () => {
    setNavState({
      level: 'region',
      selectedRegion: navState.selectedRegion,
      selectedZone: null,
    });
  };

  const handleEnterZone = (zone: Zone) => {
    // This would typically navigate to the actual 3D zone experience
    if (onZoneEnter) {
      onZoneEnter(zone);
    } else {
      // Default behavior - could show a modal or navigate to zone experience
      console.log('Entering zone:', zone.name);
      alert(`🚀 Welcome to ${zone.name}!\n\nThis would normally load the 3D zone experience where you can:\n• Interact with other users\n• Visit businesses\n• Participate in events\n• Explore the virtual world`);
    }
  };

  // Breadcrumb component
  const Breadcrumb = () => (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <button
        onClick={handleBackToEarth}
        className={`px-3 py-1 rounded transition-colors ${
          navState.level === 'earth'
            ? 'bg-ztart-primary text-white'
            : 'text-ztart-light hover:text-white hover:bg-white/10'
        }`}
      >
        🌍 Earth
      </button>
      
      {navState.selectedRegion && (
        <>
          <span className="text-ztart-light opacity-50">&gt;</span>
          <button
            onClick={handleBackToRegion}
            className={`px-3 py-1 rounded transition-colors ${
              navState.level === 'region'
                ? 'bg-ztart-primary text-white'
                : 'text-ztart-light hover:text-white hover:bg-white/10'
            }`}
          >
            🗺️ {navState.selectedRegion.name}
          </button>
        </>
      )}
      
      {navState.selectedZone && (
        <>
          <span className="text-ztart-light opacity-50">&gt;</span>
          <span className="px-3 py-1 bg-ztart-primary text-white rounded">
            📍 {navState.selectedZone.name}
          </span>
        </>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen ${className}`}>
      {/* Show breadcrumb only when not on Earth level */}
      {(navState.level !== 'earth') && <Breadcrumb />}
      
      {/* Render appropriate view based on navigation level */}
      {navState.level === 'earth' && (
        <EarthView onRegionSelect={handleRegionSelect} />
      )}
      
      {navState.level === 'region' && navState.selectedRegion && (
        <RegionView
          region={navState.selectedRegion}
          onZoneSelect={handleZoneSelect}
          onBack={handleBackToEarth}
        />
      )}
      
      {navState.level === 'zone' && navState.selectedZone && (
        <ZoneView
          zone={navState.selectedZone}
          onBack={handleBackToRegion}
          onEnterZone={handleEnterZone}
        />
      )}
    </div>
  );
}