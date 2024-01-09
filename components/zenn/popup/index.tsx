import type { Article } from "@/backend/controller/zenn/getArticles";

export function ZennPopup(
    {
        article,
        closeCallback
    }: {
        article: Article,
        closeCallback: Function
    }
) {}
