import server from "../index.js";
import app from "../app.js";
import request from "supertest";

const testUser = {
  username: "henderson.briggs@geeknet.net",
  password: "23derd*334",
};

const invalidUser = {
  username: "henderson.briggs@geeknet.net",
  password: "23derd*33444",
};

describe("POST /login/password", () => {
  it("should fail with incorrect credentials", async () => {
    const res = await request(app).post("/login/password").send(invalidUser);

    expect(res.headers.location).toEqual("/login");
  });

  it("should succeed with correct credentials", async () => {
    const res = await request(app).post("/login/password").send(testUser);

    expect(res.headers.location).toEqual("/");
  });

  it("should logout successfully", async () => {
    const res = await request(app).post("/logout");

    expect(res.headers.location).toEqual("/login");
  });
});

server.close();
