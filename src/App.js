// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Model } from "./Scene";
// import { OrbitControls } from "@react-three/drei";

// function App() {
//   return (
//     <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
//       <Canvas className="canvas">
//         <OrbitControls />
//         <ambientLight intensity={1} />
//         <directionalLight intensity={1} />
//         <Suspense fallback={null}>
//           {/* Adjust position to center */}
//           <Model position={[0, 0, 0]} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
// export default App;

// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import { Model } from "./Scene";
// import { OrbitControls } from "@react-three/drei";

// function App() {
//   const [zoom, setZoom] = useState(0.005); // Initial zoom level

//   const handleZoomIn = () => {
//     const newZoom = zoom + 0.005;
//     console.log(newZoom);
//     setZoom(newZoom);
//   };

//   const handleZoomOut = () => {
//     const newZoom = Math.max(0.005, zoom - 0.005);
//     console.log(newZoom);
//     setZoom(newZoom);
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
//       <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
//         <button onClick={handleZoomIn}>+</button>
//         <button onClick={handleZoomOut}>-</button>
//       </div>
//       <Canvas className="canvas">
//         <OrbitControls />
//         <ambientLight intensity={1} />
//         <directionalLight intensity={1} />
//         <Suspense fallback={null}>
//           {/* Adjust position to center */}
//           <Model position={[0, 0, 0]} zoom={zoom} />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }
// export default App;

import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Scene";
import { City } from "./city";
import { Ocean } from "./ocean";
import { Water } from "./water";
import ThreeJsComponent from "./ocean";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function ToggleButton({ onClick, label, isHeatmapVisible }) {
  return (
    <button onClick={onClick}>
      {isHeatmapVisible ? "Hide Heatmap" : "Show Heatmap"}
    </button>
  );
}

function App() {
  const [zoom, setZoom] = useState(0.005); // Initial zoom level
  const [isFlooded, setIsFlooded] = useState(false);
  const [isHeatmapVisible, setHeatmapVisible] = useState(false);
  const [heatmapMaterial, setHeatmapMaterial] = useState(
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.5,
    })
  );
  const handleZoomIn = () => {
    const newZoom = zoom + 0.001;
    console.log(newZoom);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(0.001, zoom - 0.001);
    console.log(newZoom);
    setZoom(newZoom);
  };

  const toggleHeatmap = () => {
    setHeatmapVisible((prev) => !prev);
  };

  const toggleFlood = (value) => {
    setIsFlooded(value);
  };

  return (
    // <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
    //   <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
    //     <button class="glass-button" onClick={handleZoomIn}>
    //       +
    //     </button>
    //     <button class="glass-button" onClick={handleZoomOut}>
    //       -
    //     </button>
    //     <ToggleButton
    //       onClick={toggleHeatmap}
    //       label={isHeatmapVisible ? "Hide Heatmap" : "Show Heatmap"}
    //       isHeatmapVisible={isHeatmapVisible}
    //     />
    //     <button class="glass-button" onClick={() => toggleFlood(!isFlooded)}>
    //       {isFlooded ? "Restore" : "Flood"}
    //     </button>
    //   </div>
    //   <Canvas className="canvas" style={{ backgroundColor: "lightskyblue" }}>
    //     <Water onToggleFlood={isFlooded} />
    //     <OrbitControls />
    //     <ambientLight intensity={1} />
    //     <directionalLight intensity={1} />
    //     <Suspense fallback={null}>
    //       {/* Adjust position to center */}
    //       {/* <Model
    //         position={[0, 0, 0]}
    //         zoom={zoom}
    //         isHeatmapVisible={isHeatmapVisible}
    //         heatmapMaterial={heatmapMaterial}
    //       /> */}
    //       {/* <Ocean /> */}
    //       <City
    //         position={[-1.5, 0.48, 2.5]}
    //         zoom={zoom}
    //         isHeatmapVisible={isHeatmapVisible}
    //         heatmapMaterial={heatmapMaterial}
    //       />
    //     </Suspense>
    //   </Canvas>
    // </div>
    <ThreeJsComponent />
  );
}

export default App;
