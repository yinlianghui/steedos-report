import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import App from "../src/App";
import buildPath from '../build/asset-manifest.json';
import routes from '../src/routes';
import { matchRoutes } from 'react-router-config';

export default async (req, res, next) => {
    if (req.url.startsWith('/static/') || req.url.startsWith('/assets/') || req.url.startsWith('/favicon.ico')) {
        return next()
    }

    const loadBranchData = async (location) => {
        const branch = matchRoutes(routes, location);
        const promises = branch.map(({ route, match }) => {
            return route.loadData
                ? route.loadData(match)
                : Promise.resolve(null);
        });
        return await Promise.all(promises).then();
    }
    // useful on the server for preloading data
    let data = await loadBranchData(req.url);

    const context = { data };
    const frontComponents = renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );
    if (context.status === 404) {
        res.status(404);
    }
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

