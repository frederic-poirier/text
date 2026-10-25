import { Hono } from "hono";
import { raw } from "hono/html";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { parseHTML } from "linkedom";
import { Defuddle } from "defuddle/node";
import { redirectLink } from "./process/link";
import { highlightCode } from "./process/codeblock";
import { normalizePageUrl } from "./util/url";
import { createPage, getPage } from "./db/pages";

const app = new Hono();

app.get("/", (c) => c.render(<Home />));

app.post("/fetch", async (c) => {
    const url = (await c.req.formData()).get("url");
    return c.redirect(`/f/${url}`);
});

app.get("/f/*", async (c) => {
    try {
        const url = normalizePageUrl(c.req.path.slice("/f/".length));
        const cached = await getPage(url);
        if (cached) return c.render(<Layout>{raw(cached.html)}</Layout>);

        const page = await processPage(url);
        await createPage(page);
        return c.render(<Layout>{raw(page.html)}</Layout>);
    } catch {
        return c.text("fail to get the page", 400);
    }
});

export type ProcessedPage = {
    url: string;
    title: string;
    html: string;
    description: string | null;
};

async function processPage(url: string): Promise<ProcessedPage> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("failed to fetch the page");

    const html = await response.text();
    const { document } = parseHTML(html);
    const result = await Defuddle(document, url);
    const { document: cleaned } = parseHTML(`<html><body>${result.content}</body></html>`);

    redirectLink(url, cleaned);
    highlightCode(cleaned);

    return {
        url,
        title: result.title,
        description: result.description,
        html: cleaned.body.innerHTML,
    };
}

export default app;
