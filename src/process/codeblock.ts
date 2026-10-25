import hljs from "highlight.js";

export function highlightCode(doc: Document) {
    const codes = doc.querySelectorAll("pre > code");
    for (const code of codes) {
        if (!code.textContent) continue;
        const lang = code.getAttribute("data-lang");
        const highlightedCode =
            lang && hljs.getLanguage(lang)
                ? hljs.highlight(code.textContent, { language: lang }).value
                : hljs.highlightAuto(code.textContent).value;
        code.classList.add("hljs");
        code.innerHTML = highlightedCode;
    }
}
