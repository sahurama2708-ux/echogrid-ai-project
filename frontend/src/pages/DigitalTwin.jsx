import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import api from "../api";

export default function DigitalTwin() {
  const mountRef = useRef(null);
  const [twinData, setTwinData] = useState({
    system_status: "Synchronized",
    mesh_nodes: 1420,
    active_sensors: 48,
    node_01_stress: "45 MPa",
    node_02_stress: "112 MPa (Warning)",
    node_03_stress: "52 MPa",
    temperature: "32.4°C",
    vibration_frequency: "1.46 Hz"
  });

  useEffect(() => {
    // 1. Three.js 3D Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate-900 match

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // 3. 3D Structure Box (Building Twin)
    const geometry = new THREE.BoxGeometry(2, 3, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x3b82f6, // Futuristic Blue
      roughness: 0.3,
      metalness: 0.8
    });
    const buildingMesh = new THREE.Mesh(geometry, material);
    scene.add(buildingMesh);

    // Wireframe Grid Overlay
    const wireGeo = new THREE.BoxGeometry(2.05, 3.05, 1.05);
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
    const wireBox = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireBox);

    // 4. Animation Loop (Rotation)
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      buildingMesh.rotation.y += 0.005;
      wireBox.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="p-6 text-white bg-slate-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Live 3D Structural Digital Twin & Telemetry</h1>
      
      {/* Top Status Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-gray-400 text-sm">System Status</p>
          <p className="text-xl font-bold text-green-400">{twinData.system_status}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-gray-400 text-sm">Mesh Nodes</p>
          <p className="text-xl font-bold">{twinData.mesh_nodes} Active</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
          <p className="text-gray-400 text-sm">Active Sensors</p>
          <p className="text-xl font-bold text-blue-400">{twinData.active_sensors}</p>
        </div>
      </div>

      {/* Main Grid: 3D Box on Left/Top, Stress Grid & Telemetry on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D Canvas View (Takes 2 Columns) */}
        <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-700 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-slate-300">3D Structural Mesh Representation</h2>
          <div 
            ref={mountRef} 
            className="w-full h-[380px] rounded-lg overflow-hidden shadow-inner"
          />
        </div>

        {/* Telemetry & Stress Panels (Takes 1 Column) */}
        <div className="space-y-4">
          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <h2 className="text-lg font-semibold mb-3 text-slate-300">Structural Stress Grid</h2>
            <div className="space-y-3">
              <div className="bg-slate-700 p-3 rounded-lg flex justify-between items-center">
                <span>Node-01</span>
                <span className="text-green-400 font-bold">{twinData.node_01_stress}</span>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg flex justify-between items-center">
                <span>Node-02 (Crack Zone)</span>
                <span className="text-red-400 font-bold">{twinData.node_02_stress}</span>
              </div>
              <div className="bg-slate-700 p-3 rounded-lg flex justify-between items-center">
                <span>Node-03</span>
                <span className="text-green-400 font-bold">{twinData.node_03_stress}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-gray-400 text-xs mb-1">Temperature</p>
              <p className="text-lg font-bold text-yellow-400">{twinData.temperature}</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-gray-400 text-xs mb-1">Vibration Frequency</p>
              <p className="text-lg font-bold text-blue-400">{twinData.vibration_frequency}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}