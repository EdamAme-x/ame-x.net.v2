"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { SocialIcon } from "react-social-icons";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Menu, SNS } from "./Menu";

export function Hamburger() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline">
					<IoMenu className="transform scale-150" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="text-md">Menu</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{Menu.map(menu => {
					if (menu.type === "route") {
						return (
							<DropdownMenuItem key={menu.title}>
								<Link href={menu.path} prefetch={true} className="flex justify-left w-full">
									<Label>{menu.title}</Label>
								</Link>
							</DropdownMenuItem>
						);
					} else {
						return (
							<DropdownMenuItem key={menu.title}>
								<a href={menu.path} className="flex justify-left w-full" target="_blank">
									<Label>{menu.title}</Label>
								</a>
							</DropdownMenuItem>
						);
					}
				})}
				<DropdownMenuSeparator />
				<div className="flex justify-around space-x-3 mt-1">
					{SNS.map(sns => (
						<a
							href={sns.path}
							key={sns.title}
							title={sns.title}
							aria-label={sns.title}
							target="_blank"
							className="transform scale-[0.75] w-[50px] h-[50px] invert dark:invert-[0]">
							<SocialIcon url={sns.path} bgColor="#00000000" as={"div"} />
						</a>
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
