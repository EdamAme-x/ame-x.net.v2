"use client";

import { Fragment, useEffect, useState } from "react";
import { ProjectConfig } from "@/data/config";
import { parseCurlToRequest } from "@/utils/parse/parseCurlToFetch";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

import { isClient } from "./../../../utils/fingerprint/isClient";

hljs.registerLanguage("json", json);

export function Shell() {
	return (
		<div className="w-full h-[300px]">
			<ShellTerminal />
            <style>
                {`.hljs{display:block;overflow-x:auto;padding:.5em;background:#282a36}.hljs-built_in,.hljs-link,.hljs-section,.hljs-selector-tag{color:#8be9fd}.hljs-keyword{color:#ff79c6}.hljs,.hljs-subst{color:#f8f8f2}.hljs-attr,.hljs-meta-keyword,.hljs-title{font-style:italic;color:#50fa7b}.hljs-addition,.hljs-bullet,.hljs-meta,.hljs-name,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-type,.hljs-variable{color:#f1fa8c}.hljs-comment,.hljs-deletion,.hljs-quote{color:#6272a4}.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type{font-weight:700}.hljs-literal,.hljs-number{color:#bd93f9}.hljs-emphasis{font-style:italic}`}
            </style>
		</div>
	);
}

function ShellTerminal() {
	const [terminalLineData, setTerminalLineData] = useState([
		<Fragment key={0}>
			<TerminalOutput>{`Welcome to the Amex Shell!\nhelp can be found at \`$ help\``}</TerminalOutput>
		</Fragment>
	]);

	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, []);

	if (width < 768) {
		return <></>;
	}

	let latestCommand: string | false =
		typeof terminalLineData[terminalLineData.length - 1].props.children.props.children === "string" &&
		terminalLineData[terminalLineData.length - 1].props.children.props.children.startsWith("$")
			? terminalLineData[terminalLineData.length - 1].props.children.props.children
			: false;
	if (latestCommand) {
		const latestCommandArray = latestCommand.split("$ ").reverse();
		latestCommandArray.pop();
		latestCommand = latestCommandArray.reverse().join("$ ");

		switch (latestCommand.split(" ")[0]) {
			case "clear":
				setTerminalLineData([
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{"Welcome to the Amex Shell!\nhelp can be found at `$ help`"}</TerminalOutput>
					</Fragment>
				]);
				break;
			case "cowsay":
				const cowsayArray = latestCommand.split("cowsay ");
				cowsayArray.shift();
				const cowsay = cowsayArray.join("cowsay ");
				const len = cowsay.length;

				if (len > 20) {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: ${len} length is too long :(`}</TerminalOutput>
						</Fragment>
					]);
					break;
				}

				const base = `cowsay ${cowsay}
${" " + `-`.repeat(len + 2)}
< ${cowsay} >
${" " + `-`.repeat(len + 2)}
        \\   ^__^    
         \\  (oo)\\_______    
            (__)\\       )\\/\\    
               ||----w |   
               ||     ||    `;

				setTerminalLineData([
					...terminalLineData,
					...base.split("\n").map((line, index) => (
						<Fragment key={terminalLineData.length + 1 + index}>
							<TerminalOutput>{line}</TerminalOutput>
						</Fragment>
					))
				]);

				break;
			case "deno":
			case "bun":
			case "node":
				const code = latestCommand.split(" ");
				code.shift();

				if (code.join(" ").trim() === "") {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: e.g.: \`${
								latestCommand.split(" ")[0]
							}  11 * 199\` :(`}</TerminalOutput>
						</Fragment>
					]);
					break;
				}

				let result = "";
				try {
					result = new Function("return " + code.join(" "))();
				} catch (e) {
					result = "Error :(";
					result += `\ne.g.: \`${latestCommand.split(" ")[0]}  11 * 199\` :(`;
				}

				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{`fake ${latestCommand.split(" ")[0]} version: -1.0 :(`}</TerminalOutput>
					</Fragment>,
					<Fragment key={terminalLineData.length + 2}>
						<TerminalOutput>{result.toString()}</TerminalOutput>
					</Fragment>
				]);

				break;
			case "reload":
				window.location.reload();
				break;
			case "echo":
				const echoArray = latestCommand.split("echo ");
				echoArray.shift();
				const echo = echoArray.join("echo ");
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{echo}</TerminalOutput>
					</Fragment>
				]);

				break;
			case "whoami":
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{document.body.id ?? "Real"}</TerminalOutput>
					</Fragment>
				]);
				break;
			case "curl":
				const curlText = latestCommand;
				let req: Request = new Request("https://ame-x.net", {});

				try {
					req = parseCurlToRequest(curlText);
				} catch (_e) {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: \`${curlText}\` is in a wrong format :(`}</TerminalOutput>
						</Fragment>
					]);
					break;
				}

				fetch(req.url, {
					...req
				})
					.then(res => {
						if (res.ok) {
							res.text().then(text => {
								try {
									const result = JSON.parse(text);

									setTerminalLineData([
										...terminalLineData,
										<Fragment key={terminalLineData.length + 1}>
											<TerminalOutput>
												<div
													dangerouslySetInnerHTML={{
														__html: hljs.highlight("json", JSON.stringify(result, null, 2))
															.value
													}}></div>
											</TerminalOutput>
										</Fragment>
									]);
								} catch (_e) {
									setTerminalLineData([
										...terminalLineData,
										<Fragment key={terminalLineData.length + 1}>
											<TerminalOutput>{text}</TerminalOutput>
										</Fragment>
									]);
								}
							});
						} else {
							setTerminalLineData([
								...terminalLineData,
								<Fragment key={terminalLineData.length + 1}>
									<TerminalOutput>{`Amex shell: bad status code: ${res.status} :(`}</TerminalOutput>
								</Fragment>
							]);
						}
					})
					.catch(_e => {
						setTerminalLineData([
							...terminalLineData,
							<Fragment key={terminalLineData.length + 1}>
								<TerminalOutput>{`Amex shell: ANY ERROR ;; (CORS, Redirect, 404, etc...)`}</TerminalOutput>
							</Fragment>
						]);
					});

				break;
			case "help":
				const helps: {
					name: string;
					description: string;
				}[] = [
					{
						name: "curl",
						description: "communication with url command"
					},
					{
						name: "whoami",
						description: "who am I (show IP)"
					},
					{
						name: "reload",
						description: "reload the page"
					},
					{
						name: "echo",
						description: "echo <text>"
					},
					{
						name: "help",
						description: "show help"
					},
					{
						name: "cowsay <text>",
						description: "Let the cow ASCII art speak"
					},
					{
						name: "node",
						description: "node <script> (as (deno|bun))"
					}
				];
				setTerminalLineData([
					...terminalLineData,
					...helps.map((help, i) => {
						return (
							<Fragment key={terminalLineData.length + i + 1}>
								<TerminalOutput>{` \$ ${help.name} - ${help.description}`}</TerminalOutput>
							</Fragment>
						);
					}),
					<Fragment key={terminalLineData.length + helps.length + 1}>
						<TerminalOutput>{` Please send feature requests to @${ProjectConfig.twitterId} :)`}</TerminalOutput>
					</Fragment>
				]);
				break;
			default:
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{`Amex shell: ${latestCommand.split(" ")[0]} is 404 :(`}</TerminalOutput>
					</Fragment>
				]);
				break;
		}
	}

	return (
		<div className="container w-3/4 h-[200px] overflow-y-none opacity-[0.8]">
			<Terminal
				name="Amex Shell"
				colorMode={ColorMode.Dark}
				onInput={terminalInput => {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{"$ " + terminalInput}</TerminalOutput>
						</Fragment>
					]);
				}}
				prompt={"$"}
				startingInputValue={
					"curl -X GET " + (!isClient() ? "https://localhost" : window.location.origin) + "/api/myinfo"
				}
				height="300px">
				{terminalLineData}
			</Terminal>
		</div>
	);
}
