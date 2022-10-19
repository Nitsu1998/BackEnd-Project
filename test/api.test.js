import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { expect } from "chai";
faker.locale = "es";

let request;
let productIdToDelete;

function generateUser() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: Number(faker.phone.number()),
  };
}

describe("API-REST test", () => {
  before(() => {
    request = supertest.agent("http://localhost:8080");
  });

  describe("- POST /register", () => {
    it("Should return status code 201", async () => {
      const userToRegister = generateUser();
      const response = await request.post("/register").send(userToRegister);
      expect(response.status).to.eql(201);
    });
  });

  describe("- GET /api/products", () => {
    it("Should return status code 200", async () => {
      const response = await request.get("/api/products");
      expect(response.status).to.eql(200);
    });

    it("Should return an array of products", async () => {
      const response = await request.get("/api/products");
      productIdToDelete = response._body[1]._id;
      expect(response._body[0]).to.eql({
        _id: "62dc666277529c61b78314ad",
        title: "Dead by Daylight",
        description: "Horror game multiplayer",
        code: "#u1s4sfye",
        url: "https://i.blogs.es/49d0b4/270520-dead-daylight-preview/1366_2000.jpeg",
        price: 65,
        stock: 50,
        timestamp: 1658611271622,
      });
    });
  });

  describe("- DELETE /api/products", () => {
    it("Should return status code 200", async () => {
      const response = await request.delete(
        `/api/products/${productIdToDelete}`
      );
      expect(response.status).to.eql(200);
    });
  });

  describe("- POST /api/products", () => {
    it("Should return status code 201", async () => {
      const response = await request.post("/api/products").send({
        title: "Elden Ring",
        description: "RPG adventure game",
        url: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
        price: 98,
        stock: 50,
      });
      expect(response.status).to.eql(201);
    });
  });
});
