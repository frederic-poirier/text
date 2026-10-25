export function redirectLink(baseUrl: string, doc: Document) {
    const anchors = doc.querySelectorAll("a");
    for (const a of anchors) {
        const href = a.getAttribute("href");
        if (!href || href.startsWith("#")) continue;
        const targetUrl = new URL(href, baseUrl).href;
        a.setAttribute("href", `/f/${targetUrl}`);
    }
}
