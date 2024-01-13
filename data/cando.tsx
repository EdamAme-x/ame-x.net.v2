import { Button } from "@/components/ui/button";
import { ProjectConfig } from "./config";

export const candoList = [
    {
        title: "Create Website",
        description: <div>
            <p>I can create websites in <b className="mx-1">Deno</b> or <b className="mx-1">Node.js</b>.</p>
            <p>This site was created by combining <b className="mx-1">Next.js</b> with various frameworks.</p>
            <p>Of course, this is not the only one :)</p>
            <p>Please put next button.</p>
        </div>,
        button: <a href={`https://github.com/` + ProjectConfig.githubId} target="_blank"><Button>All projects</Button></a>
    }
]