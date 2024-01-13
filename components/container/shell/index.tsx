"use client";

import { Fragment, useEffect, useState } from "react";
import { parseCurlToRequest } from "@/utils/parse/parseCurlToFetch";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

import { isClient } from "./../../../utils/fingerprint/isClient";

export function Shell() {
	return (
		<div className="w-full h-[300px]">
			<ShellTerminal />
		</div>
	);
}

function ShellTerminal() {
	const [terminalLineData, setTerminalLineData] = useState([
		<Fragment key={0}>
			<TerminalOutput>Welcome to the Amex Shell!</TerminalOutput>
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

	let latestCommand: string | false = terminalLineData[
		terminalLineData.length - 1
	].props.children.props.children.startsWith("$")
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
						<TerminalOutput>{"Welcome to the Amex Shell!"}</TerminalOutput>
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
                                            <TerminalOutput>{JSON.stringify(result, null, 2)}</TerminalOutput>
                                        </Fragment>
                                    ])
                                } catch (_e) {
                                    setTerminalLineData([
                                        ...terminalLineData,
                                        <Fragment key={terminalLineData.length + 1}>
                                            <TerminalOutput>{text}</TerminalOutput>
                                        </Fragment>
                                    ]);
                                }
                            })
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
								<TerminalOutput>{`Amex shell: ANY ERROR ;; (CORS, Redirect, etc...)`}</TerminalOutput>
							</Fragment>
						]);
					});

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
