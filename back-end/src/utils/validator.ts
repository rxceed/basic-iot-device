import joi from "joi"

export const sensorReadingSchema = joi.object({
    rain_intensity: joi.string().required(),
    humidity: joi.number().required(),
    temperature: joi.number().required()
})