import { Button } from "@/components/ui/button";
import { ProjectConfig } from "./config";

export const candoList = [
	{
		title: "Create Website",
		description: (
			<div>
				<p>
					I can create websites in <b className="mx-1">Deno</b> or <b className="mx-1">Node.js</b>.
				</p>
				<p>
					This site was created by combining <b className="mx-1">Next.js</b> with various frameworks.
				</p>
			</div>
		),
		button: (
			<a href={`https://github.com/` + ProjectConfig.githubId} target="_blank">
				<Button>All projects</Button>
			</a>
		)
	},
	{
		title: "Create Server",
		description: (
			<div>
				<p>
					I can create server in <b className="mx-1">Deno</b> or <b className="mx-1">Node.js</b> and etc.
				</p>
				<p>
					This site was created by combining <b className="mx-1">Next.js</b> with{" "}
					<b className="mx-1 text-orange-400">Hono</b>.
				</p>
			</div>
		),
		button: (
			<a
				href={`https://github.com/${ProjectConfig.githubId}?tab=repositories&q=&type=&language=typescript&sort=`}
				target="_blank">
				<Button>All projects</Button>
			</a>
		)
	},
	{
		title: "Create Desktop App",
		description: (
			<div>
				<p>
					I can create server in <b className="mx-1">Deno</b> or <b className="mx-1">Node.js</b> and etc.
				</p>
				<p>
					I use <b className="mx-1 text-red-500">Tauri</b> and <b className="mx-1 text-blue-300">Electron</b>.
				</p>
			</div>
		),
		button: (
			<a
				href={`https://github.com/${ProjectConfig.githubId}?tab=repositories&q=&type=&language=typescript&sort=`}
				target="_blank">
				<Button>All projects</Button>
			</a>
		)
	},
	{
		title: "Create Tools for anything",
		description: (
			<div>
				<p>
					I have created tools for <b className="mx-1 text-green-500">LINE</b> and{" "}
					<b className="mx-1 text-blue-600">Discord</b>.
				</p>
				<p>
					Users reached <b className="mx-1">5,000</b> per day and SEO rose to first place.
				</p>
			</div>
		),
		button: (
			<a href={`https://github.com/${ProjectConfig.githubId}`} target="_blank">
				<Button>All tools</Button>
			</a>
		)
	}
];
