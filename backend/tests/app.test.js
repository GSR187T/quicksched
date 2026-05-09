const request = require("supertest");
const app = require("../server");

describe("QuickSched API Tests", () => {
  test("book appointment success", async () => {
    const res = await request(app)
      .post("/book")
      .send({ patient: "P1", time: "10AM" });

    expect(res.statusCode).toBe(200);
  });

  test("cancel appointment", async () => {
    await request(app).post("/book").send({ patient: "P2", time: "11AM" });

    const res = await request(app)
      .post("/cancel")
      .send({ patient: "P2", time: "11AM" });

    expect(res.statusCode).toBe(200);
  });

  test("prevent duplicate booking", async () => {
    await request(app).post("/book").send({ patient: "P3", time: "12PM" });

    const res = await request(app)
      .post("/book")
      .send({ patient: "P3", time: "12PM" });

    expect(res.statusCode).toBe(400);
  });

  test("capacity limit reached", async () => {
    for (let i = 1; i <= 5; i++) {
      await request(app)
        .post("/book")
        .send({ patient: `P${i}`, time: "10AM" });
    }

    const res = await request(app)
      .post("/book")
      .send({ patient: "P6", time: "10AM" });

    expect(res.statusCode).toBe(400);
  });

  test("invalid cancel request", async () => {
    const res = await request(app)
      .post("/cancel")
      .send({ patient: "Fake", time: "9AM" });

    expect(res.statusCode).toBe(400);
  });

  test("create booking different time slots", async () => {
    const res = await request(app)
      .post("/book")
      .send({ patient: "P7", time: "1PM" });

    expect(res.statusCode).toBe(200);
  });

  test("empty request should fail", async () => {
    const res = await request(app).post("/book").send({});

    expect(res.statusCode).toBe(400);
  });

  test("server responds to valid request", async () => {
    const res = await request(app)
      .post("/book")
      .send({ patient: "P8", time: "2PM" });

    expect(res.statusCode).toBe(200);
  });
});
