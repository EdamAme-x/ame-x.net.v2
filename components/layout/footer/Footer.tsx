import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger
} from "@/components/ui/menubar";
import { Separator } from "@/components/ui/separator";
import { SNS } from "../header/hamburger/Menu";
import Link from "next/link";
import { Menu, MenuContext } from './../header/hamburger/Menu';
import { ProjectConfig } from "@/data/config";

export function Footer() {
	return (
		<div className="w-full min-h-16">
			<Separator />
			<footer className="w-full min-h-5 mt-2 flex flex-wrap justify-center">
				<div className="w-4/5 sm:w-3/4 flex justify-start">
					<FooterMenu />
				</div>
			</footer>
		</div>
	);
}

export function FooterMenu() {
	return (
		<Menubar className="w-full flex justify-center gap-x-2">
			<MenubarMenu>
				<MenubarTrigger>
					<Link href="/profile">
						Profile
					</Link>
				</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Info</MenubarTrigger>
				<MenubarContent>
				<MenubarLabel>Info</MenubarLabel>
				<MenubarSeparator />
				<MenubarItem>
					<a href={`https://github.com/${ProjectConfig.githubId}/ame-x.net.v2`} target="_blank">Repository</a>
				</MenubarItem>
				<MenubarItem>
					<a href={`https://twitter.com/${ProjectConfig.twitterId}`} target="_blank">© {ProjectConfig.twitterId}</a>
				</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Pages</MenubarTrigger>
				<MenubarContent>
					<MenubarLabel>Pages</MenubarLabel>
					<MenubarSeparator />
					{
						Menu.map((menu: MenuContext[number]) => {
							if (menu.type === "route") {
								return (
									<MenubarItem key={menu.title} inset>
										<Link href={menu.path} prefetch>
											{menu.title}
										</Link>
									</MenubarItem>
								)
							}else {
								return (
									<MenubarItem key={menu.title} inset>
										<a href={menu.path} target="_blank">
											{menu.title}
										</a>
									</MenubarItem>
								)
							}
						})
					}
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>SNS</MenubarTrigger>
				<MenubarContent>
					<MenubarLabel>SNS</MenubarLabel>
					<MenubarSeparator />
					{
						SNS.map(sns => (
							<MenubarItem key={sns.title} inset>
								<a href={sns.path} target="_blank">
									{sns.title}
								</a>
							</MenubarItem>
						))
					}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
}
