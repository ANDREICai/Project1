import React, { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PlainBox(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/iphone_16.glb')

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isScrolling, setIsScrolling] = useState(false)
  const targetRotation = useRef(new THREE.Euler(0, 0, 0)) // default rotation

  // Listen to scroll and toggle follow state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1 && !isScrolling) {
        setIsScrolling(true)
      } else if (window.scrollY <= 0 && isScrolling) {
        setIsScrolling(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling])

  // Listen to mouse movement (only update state if not scrolling)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isScrolling && window.scrollY <= 0) {
        const x = (e.clientX / window.innerWidth) * 2 - 1
        const y = -(e.clientY / window.innerHeight) * 2 + 1
        setMouse({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isScrolling])

  // Animate rotation each frame
  useFrame(() => {
    if (!ref.current) return

if (!isScrolling && window.scrollY <= 1) {
  // Follow mouse at top
  const targetY = +mouse.x * 0.3; // ← negative to follow direction
  const targetX = -mouse.y * 0.3;
  ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
  ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
} else {
      // Scroll triggered: return to original rotation
      ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.1
      ref.current.rotation.y += (targetRotation.current.y - ref.current.rotation.y) * 0.1
      ref.current.rotation.z += (targetRotation.current.z - ref.current.rotation.z) * 0.1
    }
  })



  return (
    <group ref={ref} {...props} dispose={null} style={{ zIndex: 10 }}>
      <group position={[0.252, 0.667, -0.046]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Material}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}

      />
    </group>
  )
}

useGLTF.preload('/iphone_16.glb')