import React from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function Configuration() {
  return(
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
    
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
    
      <color args={[0, 0, 0]} attach="background" />
    </>
  );
}