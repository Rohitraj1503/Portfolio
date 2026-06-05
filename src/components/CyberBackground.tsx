"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 40;
    camera.position.y = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Get primary theme color
    const getThemeColor = (): THREE.Color => {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();
      return new THREE.Color(hex || "#FF6B00");
    };

    let activeColor = getThemeColor();

    // 1. Energy Wave Points Grid
    const waveCountX = 45;
    const waveCountY = 45;
    const spacing = 1.8;
    const wavePointsCount = waveCountX * waveCountY;
    const positions = new Float32Array(wavePointsCount * 3);
    const colors = new Float32Array(wavePointsCount * 3);

    let idx = 0;
    for (let x = 0; x < waveCountX; x++) {
      for (let y = 0; y < waveCountY; y++) {
        // Center the wave
        positions[idx * 3] = (x - waveCountX / 2) * spacing;
        positions[idx * 3 + 1] = 0; // Wave y height (calculated in loop)
        positions[idx * 3 + 2] = (y - waveCountY / 2) * spacing;

        // Assign gradient colors
        colors[idx * 3] = activeColor.r;
        colors[idx * 3 + 1] = activeColor.g;
        colors[idx * 3 + 2] = activeColor.b;
        idx++;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    waveGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle texture (using standard Canvas round dot texture)
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 0.4)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const waveMaterial = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const wavePoints = new THREE.Points(waveGeometry, waveMaterial);
    scene.add(wavePoints);

    // 2. Floating Star Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 120;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 80 + 10;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 120;

      starColors[i * 3] = activeColor.r * 0.8;
      starColors[i * 3 + 1] = activeColor.g * 0.8;
      starColors[i * 3 + 2] = activeColor.b * 0.8;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.45,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeo, starMaterial);
    scene.add(starPoints);

    // 3. Floating 3D wireframe geometries
    const floaters: THREE.Mesh[] = [];
    const floaterMaterials: THREE.MeshBasicMaterial[] = [];

    const geometries = [
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.OctahedronGeometry(1.5, 0),
      new THREE.TorusGeometry(2, 0.4, 8, 24),
    ];

    geometries.forEach((geom, idx) => {
      const mat = new THREE.MeshBasicMaterial({
        color: activeColor,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geom, mat);
      
      // Random coordinates in scene
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 15 + 2,
        (Math.random() - 0.5) * 20 - 10
      );
      
      scene.add(mesh);
      floaters.push(mesh);
      floaterMaterials.push(mat);
    });

    // 4. Background Lightning Point Light
    const lightningLight = new THREE.PointLight(activeColor, 0, 100);
    lightningLight.position.set(0, 30, 0);
    scene.add(lightningLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);

    // Animation variables
    let clock = new THREE.Clock();
    let lightningTimer = 0;
    let nextLightningTime = 4 + Math.random() * 6;

    // Loop
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Check for theme updates (dynamic check for God Mode changes)
      const freshColor = getThemeColor();
      if (freshColor.getHex() !== activeColor.getHex()) {
        activeColor.copy(freshColor);
        // Update lights and floater materials
        lightningLight.color.copy(activeColor);
        floaterMaterials.forEach(m => m.color.copy(activeColor));

        // Update star points
        const colorsAttr = starGeo.getAttribute("color") as THREE.BufferAttribute;
        for (let i = 0; i < starCount; i++) {
          colorsAttr.setXYZ(i, activeColor.r * 0.8, activeColor.g * 0.8, activeColor.b * 0.8);
        }
        colorsAttr.needsUpdate = true;
      }

      // Update wave points position
      const posAttr = waveGeometry.getAttribute("position") as THREE.BufferAttribute;
      const colorsAttr = waveGeometry.getAttribute("color") as THREE.BufferAttribute;
      
      let index = 0;
      for (let x = 0; x < waveCountX; x++) {
        for (let y = 0; y < waveCountY; y++) {
          // Complex energy wave heights using sine & cosine combination
          const xPhase = x * 0.12 + elapsed * 0.9;
          const yPhase = y * 0.12 + elapsed * 0.7;
          const heightVal = Math.sin(xPhase) * Math.cos(yPhase) * 2.8 + Math.sin((x + y) * 0.05 + elapsed * 1.5) * 1.2;
          
          posAttr.setY(index, heightVal - 10); // Offset downwards

          // Fade colors near the edges or based on height
          const heightRatio = (heightVal + 4) / 8;
          colorsAttr.setXYZ(
            index,
            activeColor.r * (0.4 + heightRatio * 0.6),
            activeColor.g * (0.4 + heightRatio * 0.6),
            activeColor.b * (0.4 + heightRatio * 0.6)
          );
          
          index++;
        }
      }
      posAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;

      // Slowly rotate wave points slightly
      wavePoints.rotation.y = elapsed * 0.02;

      // Slow drift stars
      starPoints.rotation.y = elapsed * 0.01;
      starPoints.rotation.x = Math.sin(elapsed * 0.05) * 0.05;

      // Animate 3D wireframe floaters
      floaters.forEach((mesh, i) => {
        mesh.rotation.x += 0.005 * (i + 1);
        mesh.rotation.y += 0.003 * (i + 1);
        // Floating up and down
        mesh.position.y += Math.sin(elapsed + i * 2) * 0.006;
      });

      // Handle lightning flashes
      lightningTimer += 0.016; // Approx delta
      if (lightningTimer >= nextLightningTime) {
        // Flash trigger
        lightningLight.intensity = 15 + Math.random() * 25;
        if (scene.fog) {
          scene.fog.color.setHex(activeColor.getHex());
        }
        
        setTimeout(() => {
          lightningLight.intensity = 0;
          if (scene.fog) {
            scene.fog.color.setHex(0x050505);
          }
        }, 80 + Math.random() * 100);

        // Double flash
        if (Math.random() > 0.5) {
          setTimeout(() => {
            lightningLight.intensity = 8 + Math.random() * 15;
            setTimeout(() => {
              lightningLight.intensity = 0;
            }, 50);
          }, 200);
        }

        lightningTimer = 0;
        nextLightningTime = 6 + Math.random() * 8; // Schedule next
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      starGeo.dispose();
      starMaterial.dispose();
      geometries.forEach(g => g.dispose());
      floaterMaterials.forEach(m => m.dispose());
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#050505]"
    />
  );
}
