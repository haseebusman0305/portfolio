'use client';


import React, { useRef, useEffect, useState } from 'react';
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import * as THREE from 'three';

function AboutSection() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(280, 280);

    const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x16f2b3, wireframe: true });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((y - centerY) / centerY) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          ABOUT ME
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            Who I am?
          </p>
          <p className="text-gray-200 text-sm lg:text-lg">
            {personalData.description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div 
            ref={cardRef}
            className="relative w-[280px] h-[280px] transition-all duration-200 ease-out"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1443] to-[#16f2b3] rounded-lg opacity-75 z-0"></div>
            <Image
              src={personalData.profile}
              width={280}
              height={280}
              alt="Haseeb Usman"
              className="rounded-lg transition-all duration-500 grayscale hover:grayscale-0 relative z-10"
            />
            <canvas 
              ref={canvasRef} 
              className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-[#1a1443] bg-opacity-75 p-4 rounded-lg z-30">
              <h3 className="text-white text-lg font-semibold">{personalData.name}</h3>
              <p className="text-[#16f2b3] text-sm">{personalData.designation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;