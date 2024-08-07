import z from "zod"


const envSchema = z.object({
    JWT_KEY: z.string(),
    DATABASE_URL: z.string()
})

const env = envSchema.parse(process.env)

export default env