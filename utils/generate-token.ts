import crypto from "crypto";

/**
 * Generate a random token by the given length
 * @param bytesLength number
 * @default bytesLength 32
 * @returns string
 **/
export function createToken(bytesLength = 32): string {
	return crypto.randomBytes(bytesLength).toString("hex");
}
