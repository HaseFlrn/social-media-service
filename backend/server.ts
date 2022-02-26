import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { Request } from "https://deno.land/x/request@1.3.2/mod.ts";
import Router from "./src/api/routes/router.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

const app = opine();
const port = parseInt(Deno.env.get("PORT") as string);

if(Number.isNaN(port)){
	Deno.exit(1);
}


app.use("/api/v1", Router);

// Spengler example
const pathToIndexHTMLFile = `${
	Deno.cwd().replace("backend", "frontend/index.html")
}`;

app.get("/", (_req, res) => {
	res.sendFile(pathToIndexHTMLFile); // consider providing the index.html via github pages as an alternative
});

app.get("/getISSPosition", async (_req, res) => {
	const { result } = await Request.get(
		"http://api.open-notify.org/iss-now.json",
	);

	res.send(`the ISS is above: ${JSON.stringify(result.iss_position)}`);
});

app.listen({
	port: port,
	// TODO: create SSL Files => https://serverfault.com/questions/224122/what-is-crt-and-key-files-and-how-to-generate-them
	certFile: "myCertFile.cert",
	keyFile: "myKeyFile.key",
	},
 	() => console.log(`server has started on http://localhost:${port} 🚀 \napi has started on http://localhost:${port}/api/v1`),
);
