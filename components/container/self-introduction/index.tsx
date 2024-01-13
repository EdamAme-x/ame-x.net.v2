"use client";

import { Fragment } from "react";
import { TEXT } from "@/data/text";

import { Card, CardContent } from "@/components/ui/card";

export function SelfIntro() {
	return (
		<div className="w-full max-h-full flex justify-center">
			<Card className="flex flex-col justify-center items-center w-[95%] sm:w-4/5 border-gradient background-gradient backdrop-blur-sm">
				<CardContent className="text-xs sm:text-md lg:text-lg mx-4 my-5 md:mx-2 md:my-[2rem] p-0 font-semibold space-y-2">
					{TEXT.Intro.map((text, index) => {
						return <Fragment key={index}>{text}</Fragment>;
					})}
				</CardContent>
			</Card>
		</div>
	);
}
