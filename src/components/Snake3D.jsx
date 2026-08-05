"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// A stylised 3D snake: a slithering tube built procedurally (no model file),
// lit for a glossy look. On `leaving` it lunges toward the camera.
export function Snake3D({ leavingRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (e) {
      return; // no WebGL — the HTML name/layout still shows, nothing blanks
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xffffff, 1.15); key.position.set(4, 6, 5); scene.add(key);
    const warm = new THREE.PointLight(0xffd2cc, 0.6, 40); warm.position.set(-4, -2, 4); scene.add(warm);

    const group = new THREE.Group(); scene.add(group);
    const mat = new THREE.MeshStandardMaterial({ color: 0xe5261f, metalness: 0.18, roughness: 0.34 });
    const R = 0.34, LEN = 10;
    let tube = null;

    const head = new THREE.Mesh(new THREE.SphereGeometry(R * 1.7, 20, 20), mat); group.add(head);
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.3 });
    const eyeGeo = new THREE.SphereGeometry(R * 0.42, 10, 10);
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat), eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(R * 0.7, R * 0.55, R * 1.0); eyeR.position.set(-R * 0.7, R * 0.55, R * 1.0);
    head.add(eyeL); head.add(eyeR);

    function curveAt(t) {
      const pts = [];
      for (let i = 0; i < 46; i++) {
        const u = i / 45;
        const taper = Math.sin(u * Math.PI);
        const x = (u - 0.5) * LEN;
        const y = Math.sin(u * 7 + t * 1.4) * 1.15 * (0.35 + 0.65 * taper);
        const z = Math.cos(u * 5.5 + t * 1.1) * 0.8 * (0.35 + 0.65 * taper);
        pts.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(pts);
    }

    function size() {
      const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    size();

    const t0 = performance.now();
    let raf = 0;
    function frame(now) {
      const t = (now - t0) / 1000;
      const curve = curveAt(t);
      if (tube) { group.remove(tube); tube.geometry.dispose(); }
      tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 220, R, 16, false), mat);
      group.add(tube);
      const hp = curve.getPoint(0), tan = curve.getTangent(0);
      head.position.copy(hp);
      head.lookAt(hp.clone().add(tan));
      group.rotation.y = Math.sin(t * 0.25) * 0.28;
      group.rotation.z = Math.sin(t * 0.18) * 0.06;
      if (leavingRef && leavingRef.current) {
        group.scale.multiplyScalar(1.05);
        camera.position.z = Math.max(1.2, camera.position.z * 0.96);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }
    const ro = new ResizeObserver(size); ro.observe(canvas);
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); if (tube) tube.geometry.dispose(); renderer.dispose(); };
  }, []);
  return <canvas ref={canvasRef} className="snake3d-canvas" aria-hidden="true" />;
}
