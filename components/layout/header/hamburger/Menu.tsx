import { ProjectConfig } from "@/data/config";
import { SocialIcon } from "react-social-icons";

export type MenuContext = {
	type: "route" | "external";
	path: string;
	title: string;
}[];

export type SNSContext = {
	path: string;
	title: string;
}[];

export const Menu: MenuContext = [
	{
		type: "route",
		path: "/",
		title: "Home"
	}
];

export const SNS: SNSContext = [
	{
		path: `https://twitter.com/${ProjectConfig.twitterId}`,
		title: "Twitter"
	},
	{
		path: `https://github.com/${ProjectConfig.githubId}`,
		title: "Github"
	},
	{
		path: `https://discord.gg/${ProjectConfig.discordId}`,
		title: "Discord"
	},
	{
		path: `https://zenn.dev/${ProjectConfig.zennId}`,
		title: "Zenn"
	}
];
