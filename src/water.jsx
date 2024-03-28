// import React, { useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

// export function Water(props) {
//   const group = useRef();
//   const { nodes, materials, animations } = useGLTF("/water.gltf");
//   const { actions } = useAnimations(animations, group);
//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2.5, 0, 0]} scale={[0.1, 0.05, 0.05]}>
//         {Object.keys(nodes).map((nodeName) => {
//           const node = nodes[nodeName];
//           if (node.isMesh) {
//             return (
//               <mesh
//                 key={nodeName}
//                 geometry={node.geometry}
//                 material={node.material}
//               />
//             );
//           }
//           return null;
//         })}
//       </group>
//     </group>
//   );
//   console.log("Done");
// }

// useGLTF.preload("/water.gltf");

// import React, { useState, useRef } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// export function Water({ onToggleFlood }) {
//   const group = useRef();
//   const { nodes } = useGLTF("/water.gltf");
//   const [isFlooded, setIsFlooded] = useState(false);
//   const [currentScale, setCurrentScale] = useState([0.1, 0.05, 0.05]);
//   const targetScale = isFlooded ? [0.1, 0.05, 0.1] : [0.1, 0.05, 0.05];

//   // Function to toggle flooding
//   const toggleFlood = () => {
//     setIsFlooded((prev) => !prev);
//     onToggleFlood(!isFlooded);
//   };

//   // Interpolating the scale gradually
//   const updateScale = () => {
//     const scaleIncrement = 0.001;
//     const newScale = currentScale.map((value, index) => {
//       if (index == 1) {
//         const targetValue = targetScale[index];
//         if (value < targetValue) {
//           return Math.min(value + scaleIncrement, targetValue);
//         } else if (value > targetValue) {
//           return Math.max(value - scaleIncrement, targetValue);
//         }
//         return value;
//       }
//     });

//     setCurrentScale(newScale);
//   };

//   // Trigger updateScale on each frame
//   useFrame(() => {
//     updateScale();
//   }, [onToggleFlood]);

//   return (
//     <group ref={group} dispose={null} scale={currentScale}>
//       {Object.keys(nodes).map((nodeName) => {
//         const node = nodes[nodeName];
//         if (node.isMesh) {
//           return (
//             <mesh
//               key={nodeName}
//               geometry={node.geometry}
//               material={node.material}
//             />
//           );
//         }
//         return null;
//       })}
//       {/* No button here */}
//     </group>
//   );
// }

// useGLTF.preload("/water.gltf");

import React, { useState, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Water(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/water.gltf");
  const { actions } = useAnimations(animations, group);
  const [currentScale, setCurrentScale] = useState([0.2, 0.05, 0.05]);
  const targetScale = props.onToggleFlood
    ? [0.2, 0.05, 0.06]
    : [0.2, 0.05, 0.05];

  // Interpolating the scale gradually
  const updateScale = () => {
    const scaleIncrement = 0.001;
    const newScale = currentScale.map((value, index) => {
      const targetValue = targetScale[index];
      if (value < targetValue) {
        return Math.min(value + scaleIncrement, targetValue);
      } else if (value > targetValue) {
        return Math.max(value - scaleIncrement, targetValue);
      }
      return value;
    });

    setCurrentScale(newScale);
  };
  // Trigger updateScale on each frame
  useFrame(() => {
    updateScale();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2.5, 0, 0]} scale={currentScale}>
        {Object.keys(nodes).map((nodeName) => {
          const node = nodes[nodeName];
          if (node.isMesh) {
            return (
              <mesh
                key={nodeName}
                geometry={node.geometry}
                material={node.material}
              />
            );
          }
          return null;
        })}
      </group>
    </group>
  );
}

useGLTF.preload("/water.gltf");
