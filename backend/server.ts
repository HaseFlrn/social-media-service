import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";
import Router from "./src/api/routes/router.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const app = opine();
const port = parseInt(Deno.env.get("PORT") as string);

if(Number.isNaN(port)){
	Deno.exit(1);
}

app.use("/api/v1", Router);

app.listen({
	port: port,
	certFile: "myCertFile.cert",
	keyFile: "myKeyFile.key",
	},
 	() => console.log(`server has started on https://localhost:${port} 🚀 \napi has started on https://localhost:${port}/api/v1`),
);
