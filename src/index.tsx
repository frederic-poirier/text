import { Hono } from "hono";
import { raw } from "hono/html";
import { Home } from "./pages/home";
import { ArticlePage } from "./pages/article";
import { normalizePageUrl } from "./util/url";
import { createPage, getPage } from "./db/pages";
import { processPage } from "./process";

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
        if (cached) return c.render(<ArticlePage {...cached}>{raw(cached.html)}</ArticlePage>);

        const page = await processPage(url);
        await createPage(page);
        return c.render(<ArticlePage {...page}>{raw(page.html)}</ArticlePage>);
    } catch {
        return c.text("fail to get the page", 400);
    }
});
export default app;
