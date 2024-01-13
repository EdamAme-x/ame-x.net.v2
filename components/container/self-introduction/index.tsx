"use client";

import { Fragment } from "react";
import { TEXT } from "@/data/text";

import { Card, CardContent } from "@/components/ui/card";

export function SelfIntro() {
	return (
		<div className="w-full max-h-full flex justify-center">
			<Card className="flex flex-col justify-center items-center w-[95%] sm:w-4/5 border-gradient background-gradient">
				<CardContent className="text-xs sm:text-md mx-4 my-10 p-0 font-semibold space-y-2">
					{TEXT.Intro.map((text, index) => {
						return <Fragment key={index}>{text}</Fragment>;
					})}
				</CardContent>
			</Card>
		</div>
	);
}
