const TRACKING_PARAMS = [
    /^utm_/i,
    /^fbclid$/i,
    /^gclid$/i,
    /^gclsrc$/i,
    /^mc_cid$/i,
    /^mc_eid$/i,
    /^_ga$/i,
    /^ref$/i,
];
export function normalizePageUrl(input: string): string {
    const url = new URL(input); // throw si invalide
    url.hash = "";
    url.username = "";
    url.password = "";
    for (const key of url.searchParams.keys()) {
        if (TRACKING_PARAMS.some((p) => (p instanceof RegExp ? p.test(key) : p === key))) {
            url.searchParams.delete(key);
        }
    }
    // optionnel : ordre stable des query params
    url.searchParams.sort();
    // optionnel : trailing slash (sauf racine)
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
        url.pathname = url.pathname.slice(0, -1);
    }
    return url.href;
}
