import { Application, Router, oakCors, config } from "./deps.ts";

import Routes from "./src/api/routes/router.ts";

const { PORT, SSL_PATH } = config();
const port = parseInt(PORT);
const app = new Application();
const router = new Router();
let path = "";

if(Number.isNaN(port)){
	Deno.exit(1);
}

app.use( oakCors( { origin: "*" } ) );

router.use("/api/v1", Routes.routes(), Routes.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

if(SSL_PATH){
	path = SSL_PATH;
}

const certFile = `${path}certificate.cert`;
const keyFile = `${path}private.key`;


app.listen({
	port: port,
	certFile: certFile,
	keyFile: keyFile,
	}
);
