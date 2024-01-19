const ProjectConfigBase = {
	twitterId: "amex2189",
	githubId: "EdamAme-x",
	discordId: "ctkpaarr",
	discordUserId: "krswkrs",
	zennId: "ame_x",
	url: "https://ame-x.net",
	keywords: ["amex2189", "ame-x", "ame_x", "amex net", "ame-x.net", "荒らし共栄圏"]
};

export const ProjectConfig = {
	...ProjectConfigBase,
	iconUri: `https://github.com/${ProjectConfigBase.githubId}.png`,
	rssUri: `https://nitter.cz/${ProjectConfigBase.twitterId}/rss`
} as const;
