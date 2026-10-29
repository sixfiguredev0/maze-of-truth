import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import { useGameStore } from '../store/useGameStore';
import * as THREE from 'three';
import { levels } from '../data/levels';

const Player: React.FC = () => {
  const { 
    playerPosition, 
    movePlayer, 
    currentGrid, 
    gameState, 
    setGameState,
    solvedQuestions,
    currentLevel 
  } = useGameStore();
  const meshRef = React.useRef<THREE.Mesh>(null);

  // Movement speed
  const moveSpeed = 3; // units per second
  const keysPressed = React.useRef<{ [key: string]: boolean }>({});

  // Event listeners for keyboard input
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const nearbyQuestion = React.useMemo(() => {
    if (!playerPosition) return null;
    return levels[currentLevel].questions.find((question) => {
      if (solvedQuestions.has(question.id)) return false;
      const distance = Math.hypot(
        playerPosition.x - question.position.x,
        playerPosition.z - question.position.z
      );
      return distance < 1.25;
    }) ?? null;
  }, [currentLevel, playerPosition, solvedQuestions]);
  const canExit = playerPosition
    ? Math.hypot(playerPosition.x - 8, playerPosition.z - 8) < 1.25 &&
      levels[currentLevel].questions.every((question) => solvedQuestions.has(question.id))
    : false;

  React.useEffect(() => {
    const handleInteraction = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || gameState !== 'playing') return;
      if (nearbyQuestion) {
        setGameState('quiz');
      } else if (canExit) {
        setGameState('won');
      }
    };

    window.addEventListener('keydown', handleInteraction);
    return () => window.removeEventListener('keydown', handleInteraction);
  }, [canExit, gameState, nearbyQuestion, setGameState]);

  useFrame((_, delta) => {
    if (!playerPosition || gameState !== 'playing') return;

    // Calculate velocity based on pressed keys
    let newVelocityX = 0;
    let newVelocityZ = 0;

    if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) {
      newVelocityZ -= 1;
    }
    if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) {
      newVelocityZ += 1;
    }
    if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) {
      newVelocityX -= 1;
    }
    if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) {
      newVelocityX += 1;
    }

    // Normalize diagonal movement
    if (newVelocityX !== 0 && newVelocityZ !== 0) {
      const length = Math.sqrt(newVelocityX * newVelocityX + newVelocityZ * newVelocityZ);
      newVelocityX /= length;
      newVelocityZ /= length;
    }

    // Calculate next position
    const nextX = playerPosition.x + newVelocityX * moveSpeed * delta;
    const nextZ = playerPosition.z + newVelocityZ * moveSpeed * delta;

    // Discrete collision detection
    let finalX = playerPosition.x;
    let finalZ = playerPosition.z;

    // Try X axis movement
    const gridX = Math.round(nextX);
    const currentZ = Math.round(playerPosition.z);
    
    if (gridX >= 0 && gridX < currentGrid.length && 
        currentZ >= 0 && currentZ < currentGrid[gridX].length) {
      const gridValue = currentGrid[gridX][currentZ];
      if (gridValue !== 1) { // Not a wall
        finalX = nextX;
      }
    }

    // Try Z axis movement
    const currentX = Math.round(playerPosition.x);
    const gridZ = Math.round(nextZ);
    
    if (currentX >= 0 && currentX < currentGrid.length && 
        gridZ >= 0 && gridZ < currentGrid[currentX].length) {
      const gridValue = currentGrid[currentX][gridZ];
      if (gridValue !== 1) { // Not a wall
        finalZ = nextZ;
      }
    }

    // Update position if changed
    if (Math.abs(finalX - playerPosition.x) > 0.01 || Math.abs(finalZ - playerPosition.z) > 0.01) {
      movePlayer({ x: finalX, z: finalZ });
    }

    // Update mesh position for smooth rendering
    if (meshRef.current) {
      meshRef.current.position.x = finalX;
      meshRef.current.position.z = finalZ;
    }
  });

  if (!playerPosition) return null;

  return (
    <>
      <Billboard follow={false} lockX={false} lockY={false} lockZ={false}>
        <mesh ref={meshRef} position={[playerPosition.x, 0.5, playerPosition.z]}>
        <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
        <meshLambertMaterial color="#4488ff" />
        </mesh>
        <mesh position={[0, 1.05, 0]}>
          <ringGeometry args={[0.18, 0.24, 16]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      </Billboard>
    </>
  );
};

export default Player;