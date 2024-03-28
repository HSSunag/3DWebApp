// import React, { useState,useEffect,useRef } from 'react'
// import { useGLTF, useAnimations } from '@react-three/drei'

// export function Model(props) {
//   const group = useRef()
//   const { nodes, materials,animations } = useGLTF('/scene.gltf')
//   const { actions } = useAnimations(animations, group)
//   console.log(actions)
//   return (
//     <group {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
        // <mesh geometry={nodes['material-2117080872'].geometry} material={materials.Site_PAVING_SQUARES} />
        // <mesh geometry={nodes['material-2117125629'].geometry} material={materials.metal_panel_1} />
        // <mesh geometry={nodes['material-2117250470'].geometry} material={materials.METAL_PANEL_2} />
        // <mesh geometry={nodes['material-2117572809'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117572809_1'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117572809_2'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117572809_3'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117572809_4'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117572809_5'].geometry} material={materials.Metal_Aluminum} />
        // <mesh geometry={nodes['material-2117258713'].geometry} material={materials.SPANDREL_1} />
        // <mesh geometry={nodes['material-2117136432'].geometry} material={materials.SPANDREL_2} />
        // <mesh geometry={nodes['material-2117573319'].geometry} material={materials.GLASS_1} />
        // <mesh geometry={nodes['material-2117573319_1'].geometry} material={materials.GLASS_1} />
        // <mesh geometry={nodes['material-2117573319_2'].geometry} material={materials.GLASS_1} />
        // <mesh geometry={nodes['material-2117573432'].geometry} material={materials.Site_Grass} />
        // <mesh geometry={nodes['material-2117573431'].geometry} material={materials.Site} />
        // <mesh geometry={nodes['material-2117463123'].geometry} material={materials.CONCRETE_CIP} />
//       </group>
//     </group>
    
//   )
// }

// useGLTF.preload('/scene.gltf')

// import React, { useState, useEffect, useRef } from 'react';
// import { useGLTF, useAnimations } from '@react-three/drei';
// import { useFrame } from '@react-three/fiber';

// export function Model({ zoom = 1, rotationSpeed = 0.005, ...props }) {
//   const group = useRef();
//   const [currentZoom, setCurrentZoom] = useState(zoom); // Define state for zoom
//   const { nodes, materials, animations } = useGLTF('/scene.gltf');
//   const { actions } = useAnimations(animations, group);

//   useEffect(() => {
//     setCurrentZoom(zoom);
//   }, [zoom]);

//   useEffect(() => {
//     console.log('Zoom changed:', currentZoom);
//     group.current.scale.set(currentZoom, currentZoom, currentZoom);
//   }, [currentZoom]);

//   useFrame(() => {
//     group.current.rotation.y += rotationSpeed; // Rotate the model around its y-axis
//   });

//   return (
//     <group ref={group} {...props} dispose={null}>
//       <group rotation={[-Math.PI / 2, 0, 0]}>
//       <mesh geometry={nodes['material-2117080872'].geometry} material={materials.Site_PAVING_SQUARES} />
//         <mesh geometry={nodes['material-2117125629'].geometry} material={materials.metal_panel_1} />
//         <mesh geometry={nodes['material-2117250470'].geometry} material={materials.METAL_PANEL_2} />
//         <mesh geometry={nodes['material-2117572809'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117572809_1'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117572809_2'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117572809_3'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117572809_4'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117572809_5'].geometry} material={materials.Metal_Aluminum} />
//         <mesh geometry={nodes['material-2117258713'].geometry} material={materials.SPANDREL_1} />
//         <mesh geometry={nodes['material-2117136432'].geometry} material={materials.SPANDREL_2} />
//         <mesh geometry={nodes['material-2117573319'].geometry} material={materials.GLASS_1} />
//         <mesh geometry={nodes['material-2117573319_1'].geometry} material={materials.GLASS_1} />
//         <mesh geometry={nodes['material-2117573319_2'].geometry} material={materials.GLASS_1} />
//         <mesh geometry={nodes['material-2117573432'].geometry} material={materials.Site_Grass} />
//         <mesh geometry={nodes['material-2117573431'].geometry} material={materials.Site} />
//         <mesh geometry={nodes['material-2117463123'].geometry} material={materials.CONCRETE_CIP} />
//       </group>
//     </group>
//   );
// }

import React, { useState, useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Model({ zoom = 1, rotationSpeed = 0.005, isHeatmapVisible, heatmapData, heatmapMaterial, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/scene.gltf');
  const { actions } = useAnimations(animations, group);
  const [originalMaterials, setOriginalMaterials] = useState({});
  const [heatMapVisible, setHeatMapVisible] = useState(false);

  useEffect(() => {
    const originalMaterialsObj = {};
    Object.values(materials).forEach(material => {
      originalMaterialsObj[material.name] = material;
      console.log(material)
    });
    setOriginalMaterials(originalMaterialsObj);
  },[]);

  useEffect(() => {
    group.current.scale.set(zoom, zoom, zoom);

    // Store original materials by name when component mounts
    // const originalMaterialsObj = {};
    // Object.values(materials).forEach(material => {
    //   originalMaterialsObj[material.name] = material;
    // });
    // setOriginalMaterials(originalMaterialsObj);
  }, [zoom, materials,isHeatmapVisible]);

  useEffect(() => {
    console.log('Heatmap visibility changed:', isHeatmapVisible);
    if (isHeatmapVisible) {
      applyHeatmapMaterial();
    } else {
      restoreOriginalMaterial();
    }
  }, [isHeatmapVisible, heatmapMaterial, originalMaterials]);

  useFrame(() => {
    group.current.rotation.y += rotationSpeed; // Rotate the model around its y-axis
  });

  const applyHeatmapMaterial = () => {
    // Apply heatmap material to each mesh
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        heatmapMaterial.name = node.material.name
        node.material = heatmapMaterial.clone();
        // node.material.color.setHex(0xff0000);
        // node.material.transparent = true;
        // node.material.opacity = 0.5
      }
    });
    console.log("+++++++++++++++++++++++++++++++++++")
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        console.log(node.material)
        };})
    console.log("+++++++++++++++++++++++++++++++++++")
    setHeatMapVisible(true);
  };


  const restoreOriginalMaterial = () => {
    // Restore original material to each mesh
    console.log("----------------------------------------------------------");
    Object.values(nodes).forEach((node) => {
      if (node.isMesh) {
        const originalMaterial = originalMaterials[node.material.name];
        if (originalMaterial) {
          node.material = originalMaterial;
          console.log(node.material); // Make sure to clone the original material before assigning
        }
      }
    });
    setHeatMapVisible(false);
    console.log("========================================================");
  };
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        {Object.keys(nodes).map((nodeName) => {
          const node = nodes[nodeName];
          if (node.isMesh) {
            return <mesh key={nodeName} geometry={node.geometry} material={node.material} />;
          }
          return null;
        })}
      </group>
    </group>
  );
}
