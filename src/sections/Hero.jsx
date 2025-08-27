import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AnimatedCamera2 from "../component/cameraRig3";
import { PlainBox } from "../component/Block1";
import { Environment, Lightformer, Sparkles, Stars, Float } from "@react-three/drei";
import TextSections from "../component/Text";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Define fade thresholds
  const fadeStart = 0.8;

  // Calculate opacity values based on scrollProgress
  const canvasOpacity =
    scrollProgress < fadeStart ? 1 : 1 - (scrollProgress - fadeStart) / (1 - fadeStart);

  const body2Opacity =
    scrollProgress < fadeStart ? 0 : (scrollProgress - fadeStart) / (1 - fadeStart);

  return (
    <>
      {/* Scroll container driving the animation */}
      <div id="scroll-container" className="relative w-screen h-[1200vh] bg-black">
        {/* Spacer for scroll space */}
        <div className="h-[100vh]" />

        {/* 3D Canvas with opacity controlled by scrollProgress */}
        <div

          className="fixed top-0 left-0 w-screen h-screen z-10"
        >
          <Canvas camera={{ position: [0, 0.6, 5], fov: 75 }}>
            <AnimatedCamera2 onScrollProgress={setScrollProgress} />
            <Environment>
              <Lightformer intensity={5} position={[0, 5, -5]} scale={[10, 10, 1]} />
            </Environment>
            <Sparkles count={500} size={2} speed={1} scale={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} fade />
            <ambientLight intensity={3} />
            <directionalLight position={[5, 3, 5]} intensity={4} />
            <Float speed={1} rotationIntensity={0} floatIntensity={1}>
              <PlainBox />
            </Float>
          </Canvas>
        </div>
      </div>

      {/* Text sections (always visible) */}
      <div>
        <TextSections />
      </div>

    </>
  );
}