import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Cikka3DLogoProps {
  className?: string;
  isLightBg?: boolean;
  interactive?: boolean;
}

// Helper to interpolate between two hex colors in RGB space
function lerpColor(colorA: THREE.Color, colorB: THREE.Color, t: number): THREE.Color {
  const result = new THREE.Color();
  result.r = THREE.MathUtils.lerp(colorA.r, colorB.r, t);
  result.g = THREE.MathUtils.lerp(colorA.g, colorB.g, t);
  result.b = THREE.MathUtils.lerp(colorA.b, colorB.b, t);
  return result;
}

function colorToHex(c: THREE.Color): string {
  return `#${c.getHexString()}`;
}

export function Cikka3DLogo({
  className = "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
  isLightBg = false,
  interactive = true,
}: Cikka3DLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLightRef = useRef(isLightBg);
  isLightRef.current = isLightBg;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 64;
    const height = container.clientHeight || 64;

    // 1. Scene & Transparent WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 750);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Lighting (Preserves rich material colors with soft bevel shading)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.35);
    dirLight.position.set(120, 220, 350);
    scene.add(dirLight);

    // 3. Dynamic 2D Canvas Gradient for the Front Face
    const gradCanvas = document.createElement("canvas");
    gradCanvas.width = 512;
    gradCanvas.height = 512;
    const gradCtx = gradCanvas.getContext("2d");

    // Color definitions for smooth transition:
    // Black BG: Purple & White/Lavender
    // White BG: Black & Gold ("purple to black, white to gold")
    const darkPalette = [
      new THREE.Color("#decff2"), // 0.00: Top-right light lavender / white
      new THREE.Color("#c4b1e5"), // 0.12
      new THREE.Color("#a682db"), // 0.28
      new THREE.Color("#8e5ccf"), // 0.48
      new THREE.Color("#7337bd"), // 0.68
      new THREE.Color("#591cb0"), // 0.85
      new THREE.Color("#420b8c"), // 1.00: Bottom-left deep purple/violet
    ];

    const lightPalette = [
      new THREE.Color("#fbbf24"), // 0.00: Top-right rich bright gold (from white/lavender)
      new THREE.Color("#f59e0b"), // 0.12: Warm gold
      new THREE.Color("#d97706"), // 0.28: Deep golden amber
      new THREE.Color("#92400e"), // 0.48: Antique bronze gold
      new THREE.Color("#451a03"), // 0.68: Dark mahogany/bronze
      new THREE.Color("#1c1917"), // 0.85: Rich charcoal black
      new THREE.Color("#050508"), // 1.00: Pure deep black (from purple)
    ];

    const sideDarkColor = new THREE.Color("#380c5e"); // Purple bevel sides on black bg
    const sideLightColor = new THREE.Color("#1c1917"); // Black/bronze bevel sides on white bg

    const stops = [0.0, 0.12, 0.28, 0.48, 0.68, 0.85, 1.0];

    const logoTexture = new THREE.CanvasTexture(gradCanvas);
    logoTexture.colorSpace = THREE.SRGBColorSpace;

    function renderGradient(t: number) {
      if (!gradCtx) return;
      const grad = gradCtx.createLinearGradient(560, -30, 0, 520);
      for (let i = 0; i < stops.length; i++) {
        const darkC = darkPalette[i] ?? darkPalette[0]!;
        const lightC = lightPalette[i] ?? lightPalette[0]!;
        const stopVal = stops[i] ?? 0;
        const c = lerpColor(darkC, lightC, t);
        grad.addColorStop(stopVal, colorToHex(c));
      }
      gradCtx.fillStyle = grad;
      gradCtx.fillRect(0, 0, 512, 512);
      logoTexture.needsUpdate = true;
    }

    renderGradient(isLightRef.current ? 1.0 : 0.0);

    const frontMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 1.0,
      metalness: 0.0,
    });

    const sideMat = new THREE.MeshStandardMaterial({
      color: isLightRef.current ? sideLightColor : sideDarkColor,
      roughness: 1.0,
      metalness: 0.0,
    });

    // 4. Extrusion & Pixel-perfect UV Mapping
    const extrudeSettings = {
      depth: 25,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 1.8,
      bevelOffset: 0,
      bevelSegments: 4,
    };

    function to3D(x: number, y: number): [number, number] {
      return [x - 250, -(y - 250)];
    }

    const pixelPerfectUVGenerator = {
      generateTopUV: function (
        _geometry: THREE.BufferGeometry,
        vertices: number[],
        indexA: number,
        indexB: number,
        indexC: number
      ) {
        const vAx = vertices[indexA * 3] ?? 0;
        const vAy = vertices[indexA * 3 + 1] ?? 0;
        const vBx = vertices[indexB * 3] ?? 0;
        const vBy = vertices[indexB * 3 + 1] ?? 0;
        const vCx = vertices[indexC * 3] ?? 0;
        const vCy = vertices[indexC * 3 + 1] ?? 0;

        const ax = (vAx + 250) / 500;
        const ay = (vAy + 250) / 500;
        const bx = (vBx + 250) / 500;
        const by = (vBy + 250) / 500;
        const cx = (vCx + 250) / 500;
        const cy = (vCy + 250) / 500;
        return [
          new THREE.Vector2(ax, ay),
          new THREE.Vector2(bx, by),
          new THREE.Vector2(cx, cy),
        ];
      },
      generateSideWallUV: function (
        _geometry: THREE.BufferGeometry,
        _vertices: number[],
        _indexA: number,
        _indexB: number,
        _indexC: number,
        _indexD: number
      ) {
        return [
          new THREE.Vector2(0, 0),
          new THREE.Vector2(1, 0),
          new THREE.Vector2(1, 1),
          new THREE.Vector2(0, 1),
        ];
      },
    };

    function createShapeMesh(points: [number, number][], extrudeOpts: typeof extrudeSettings) {
      const shape = new THREE.Shape();
      const firstPoint = points[0];
      if (firstPoint) {
        const p0 = to3D(firstPoint[0], firstPoint[1]);
        shape.moveTo(p0[0], p0[1]);
      }
      for (let i = 1; i < points.length; i++) {
        const pt = points[i];
        if (pt) {
          const p = to3D(pt[0], pt[1]);
          shape.lineTo(p[0], p[1]);
        }
      }
      shape.closePath();

      const geom = new THREE.ExtrudeGeometry(shape, {
        ...extrudeOpts,
        UVGenerator: pixelPerfectUVGenerator,
      });

      return new THREE.Mesh(geom, [frontMat, sideMat]);
    }

    // Top Wing Polygon
    const topWingPoints: [number, number][] = [
      [285, 106],
      [413, 106],
      [289, 241],
      [223, 241],
      [223, 173],
    ];
    const topWingMesh = createShapeMesh(topWingPoints, extrudeSettings);

    // Bottom Shape Polygon
    const botShapePoints: [number, number][] = [
      [89, 242],
      [222, 242],
      [299, 319],
      [299, 385],
      [232, 385],
    ];
    const botShapeMesh = createShapeMesh(botShapePoints, extrudeSettings);

    // Dot Circle
    const dotPoints: [number, number][] = [];
    const segments = 48;
    const dotCx = 166,
      dotCy = 192,
      dotR = 28.5;
    for (let i = 0; i < segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      dotPoints.push([dotCx + dotR * Math.cos(theta), dotCy + dotR * Math.sin(theta)]);
    }
    const dotMesh = createShapeMesh(dotPoints, {
      ...extrudeSettings,
      depth: 27,
      bevelThickness: 2.5,
      bevelSize: 2.0,
    });

    const logoGroup = new THREE.Group();
    logoGroup.add(topWingMesh);
    logoGroup.add(botShapeMesh);
    logoGroup.add(dotMesh);

    // Stable, front-facing 3D orientation matching the exact reference photo
    logoGroup.position.set(0, 0, 0);
    logoGroup.rotation.set(0.04, -0.06, 0);
    scene.add(logoGroup);

    // 5. Smooth Theme Interpolation Loop (Lerp) & Subtle Hover Interaction
    let currentThemeT = isLightRef.current ? 1.0 : 0.0;
    let targetRotX = 0.04;
    let targetRotY = -0.06;
    let animId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetRotY = -0.06 + nx * 0.25;
      targetRotX = 0.04 - ny * 0.25;
    };

    const handleMouseLeave = () => {
      targetRotX = 0.04;
      targetRotY = -0.06;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Interpolate theme color smoothly
      const targetT = isLightRef.current ? 1.0 : 0.0;
      if (Math.abs(currentThemeT - targetT) > 0.001) {
        currentThemeT += (targetT - currentThemeT) * 0.07;
        renderGradient(currentThemeT);
        sideMat.color = lerpColor(sideDarkColor, sideLightColor, currentThemeT);
      }

      // Smooth subtle tilt interpolation
      logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.1;
      logoGroup.rotation.y += (targetRotY - logoGroup.rotation.y) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 64;
      const h = container.clientHeight || 64;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      frontMat.dispose();
      sideMat.dispose();
      logoTexture.dispose();
      topWingMesh.geometry.dispose();
      botShapeMesh.geometry.dispose();
      dotMesh.geometry.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
    />
  );
}
