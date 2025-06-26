import { db } from "../db";
import { Table, Column, DataType, Model, AutoIncrement, AllowNull, PrimaryKey, CreatedAt } from "sequelize-typescript";


export interface sensorReadingInterface{
    rain_intensity: string,
    humidity: number,
    temperature: number
};

@Table({tableName: "sensor_readings", modelName: "SensorReading", timestamps: true})
export class SensorReading extends Model{
    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.INTEGER)
    reading_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    rain_intensity: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    humidity: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    temperature: number;

    @CreatedAt
    timestamp: Date;
};

db.addModels([SensorReading])