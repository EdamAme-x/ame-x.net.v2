"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ProjectConfig } from "@/data/config";
import { allSameValue } from "@/utils/array/allSameValue";
import { isClient } from "@/utils/fingerprint/isClient";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const size = 90;
const images = [
	"/icon/3d/javascript.3d.svg",
	"/icon/3d/react.3d.svg",
	"/icon/3d/typescript.3d.svg",
	"/icon/3d/nodejs.3d.svg",
	"/icon/3d/vue.3d.svg",
	"/icon/3d/tailwind.3d.svg",
	"/icon/3d/vscode.3d.svg"
];
let slot = 4;

if (isClient()) {
	if (window.innerWidth < 977) {
		slot = 3;
	}
}

export function Hero3D() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [result, setResult] = useState<string[]>(images.slice(0, slot));
	const [isRouletting, setIsRouletting] = useState<boolean>(true);

	const congratulations = () => {
		console.log("[!] Congratulations!");
	};

	useEffect(() => {
		if (allSameValue(result) && isRouletting) {
			congratulations();
			setIsRouletting(false);
		}
	}, [result, isRouletting]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const shuffleAndRoulette = () => {
		if (!isRouletting) {
			congratulations();
			return;
		}

		let newResult = [...result];

		for (let i = 0; i < newResult.length; i++) {
			const j = images[Math.floor(Math.random() * images.length)];
			newResult[i] = j;
		}

		for (let i = 0; i < newResult.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[newResult[i], newResult[j]] = [newResult[j], newResult[i]];
		}

		setResult(newResult);
	};

	useEffect(() => {
		const handleShuffleAndRoulette = () => shuffleAndRoulette();

		if (rootRef.current) {
			rootRef.current.addEventListener("click", handleShuffleAndRoulette);
		}

		return () => {
			if (rootRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				rootRef.current.removeEventListener("click", handleShuffleAndRoulette);
			}
		};
	}, [shuffleAndRoulette]);

	return (
		<div
			className="w-screen hidden sm:w-1/2 h-[75vh] sm:flex flex-col justify-center items-center sm:items-center select-none"
			ref={rootRef}>
			<div className="relative flex place-items-center before:absolute before:h-[100px] before:w-full before:-translate-x-2/3 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[80px] after:w-2/3 after:translate-x-2/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-50 before:lg:h-[360px] z-[-1]">
				{result.map((image: string, index: number) => (
					<Image src={image} width={size} height={size} alt="icon" key={index} />
				))}
			</div>
			{!isRouletting && (
				<AlertDialog>
					<AlertDialogTrigger className="mt-3">
						<Button>Complete</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>You have aligned the slots!</AlertDialogTitle>
							<AlertDialogDescription>
								It{"'"}s amazing! What you have aligned in the slot is the{" "}
								{result[0]
									.split("/")
									.pop()
									?.split(".")[0]
									.split("")
									.map((string, index) => {
										if (index === 0) {
											return string.toUpperCase();
										}

										return string;
									})
									.join("")}
								. <br />
								Share on Twitter!
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									window.open(
										`https://twitter.com/intent/tweet?text=${encodeURIComponent(`@${
											ProjectConfig.twitterId
										}
私は ${result[0]
											.split("/")
											.pop()
											?.split(".")[0]
											.split("")
											.map((string, index) => {
												if (index === 0) {
													return string.toUpperCase();
												}
												return string;
											})
											.join("")} を揃えました！

↓ スロットにチャレンジする
https://ame-x.net
`)}`,
										"_blank"
									);
								}}>
								Share
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
