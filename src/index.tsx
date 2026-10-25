import { Hono } from "hono";
import { raw } from "hono/html";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { parseHTML } from "linkedom";
import { Defuddle } from "defuddle/node";
import { redirectLink } from "./process/link";
import { highlightCode } from "./process/codeblock";

const app = new Hono();

app.get("/", (c) => {
    return c.render(<Home />);
});

app.post("/fetch", async (c) => {
    const body = await c.req.formData();
    const url = body.get("url");
    return c.redirect(`/f/${url}`);
});

app.get("/f/*", async (c) => {
    const url = c.req.path.replace("/f/", "");
    const response = await fetch(url);
    if (!response.ok) return c.text("fail to fetch the url", 400);

    const html = await response.text();
    const { document } = parseHTML(html);

    const result = await Defuddle(document, url);

    const { document: cleaned } = parseHTML(`<html><body>${result.content}</body></html>`);
    redirectLink(url, cleaned);
    highlightCode(cleaned);

    return c.render(<Layout>{raw(cleaned.body.innerHTML)}</Layout>);
});

export default app;
