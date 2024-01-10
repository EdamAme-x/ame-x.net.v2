"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Base from "./base";

export function Hero3D() {
	return (
		<div className="w-screen absolute z-[5] sm:relative sm:w-1/2 sm:z-[3]">
			<Canvas
				flat
				shadows
				gl={{
					antialias: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					outputEncoding: THREE.sRGBEncoding
				}}
				camera={{
					fov: 45,
					near: 0.1,
					far: 45,
					position: [0, 0, 6]
				}}>
				<Base />
			</Canvas>
		</div>
	);
}
