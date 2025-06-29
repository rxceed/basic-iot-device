import { createSensorReadingTable, deleteSensorReadingAll, deleteSensorReadingByID, getAllSensorReading, insertSensorReading } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/table_setup", createSensorReadingTable);
router.route("/").get(getAllSensorReading).post(insertSensorReading);
router.route("/delete/:id").delete(deleteSensorReadingByID);
router.delete("/purge", deleteSensorReadingAll);

export default router;