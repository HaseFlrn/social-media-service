import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";

const router = Router();

router
.get("/", (_req, res) => {
	res.send("Greetings General Kenobi!");
})
//.get("/PATH", (req,res) => {function})

export default router;