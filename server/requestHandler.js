import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from "../src/App";
import buildPath from '../build/asset-manifest.json';

function handleRender(req, res, next) {
    if (req.url.startsWith('/static/') || req.url.startsWith('/assets/')) {
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
                    <title>Steedos Report</title>
                    <link rel="stylesheet" type="text/css" href="${buildPath.files["main.css"]}">
                    <link href="/assets/stimulsoft-report/css/stimulsoft.viewer.office2013.whiteblue.css" rel="stylesheet">
                    <link href="/assets/stimulsoft-report/css/stimulsoft.designer.office2013.whiteblue.css" rel="stylesheet">
                    <script src="/assets/stimulsoft-report/js/stimulsoft.reports.js" type="text/javascript"></script>
                    <script src="/assets/stimulsoft-report/js/stimulsoft.dashboards.js" type="text/javascript"></script>
                    <script src="/assets/stimulsoft-report/js/stimulsoft.viewer.js" type="text/javascript"></script>
                    <script src="/assets/stimulsoft-report/js/stimulsoft.designer.js" type="text/javascript"></script>
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

