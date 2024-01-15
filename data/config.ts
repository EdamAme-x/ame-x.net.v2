const ProjectConfigBase = {
	twitterId: "amex2189",
	githubId: "EdamAme-x",
	discordId: "ctkpaarr",
	discordUserId: "krswkrs",
	zennId: "ame_x",
	url: "https://ame-x.net",
}

export const ProjectConfig = {
	...ProjectConfigBase,
	iconUri: `https://github.com/${ProjectConfigBase.githubId}.png`
} as const;
