import { compare } from "bcrypt";

export async function validate(data: any, hashData: any) {
  try {
    const isValid = await compare(data, hashData)
    return isValid
  } catch (error) {
    return error
  }
}