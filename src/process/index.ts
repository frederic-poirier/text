import { parseHTML } from "linkedom";
import { redirectLink } from "./link";
import { highlightCode } from "./codeblock";
import { Defuddle } from "defuddle/node";

export type ProcessedPage = {
    url: string;
    title: string;
    html: string;
    description: string | null;
};

export async function processPage(url: string): Promise<ProcessedPage> {
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
