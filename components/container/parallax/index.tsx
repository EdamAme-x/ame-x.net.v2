"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Parallax() {
	return (
		<>
			<div className="w-full min-h-[500px] flex justify-center items-center">
				<ParallaxBackGround />
				<Card className="w-4/5 sm:w-3/4 h-4/5 sm:h-3/4 min-h-[400px] bg-transparent backdrop-blur-sm">
					<CardHeader>
						<CardTitle>What I can do 🤔</CardTitle>
					</CardHeader>
					<CardContent className="w-full flex justify-center items-center">
						<Carousel className="w-full max-w-xs">
							<CarouselContent>
								{Array.from({ length: 5 }).map((_, index) => (
									<CarouselItem key={index}>
										<div className="p-1">
											<Card>
												<CardContent className="flex aspect-square items-center justify-center p-6">
													<span className="text-4xl font-semibold">{index + 1}</span>
												</CardContent>
											</Card>
										</div>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious />
							<CarouselNext />
						</Carousel>
					</CardContent>
				</Card>
			</div>
		</>
	);
}

function ParallaxBackGround() {
	const triggerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const trigger = triggerRef.current;
		if (!trigger) {
			return;
		}

		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			trigger,
			{
				yPercent: 50
			},
			{
				yPercent: -50,
				scrollTrigger: {
					trigger: trigger,
					start: "top bottom",
					end: "bottom top",
					scrub: 1
				}
			}
		);
	}, []);

	return (
		<div className="absolute top-[600px] w-full h-screen z-[-1]" ref={triggerRef}>
			<IconObject name="nextjs/nextjs-original" className="relative top-[120px] left-[2.5vw]" />
			<IconObject
				name="angularjs/angularjs-plain"
				className="relative top-[100px] left-[97.5%] translate-x-[-100%]"
			/>
			<IconObject name="react/react-original" className="relative top-[120px] left-[3vw]" />
			<IconObject
				name="typescript/typescript-original"
				className="relative top-[100px] left-[97.5%] translate-x-[-100%] rounded-md"
			/>
			<IconObject
				name="denojs/denojs-original"
				className="relative top-[120px] left-[2.5vw] bg-white rounded-full"
			/>
			<IconObject name="nodejs/nodejs-plain" className="relative top-[100px] left-[97.5%] translate-x-[-100%]" />
			<IconObject name="vscode/vscode-original" className="relative top-[120px] left-[2.5vw]" />
		</div>
	);
}

function IconObject({ name, className, ref }: { name: string; className?: string; ref?: React.Ref<HTMLImageElement> }) {
	return (
		<Image
			ref={ref}
			src={"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/" + name + ".svg"}
			className={cn("transition-all transiton-duration-300 drop-shadow-xl dropshadow-white", className)}
			width={75}
			height={75}
			alt={name}
		/>
	);
}
