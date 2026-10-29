import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import * as THREE from 'three';

interface MapRendererProps {
  grid: number[][];
  theme: 'newsroom' | 'server' | 'ailab';
  questions: { id: string; position: { x: number; z: number } }[];
}

const MapRenderer: React.FC<MapRendererProps> = ({ grid, theme, questions }) => {
  // Theme colors and properties
  const getThemeColors = () => {
    switch (theme) {
      case 'newsroom':
        return {
          floorColor: '#f0f0f0',
          wallColor: '#888888',
          lightColor: '#ffffff',
          ambientIntensity: 0.4,
          directionalIntensity: 0.8
        };
      case 'server':
        return {
          floorColor: '#000000',
          wallColor: '#00ff00',
          lightColor: '#00ff00',
          ambientIntensity: 0.2,
          directionalIntensity: 0.6
        };
      case 'ailab':
        return {
          floorColor: '#e8f0ff',
          wallColor: '#4a90e2',
          lightColor: '#4a90e2',
          ambientIntensity: 0.3,
          directionalIntensity: 0.7
        };
      default:
        return {
          floorColor: '#f0f0f0',
          wallColor: '#888888',
          lightColor: '#ffffff',
          ambientIntensity: 0.4,
          directionalIntensity: 0.8
        };
    }
  };

  const themeColors = getThemeColors();

  const renderCell = (cellValue: number, x: number, z: number) => {
    const worldX = x;
    const worldZ = z;

    switch (cellValue) {
      case 1: // Wall
        return (
          <Box
            key={`wall-${x}-${z}`}
            position={[worldX, 1, worldZ]}
            args={[0.8, 2, 0.8]}
          >
            <meshLambertMaterial color={themeColors.wallColor} />
          </Box>
        );
      
      case 2: // Player Start - render as a subtle indicator (will be hidden when player spawns)
        return (
          <Plane
            key={`start-${x}-${z}`}
            position={[worldX, 0.01, worldZ]}
            rotation={[-Math.PI / 2, 0, 0]}
            args={[0.6, 0.6]}
          >
            <meshLambertMaterial 
              color="#ffff00" 
              transparent 
              opacity={0.3}
            />
          </Plane>
        );
      
      case 4: // Exit Door
        return (
          <Box
            key={`exit-${x}-${z}`}
            position={[worldX, 1, worldZ]}
            args={[0.8, 2, 0.8]}
          >
            <meshLambertMaterial 
              color={cellValue === 4 ? "#ff4444" : themeColors.wallColor} 
            />
          </Box>
        );
      
      default: // Floor (0) and others
        return (
          <Plane
            key={`floor-${x}-${z}`}
            position={[worldX, 0, worldZ]}
            rotation={[-Math.PI / 2, 0, 0]}
            args={[0.8, 0.8]}
          >
            <meshLambertMaterial color={themeColors.floorColor} />
          </Plane>
        );
    }
  };

  return (
    <group>
      {grid.map((row, x) =>
        row.map((cellValue, z) => renderCell(cellValue, x, z))
      )}
      {questions.map((question) => (
        <QuestionNode
          key={question.id}
          position={[question.position.x, 1, question.position.z]}
        />
      ))}
    </group>
  );
};

// Question Node component with bobbing animation
const QuestionNode: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = React.useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshLambertMaterial 
          color="#ffff00" 
          emissive="#ffff00"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Glow effect */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 8]} />
        <meshLambertMaterial 
          color="#ffff00" 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

export default MapRenderer;