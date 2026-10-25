import { env } from "cloudflare:workers";
import { ProcessedPage } from "..";

type PageListRow = Omit<PageRow, "html">;
type PageRow = {
    url: string;
    html: string;
    title: string;
    description: string | null;
    read_at: string;
};

export async function listPages(): Promise<PageListRow[]> {
    const { results } = await env.DB.prepare(
        "SELECT url, title, description, read_at FROM Pages",
    ).all<PageListRow>();
    return results;
}

export async function getPage(url: string): Promise<PageRow | null> {
    console.log("finding: " + url);
    return env.DB.prepare(
        `UPDATE Pages
       SET read_at = CURRENT_TIMESTAMP
       WHERE url = ?
       RETURNING *`,
    )
        .bind(url)
        .first<PageRow>();
}

export async function createPage(page: ProcessedPage): Promise<PageRow | null> {
    return env.DB.prepare(
        `INSERT INTO Pages (url, title, html, description) 
        VALUES (?, ?, ?, ?) 
        ON CONFLICT DO NOTHING 
        RETURNING *`,
    )
        .bind(page.url, page.title, page.html, page.description)
        .first<PageRow>();
}
