import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function AnimatedCamera2({ onScrollProgress }) {
  const { camera } = useThree();
  const pos = useRef({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
  const target = useRef({ x: 0, y: 0.2, z: 0 });

useFrame(() => {
  const targetPos = new THREE.Vector3(pos.current.x, pos.current.y, pos.current.z);
  camera.position.lerp(targetPos, 0.1);
  camera.lookAt(target.current.x, target.current.y, target.current.z);
});

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true,
        // Note: 'damping' is not a valid ScrollTrigger option; remove it.
        onUpdate: (self) => {
          if (onScrollProgress) onScrollProgress(self.progress);
        },
      },
    });

    tl.to(pos.current, { x: 0, y: 2.5, z: 1.7, duration: 2, ease: "power2.inOut" })
      .to(target.current, { x: 0, y: 0.2, z: 0, duration: 3, ease: "power2.inOut" })
      .to(pos.current, { x: -2, y: 1, z: 1, duration: 3, ease: "power2.inOut" })
      .to(pos.current, { x: 2, y: 1, z: 1, duration: 3, ease: "power2.inOut" })
      .to(pos.current, { x: 1, y: 0.6, z: -1.5, duration: 3, ease: "power2.inOut" })
      .to(pos.current, { x: 1, y: -2, z: 0.5, duration: 3, ease: "power2.inOut" })
      .to(pos.current, { x: 0, y: 0.6, z: 10, duration: 1, ease: "power2.inOut" })

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [onScrollProgress,]);

  return null;
}