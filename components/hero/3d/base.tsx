"use client";

import { useRef } from "react";
import { OrbitControls, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// @ts-ignore NOTE: LIB SIDE ERROR
import { Perf } from "r3f-perf";
import * as THREE from "three";

const isDev = false;

const Base = () => {
	const directionalLight = useRef<THREE.DirectionalLight>(null);
	const boxRef = useRef<THREE.Mesh>(null);

	useFrame((state, delta) => {
		const time = state.clock.elapsedTime;
		if (boxRef.current) {
			boxRef.current.position.x = Math.sin(time) + 0.25;

			boxRef.current.rotation.y += delta;
		}
	});

	return (
		<>
			{/* コントロール */}
			<OrbitControls makeDefault />

			{/* モニター */}
			{isDev && <Perf position="top-left" />}

			{/* 環境光 */}
			<ambientLight intensity={1.2} />

			{/* 平行光 */}
			<directionalLight
				castShadow
				ref={directionalLight}
				position={[1, 2, 3]}
				intensity={0.3}
				shadow-mapSize={[1024, 1024]}
			/>

			<group position={[-1, 1, 0]}>
				{/* 球体 */}
				<mesh castShadow position={[-0.5, -0.25, 0.25]} scale={1.3}>
					<sphereGeometry />
					<meshStandardMaterial color="orange" />
				</mesh>

				{/* 箱 */}
				<mesh castShadow position={[0.25, 0.25, 0.25]} scale={0.3} ref={boxRef}>
					<boxGeometry />
					<meshStandardMaterial color="mediumpurple" />
				</mesh>
			</group>
		</>
	);
};

export default Base;
