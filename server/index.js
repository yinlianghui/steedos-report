import path from 'path';
import express from 'express';
import requestHandler from './requestHandler';

const app = express();
const port = 3200;

// app.get('/dist/main.css', function (req, res) {
//   res.sendFile(path.join(__dirname, '/public/main.css'))
// });
app.use(requestHandler);

app.use('/', express.static(path.resolve('build')))

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
    }
});


