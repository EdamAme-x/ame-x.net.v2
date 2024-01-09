import type { Article } from "@/backend/controller/zenn/getArticles";

export function ZennPopup(
    {
        getArticle,
        closeCallback
    }: {
        getArticle: () => Promise<Article>,
        closeCallback: Function
    }
) {} // logic promise async

export function ZennPopupFallback() {
    return <></>
} // skelton :thinking:

export async function ZennPopupContent({
    article,
    getArticle
}: {
    article: Article,
    getArticle: () => Promise<Article>
}) {
    const result = await getArticle();

    return <>{result.id}</>
} // ui