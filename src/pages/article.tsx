import type { PropsWithChildren } from "hono/jsx";
import { ArticleSource } from "../components/article-source";
import { Layout } from "../components/layout";

type ArticlePageProps = PropsWithChildren<{
    url: string;
    title: string;
    description: string | null;
}>;

export function ArticlePage({ url, title, children }: ArticlePageProps) {
    return (
        <Layout>
            <ArticleSource url={url} title={title} />
            {children}
        </Layout>
    );
}
