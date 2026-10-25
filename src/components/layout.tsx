import type { PropsWithChildren } from "hono/jsx";

export function Layout(props: PropsWithChildren) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="/highlight.css" />
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <main>{props.children}</main>
            </body>
        </html>
    );
}
