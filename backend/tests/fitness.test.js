const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Fitness = require("../models/fitnessModel");
const fitness = [
  {
    "title": "Morning Run",
    "date": "2024-03-08T06:00:00.000Z",
    "duration": 30,
    "caloriesBurned": 200
  },
  {
    "title": "Evening Run",
    "date": "2024-03-08T06:00:00.000Z",
    "duration": 30,
    "caloriesBurned": 200
  }
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/users/signup")
    .send({ email: "test@example.com", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("Given there are initially some fitness saved", () => {
  beforeEach(async () => {
    await Fitness.deleteMany({});
    await api
      .post("/api/fitness")
      .set("Authorization", "bearer " + token)
      .send(fitness[0])
      .send(fitness[1]);
  });

  it("should return all fitness as JSON when GET /api/fitness is called", async () => {
    await api
      .get("/api/fitness")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one fitness when POST /api/fitness is called", async () => {
    const newFitness = {
      title: "testtitle",
      date: "testdate",
      duration: 10,
      caloriesBurned: 500,
    };
    await api
      .post("/api/fitness")
      .set("Authorization", "bearer " + token)
      .send(newFitness)
      .expect(201);
  });
  
  it("should return one fitness by ID when GET /api/fitness/:id is called", async () =>  {
    const fitness = await Fitness.findOne();
    await api
      .get("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should update one fitness by ID when PUT /api/fitness/:id is called", async () => {
    const fitness = await Fitness.findOne();
    const updatedFitness = {
      title: "testtitle",
      date: "testdate",
      duration: 10,
      caloriesBurned: 500,
    };
    await api
      .put("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .send(updatedFitness)
      .expect(200);
    const updatedFitnessCheck = await Fitness.findById(fitness._id);
    expect(updatedFitnessCheck.toJSON()).toEqual(expect.objectContaining(updatedFitness));
  });

  it("should delete one fitness by ID when DELETE /api/fitness/:id is called", async () => {
    const fitness = await Fitness.findOne();
    await api
      .delete("/api/fitness/" + fitness._id)
      .set("Authorization", "bearer " + token)
      .expect(200);
    const fitnessCheck = await Fitness.findById(fitness._id);
    expect(fitnessCheck).toBeNull();
  });
 
});

afterAll(() => {
  mongoose.connection.close();
});