import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { Ground } from "./Ground";
import { Lights } from "./Lights"
import { Configuration } from "./Configuration"

import "./style.css";

function Entry() {
  return (
    <>
      <Configuration />
      <Lights />
      <Ground />
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Entry />
      </Canvas>
    </Suspense>
  );
}

export default App;