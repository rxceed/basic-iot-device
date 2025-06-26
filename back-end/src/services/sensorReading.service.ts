import { db } from "../db";
import { SensorReading, sensorReadingInterface } from "../models/sensorReading.model";

export const createSensorReadingTableService = async ()=>{
    try 
    {
        const result = await SensorReading.sync({force: false, logging: console.log});
        if(!result) throw Error("Failed to create table");
        console.log("Created sensor_readings table");
        return result;
    } 
    catch(err) 
    {
        console.error("Error occured: ", err);
        return;
    }
};

export const getAllSensorReadingService = async ()=>{
    try
    {
        const result = await SensorReading.findAll();
        throw new Error("Failed to get sensor readings");
        return result;
    }
    catch(err)
    {
        console.error("Error occured: ", err);
        return;
    }
};

export const insertSensorReadingService = async (data: sensorReadingInterface)=>{
    try
    {
        const sensor = SensorReading.build({data});
        const result = await sensor.save();
        return result;
    }
    catch(err)
    {
        console.error("Error occured: ", err);
        return;
    }
};

export const updateSensorReadingService = async (id: number, data: sensorReadingInterface)=>{
    try
    {
        const result = await SensorReading.update({data}, {
            where:{
                reading_id: id
            }
        })
    }
    catch(err)
    {
        console.error("Error occured: ", err);
        return;
    }
};

export const deleteSensorReadingByIDService = async (id: number)=>{
    try
    {
        const result = await SensorReading.destroy({
            where:{
                reading_id: id
            }
        })
        return result;
    }
    catch(err)
    {
        console.error("Error occured: ", err);
        return;
    }
};