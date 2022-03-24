import { Application, Router, oakCors, config } from "./deps.ts";

import Routes from "./src/api/routes/router.ts";

const { PORT } = config();
const port = parseInt(PORT);
const app = new Application();
const router = new Router();

if(Number.isNaN(port)){
	Deno.exit(1);
}

app.use( oakCors( { origin: "*" } ) );
router.use("/api/v1", Routes.routes(), Routes.allowedMethods());
app.use(router.routes());
app.use(router.allowedMethods());

const certFile = "myCertFile.cert";
const keyFile = "myKeyFile.key";


app.listen({
	port: port,
	certFile: certFile,
	keyFile: keyFile,
	}
);
