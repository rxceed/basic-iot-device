import { createSensorReadingTable, getAllSensorReading, insertSensorReading } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/table_setup", createSensorReadingTable);
router.route("/").get(getAllSensorReading).post(insertSensorReading);

export default router;