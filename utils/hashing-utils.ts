import crypto from "crypto";

const SALT_LENGTH = 16; // 128 bits
const HASH_ALGO = "sha512";
const ITERATIONS = 100_000;
const KEY_LENGTH = 64; // 512 bits

/**
 * Hash the given password to make it secure for saving
 * @param password string
 * @returns object includes salt and hashed password
 * */
export function hashPassword(password: string): { salt: string; hash: string } {
	const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, HASH_ALGO)
		.toString("hex");
	return { salt, hash };
}

/**
 * Verifies new password that user is trying to set is not being reused
 * @param password - new password
 * @param old_salt - old password salt
 * @param old_hash - old hashed password
 * @returns -`true` if old password is reused
 * @security Uses `crypto.timingSafeEqual` to prevent timing attacks during hash comparison.
 */
export function checkNewPassword(
	password: string,
	old_hash: string,
	old_salt: string,
) {
	const hash = crypto
		.pbkdf2Sync(password, old_salt, ITERATIONS, KEY_LENGTH, HASH_ALGO)
		.toString("hex");
	return crypto.timingSafeEqual(
		Uint8Array.from(Buffer.from(hash, "hex")),
		Uint8Array.from(Buffer.from(old_hash, "hex")),
	);
}

/**
 * Verifies whether a plain text password matches a previously hashed password using PBKDF2.
 *
 * This function uses the same salt and hashing algorithm parameters that were used
 * during the original password hash generation. It securely compares the derived hash
 * of the provided password to the stored hash using a timing-safe comparison method.
 *
 * @param password - The plain text password input to verify (e.g., from a login form).
 * @param salt - The salt used when the original password was hashed. Must be the same as used during registration.
 * @param storedHash - The hexadecimal string of the hashed password stored in the database.
 *
 * @returns `true` if the password is valid (i.e., hashes match), `false` otherwise.
 *
 * @security Uses `crypto.timingSafeEqual` to prevent timing attacks during hash comparison.
 */
export function verifyPassword(
	password: string,
	salt: string,
	storedHash: string,
): boolean {
	const derivedHash = crypto
		.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, HASH_ALGO)
		.toString("hex");
	const storedBuffer = Buffer.from(storedHash, "hex");
	const derivedBuffer = Buffer.from(derivedHash, "hex");
	if (storedBuffer.length !== derivedBuffer.length) {
		return false;
	}

	return crypto.timingSafeEqual(
		Uint8Array.from(storedBuffer),
		Uint8Array.from(derivedBuffer),
	);
}
