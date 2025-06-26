import express from "express";
import sensorReadingRoutes from "./sensorReading.route"

const router = express.Router();

router.use("/api/sensor_reading", sensorReadingRoutes);

export default router;