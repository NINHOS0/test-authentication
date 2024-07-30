import { hash } from "bcrypt";

export async function hashData(data: any, saltRounds = 10) {
  try {
    const hashedData = await hash(data, saltRounds)
    return hashedData
  } catch (error) {
    return error
  }
}