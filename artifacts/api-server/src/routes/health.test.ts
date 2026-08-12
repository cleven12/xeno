import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../app";

describe("GET /api/healthz", () => {
  it("returns ok status", async () => {
    const response = await request(app).get("/api/healthz");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
