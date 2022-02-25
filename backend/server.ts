import { opine } from "https://deno.land/x/opine@2.1.1/mod.ts";
import { Request } from "https://deno.land/x/request@1.3.2/mod.ts";
import Router from "./src/api/routes/router.ts";

const app = opine();
const port = 3000;

app.use("/api/v1", Router);

// Spengler example
const pathToIndexHTMLFile = `${
	Deno.cwd().replace("backend", "frontend/index.html")
}`;

app.get("/", function (_req, res) {
	res.sendFile(pathToIndexHTMLFile); // consider providing the index.html via github pages as an alternative
});

app.get("/getISSPosition", async function (_req, res) {
	const { result } = await Request.get(
		"http://api.open-notify.org/iss-now.json",
	);

	res.send(`the ISS is above: ${JSON.stringify(result.iss_position)}`);
});

app.listen(
	port,
	() => console.log(`server has started on http://localhost:${port} 🚀`),
);
