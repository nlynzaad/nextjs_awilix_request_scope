import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import diService from '@/di';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	createServer((req, res) => {
		const parsedUrl = parse(req.url!, true);
		diService.createRequestScope(() => handle(req, res, parsedUrl).then(diService.disposeRequestScope, diService.disposeRequestScope));
	}).listen(port);

	console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
