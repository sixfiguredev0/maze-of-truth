import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MapRenderer from './MapRenderer';
import Player from './Player';
import { useGameStore } from '../store/useGameStore';

const GameCanvas: React.FC = () => {
  const { currentLevel, currentGrid } = useGameStore();

  // Get theme for current level
  const getThemeForLevel = (level: number) => {
    switch (level) {
      case 1:
        return {
          backgroundColor: '#f0f0f0',
          lighting: {
            ambient: 0.4,
            directional: 0.8,
            directionalColor: '#ffffff'
          }
        };
      case 2:
        return {
          backgroundColor: '#000000',
          lighting: {
            ambient: 0.2,
            directional: 0.6,
            directionalColor: '#00ff00'
          }
        };
      case 3:
        return {
          backgroundColor: '#e8f0ff',
          lighting: {
            ambient: 0.3,
            directional: 0.7,
            directionalColor: '#4a90e2'
          }
        };
      default:
        return {
          backgroundColor: '#f0f0f0',
          lighting: {
            ambient: 0.4,
            directional: 0.8,
            directionalColor: '#ffffff'
          }
        };
    }
  };

  const theme = getThemeForLevel(currentLevel);

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [15, 15, 15],
          zoom: 40,
          fov: 50
        }}
        style={{ background: theme.backgroundColor }}
      >
        {/* Lighting */}
        <ambientLight intensity={theme.lighting.ambient} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={theme.lighting.directional}
          color={theme.lighting.directionalColor}
        />
        
        {/* Camera Controls - Disable zoom to keep orthographic view */}
        <OrbitControls
          enableZoom={false}
          enablePan={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* Game Objects */}
        <MapRenderer grid={currentGrid} theme={currentLevel === 1 ? 'newsroom' : currentLevel === 2 ? 'server' : 'ailab'} />
        <Player />
        
        {/* Grid helper for development */}
        {/* <gridHelper args={[10, 10, '#666666', '#666666']} /> */}
      </Canvas>
    </div>
  );
};

export default GameCanvas;