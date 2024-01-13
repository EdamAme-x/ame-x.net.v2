/**
 * @Author @amex2189
 */
// @ts-ignore
const parseUrl = () => false;
const scan = (e: string, a: RegExp, r: any) => {
		let t = "";
		for (; e.length > 0; ) {
			let s: RegExpMatchArray | null = e.match(a);
			s
				? ((t += e.slice(0, s.index)), (t += r(s)), (e = e.slice(s?.index! + s[0].length)))
				: ((t += e), (e = ""));
		}
	},
	splitReg = /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/,
	split = (e: string) => {
		void 0 === e && (e = "");
		let a = [],
			r = "";
		return (
			scan(e, splitReg, ([e, t, s, o, d, c, i]: any[]) => {
				if (void 0 !== c) throw Error("Unmatched quote");
				(r += t || (s || o || d).replace(/\\(?=.)/, "")), void 0 !== i && (a.push(r), (r = ""));
			}),
			r && a.push(r),
			a
		);
	},
	rewrite = (e: any[]) =>
		e.reduce((e, a) => (0 === a.indexOf("-X") ? (e.push("-X"), e.push(a.slice(2))) : e.push(a), e), []),
	matchUrl = /((^https?:\/\/)|(^(?:[0-9]{1,3}\.){3}[0-9]{1,3})|localhost)/,
	addArg = (e: string | undefined, a: string) => (e ? e + "&" + a : a),
	capitalize = (e: string) => e[0].toUpperCase() + e.slice(1).toLowerCase(),
	forbidden = [
		"Accept-Charset",
		"Accept-Encoding",
		"Access-Control-Request-Headers",
		"Access-Control-Request-Method",
		"Connection",
		"Content-Length",
		"Cookie",
		"Cookie2",
		"Date",
		"DNT",
		"Expect",
		"Host",
		"Keep-Alive",
		"Origin",
		"Referer",
		"TE",
		"Trailer",
		"Transfer-Encoding",
		"Upgrade",
		"Via"
	],
	parseCurlToContext = (e: string) => {
		if (0 != e.indexOf("curl ")) throw Error("Missing curl keyword");
		let a = { method: "GET", headers: {} },
			r = "",
			t = "",
			s = "",
			o = "";
		rewrite(split(e)).forEach((e: string) => {
			switch (!0) {
				// @ts-ignore
				case !a.url && matchUrl.test(e):
					// @ts-ignore
					a.url = e;
					break;
				case "-A" == e || "--user-agent" == e:
					r = "user-agent";
					break;
				case "-H" == e || "--header" == e:
					r = "header";
					break;
				case "-F" == e || "--form" == e || "--form-data" == e:
					r = "form";
					break;
				case "--form-string" == e:
					r = "form-string";
					break;
				case "-d" == e || "--data" == e || "--data-ascii" == e || "--data-binary" == e:
					r = "data";
					break;
				case "--data-urlencode" == e:
					r = "url";
					break;
				case "-u" == e || "--user" == e:
					r = "user";
					break;
				case "-I" == e || "--head" == e:
					a.method = "HEAD";
					break;
				case "-X" == e || "--request" == e:
					r = "method";
					break;
				case "-b" == e || "--cookie" == e:
					r = "cookie";
					break;
				case "--compressed" == e:
					// @ts-ignore
					a.headers["Accept-Encoding"] || (a.headers["Accept-Encoding"] = "deflate, gzip");
					break;
				case !!e:
					switch (r) {
						case "header":
							let d = e.indexOf(":"),
								c = e.slice(0, d).split("-").map(capitalize).join("-");
							// @ts-ignore
							"Cookie" === c ? (a.credentials = "include") : (a.headers[c] = e.slice(d + 1).trim()),
								(r = "");
							break;
						case "user-agent":
							// @ts-ignore
							(a.headers["User-Agent"] = e), (r = "");
							break;
						case "url":
							(t = addArg(t, e)), (r = "");
							break;
						case "data":
						case "data-binary":
							// @ts-ignore
							a.headers["Content-Type"] ||
								// @ts-ignore
								(a.headers["Content-Type"] = "application/x-www-form-urlencoded"),
								// @ts-ignore
								(a.body = "data" === r ? addArg(a.body, e) : a.body),
								(r = "");
							break;
						case "form-string":
							o = e;
							break;
						case "form":
							// @ts-ignore
							a.headers["Content-Type"] || (a.headers["Content-Type"] = "multipart/form-data"),
								// @ts-ignore
								(a.formData || (a.formData = [])).push([
									e.slice(0, e.indexOf("=")),
									e.slice(e.indexOf("=") + 1)
								]);
							break;
						case "user":
							// @ts-ignore
							(a.headers.Authorization = "Basic " + btoa(e)), (r = "");
							break;
						case "method":
							(a.method = e), (r = "");
							break;
						case "cookie":
							// @ts-ignore
							(a.headers["Set-Cookie"] = e), (r = "");
					}
					break;
				default:
					s = e;
			}
		}),
			// @ts-ignore
			t && (a.url = a.url + (parseUrl(a.url).search ? "&" : "?") + t);
		// @ts-ignore
		let d = forbidden.filter(e => e in a.headers).map(e => (delete a.headers[e], e));
		if (d.length) {
			let c = d.length > 1 ? `${d.join(", ")} are forbidden headers` : `${d} is a forbidden header`;
			console.log(`${c} in fetch, so they are skipped (see https://fetch.spec.whatwg.org/#terminology-headers)`);
		}
		return (
			// @ts-ignore
			o && (a.headers["Content-Type"] += "; boundary=" + o),
			// @ts-ignore
			a.body && "get" === a.method.toLowerCase() && (a.method = "POST"),
			a
		);
	},
	parseCurlToFetch = (e: string): Request => {
		let a = parseCurlToContext(e);
		// @ts-ignore
		return new Request(a.url, a);
	};
// based by https://kigiri.github.io/fetch

export const parseCurlToRequest = (curl: string): Request => {
	return parseCurlToFetch(curl);
};
