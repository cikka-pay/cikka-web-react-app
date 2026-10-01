import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function PhoneScreen1Canvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId = 0;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.filter = "drop-shadow(0px 12px 24px rgba(0,0,0,0.65))";

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, 390 / 844, 0.1, 4000);
    camera.position.set(0, 0, 1800);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const bevelLight = new THREE.DirectionalLight(0xffffff, 0.38);
    bevelLight.position.set(120, 220, 350);
    scene.add(bevelLight);

    // 1024x1024 HD Brand gradient texture matching official logo (Top-Right pale lavender to Bottom-Left deep purple)
    const logoGradCanvas = document.createElement("canvas");
    logoGradCanvas.width = 1024;
    logoGradCanvas.height = 1024;
    const logoCtx = logoGradCanvas.getContext("2d");
    if (logoCtx) {
      const logoGrad = logoCtx.createLinearGradient(1024, 0, 0, 1024);
      logoGrad.addColorStop(0.0, "#ffffff"); // Top-Right crisp white
      logoGrad.addColorStop(0.12, "#f3e8ff"); // Pale lavender
      logoGrad.addColorStop(0.28, "#e9d5ff"); // Light purple
      logoGrad.addColorStop(0.48, "#c084fc"); // Bright vibrant purple
      logoGrad.addColorStop(0.68, "#9333ea"); // Deep brand purple
      logoGrad.addColorStop(0.85, "#7e22ce"); // Rich violet
      logoGrad.addColorStop(1.0, "#4c1d95"); // Dark obsidian purple
      logoCtx.fillStyle = logoGrad;
      logoCtx.fillRect(0, 0, 1024, 1024);
    }

    const logoTexture = new THREE.CanvasTexture(logoGradCanvas);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.generateMipmaps = true;
    logoTexture.minFilter = THREE.LinearMipmapLinearFilter;
    logoTexture.magFilter = THREE.LinearFilter;

    const frontMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      roughness: 1.0,
      metalness: 0.0,
    });
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      roughness: 1.0,
      metalness: 0.0,
    });

    const extrudeSettings = {
      depth: 25,
      bevelEnabled: true,
      bevelThickness: 2.2,
      bevelSize: 1.8,
      bevelOffset: 0,
      bevelSegments: 4,
      curveSegments: 24,
    };

    const uvGen = {
      generateTopUV: function (
        _geo: THREE.BufferGeometry,
        verts: number[],
        iA: number,
        iB: number,
        iC: number
      ) {
        return [
          new THREE.Vector2(((verts[iA * 3] ?? 0) + 250) / 500, ((verts[iA * 3 + 1] ?? 0) + 250) / 500),
          new THREE.Vector2(((verts[iB * 3] ?? 0) + 250) / 500, ((verts[iB * 3 + 1] ?? 0) + 250) / 500),
          new THREE.Vector2(((verts[iC * 3] ?? 0) + 250) / 500, ((verts[iC * 3 + 1] ?? 0) + 250) / 500),
        ];
      },
      generateSideWallUV: function () {
        return [
          new THREE.Vector2(0, 0),
          new THREE.Vector2(1, 0),
          new THREE.Vector2(1, 1),
          new THREE.Vector2(0, 1),
        ];
      },
    };

    function to3D(x: number, y: number): [number, number] {
      return [x - 250, -(y - 250)];
    }

    function makeShape(points: [number, number][]) {
      const shape = new THREE.Shape();
      const firstPt = points[0];
      if (firstPt) {
        const p0 = to3D(firstPt[0], firstPt[1]);
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
        ...extrudeSettings,
        UVGenerator: uvGen,
      });
      return new THREE.Mesh(geom, [frontMat, sideMat]);
    }

    // Top wing
    const topWing = makeShape([
      [285, 106],
      [413, 106],
      [289, 241],
      [223, 241],
      [223, 173],
    ]);

    // Bottom shape
    const botShape = makeShape([
      [89, 242],
      [222, 242],
      [299, 319],
      [299, 385],
      [232, 385],
    ]);

    // Dot circle
    const dotPts: [number, number][] = [];
    for (let i = 0; i < 48; i++) {
      const t = (i / 48) * Math.PI * 2;
      dotPts.push([166 + 28.5 * Math.cos(t), 192 + 28.5 * Math.sin(t)]);
    }

    const dotMesh = (() => {
      const shape = new THREE.Shape();
      const p0 = to3D(dotPts[0]![0], dotPts[0]![1]);
      shape.moveTo(p0[0], p0[1]);
      for (let i = 1; i < dotPts.length; i++) {
        const pt = dotPts[i];
        if (pt) {
          const p = to3D(pt[0], pt[1]);
          shape.lineTo(p[0], p[1]);
        }
      }
      shape.closePath();
      const geom = new THREE.ExtrudeGeometry(shape, {
        ...extrudeSettings,
        depth: 27,
        bevelThickness: 2.5,
        bevelSize: 2.0,
        UVGenerator: uvGen,
      });
      return new THREE.Mesh(geom, [frontMat, sideMat]);
    })();

    // 3D Drop shadow meshes
    const shadowMat1 = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const shadowMat2 = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });

    const shadowGroup1 = new THREE.Group();
    shadowGroup1.add(new THREE.Mesh(topWing.geometry, shadowMat1));
    shadowGroup1.add(new THREE.Mesh(botShape.geometry, shadowMat1));
    shadowGroup1.add(new THREE.Mesh(dotMesh.geometry, shadowMat1));
    shadowGroup1.position.set(10, -10, -5);

    const shadowGroup2 = new THREE.Group();
    shadowGroup2.add(new THREE.Mesh(topWing.geometry, shadowMat2));
    shadowGroup2.add(new THREE.Mesh(botShape.geometry, shadowMat2));
    shadowGroup2.add(new THREE.Mesh(dotMesh.geometry, shadowMat2));
    shadowGroup2.position.set(20, -20, -12);

    const cikkaGroup = new THREE.Group();
    cikkaGroup.add(shadowGroup2);
    cikkaGroup.add(shadowGroup1);
    cikkaGroup.add(topWing);
    cikkaGroup.add(botShape);
    cikkaGroup.add(dotMesh);

    // Position and scale matching dummyscreens.html
    cikkaGroup.scale.set(0.78, 0.78, 0.78);
    cikkaGroup.position.set(0, 75, 0);
    cikkaGroup.rotation.set(0, 0, 0);
    scene.add(cikkaGroup);

    function updateSize() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const W = rect.width || 340;
      const H = rect.height || 660;
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    }

    updateSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", updateSize);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { rootMargin: "100px" }
    );
    intersectionObserver.observe(container);

    let frameCount = 10;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      if (frameCount > 0) {
        renderer.render(scene, camera);
        frameCount--;
      }
    };
    // Re-render periodically on resize or changes
    renderer.render(scene, camera);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateSize);
      resizeObserver?.disconnect();
      intersectionObserver.disconnect();
      renderer.dispose();
      frontMat.dispose();
      sideMat.dispose();
      shadowMat1.dispose();
      shadowMat2.dispose();
      logoTexture.dispose();
      topWing.geometry.dispose();
      botShape.geometry.dispose();
      dotMesh.geometry.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.65))",
      }}
    />
  );
}
