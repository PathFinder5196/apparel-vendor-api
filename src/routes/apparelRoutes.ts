import { Router } from "express";
import { ApparelController } from "../controllers/apparelController";

const router = Router();
const controller = new ApparelController();

router.get("/", controller.getAllApparel);
router.put("/stock", controller.updateSingleStock);
router.put("/stock/bulk", controller.updateBulkStock);
router.post("/order/check", controller.checkOrderFulfillment);
router.post("/order/cost", controller.calculateLowestCost);

export default router;
