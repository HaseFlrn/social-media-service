import { Application, Router, oakCors, config } from "./deps.ts";

import Routes from "./src/api/routes/router.ts";
import MockRoutes from "./src/api/routes/mockRouter.ts";

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
router.use("/api/v2", MockRoutes.routes(), MockRoutes.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

if(SSL_PATH){
	path = SSL_PATH;
}

const certFile = `${path}certificate.crt`;
const keyFile = `${path}private.key`;


app.listen({
	port: port,
	certFile: certFile,
	keyFile: keyFile,
	}
);
