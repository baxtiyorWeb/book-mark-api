import request from "supertest";
import { describe, expect, it } from "vitest";

import { app } from "../../app";

describe("Auth Endpoints", () => {
	it("POST /register should send mail to given mail", async () => {
		const response = await request(app)
			.post("/api/auth/register")
			.send({ email: "abduvohidxolmuminov900@gmail.com" });

		expect(response.status).toBe(200);
		expect(response.body.status).toBe("success");
		expect(response.body.data.message).toBe("");
	});
});
