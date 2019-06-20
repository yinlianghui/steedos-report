import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from "../src/App";
import buildPath from '../build/asset-manifest.json';

function handleRender(req, res, next) {
    if (req.url.startsWith('/static/')) {
        return next()
    }
    const context = {};
    const frontComponents = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        const frontHtml = `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                    <meta name="theme-color" content="#000000">
                    <title>StartRoute</title>
                    <link rel="stylesheet" type="text/css" href="${buildPath.files["main.css"]}">
                </head>
                <body>
                    <noscript>
                    You need to enable JavaScript to run this app.
                    </noscript>
                    <div id="root">${frontComponents}</div>
                    <script src="${buildPath.files['main.js']}"></script>
                </body>
            </html>`

        res.write(frontHtml);
        res.end();
    }
}
module.exports = handleRender;

