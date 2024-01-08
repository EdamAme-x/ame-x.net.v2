import { ProjectConfig } from "@/data/config";

export function Fingerprint({ children, ip }: { children: React.ReactNode; ip: string }) {
	return <div id={"__ip__" + ip + " " + "__twitter__" + ProjectConfig.twitterId} className="contents">{children}</div>;
}
