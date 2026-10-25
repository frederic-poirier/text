type ArticleSourceProps = {
    url: string;
    title: string;
};

function displayUrl(url: string) {
    return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function ArticleSource({ url, title }: ArticleSourceProps) {
    return (
        <a class="article-source" href={url}>
            <span class="article-source-icon" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            </span>
            <span class="article-source-text">
                <span class="article-source-title">{title}</span>
                <span class="article-source-url">{displayUrl(url)}</span>
            </span>
        </a>
    );
}
