import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

function LockerModel() {
  const { scene } = useGLTF("/models/lockers.glb");
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.side = THREE.DoubleSide;
        child.material.metalness = 0.1;
        child.material.roughness = 0.5;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = -0.3 + Math.sin(t * 0.5) * 0.03;
      groupRef.current.rotation.x = Math.sin(t * 1) * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[9, 9, 2]}>
      <primitive object={scene} scale={0.5} />
    </group>
  );
}

export default function LockerScene() {
  return (
    <Canvas camera={{ position: [20, 15, 60], fov: 45 }}>
      <directionalLight position={[1, 10, -1]} intensity={1.2} />
      <directionalLight position={[-8, 1, 5]} intensity={0.5} color="#ff4fa3" />
      <directionalLight
        position={[-10, -4, 2]}
        intensity={0.6}
        color="#45d8f2"
      />
      <ambientLight intensity={0.03} />
      <LockerModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}

useGLTF.preload("/models/lockers.glb");
