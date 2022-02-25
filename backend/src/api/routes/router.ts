import { Router } from "https://deno.land/x/opine@2.1.1/mod.ts";
import InstagramRouter from "./instagram_router.ts";
import TiktokRouter from "./tiktok_router.ts";
import YoutubeRouter from "./youtube_router.ts";

const router = Router();

router.get("/", (_req, res) => {res.redirect("v1/instagram")}); //temp redirect
router.use("/instagram", InstagramRouter);
router.use("/tiktok", TiktokRouter);
router.use("/youtube", YoutubeRouter);

export default router;
