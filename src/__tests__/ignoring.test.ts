import { start } from "repl";
import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server"

/**
 * This file has integration tests for ignoring a digipet.
 *
 * It is intended to test three behaviours:
 *  1. ignoring a digipet leads to decreasing discipline
 *  2. ignoring a digipet leads to decreasing happiness
 *  3. ignoring a digipet leads to decreasing nutrition
 */

describe("When a user ignores a digipet repeatedly, its dicipline decreases by 10 each time until it floors out at 0", () =>{
    beforeAll(() => {
        //setup: given an intial digipet
        const startingDigipet: Digipet = {
            happiness: 60,
            nutrition: 80,
            discipline: 30,
        }
        setDigipet(startingDigipet)
    });

    test("GET /digipet/ignore them that they have a digipet with expected stats", async () => {
        const response = await supertest(app).get("/digipet")
        expect(response.body.message).toMatch(/your digipet/i);
        expect(response.body.digipet).toHaveProperty("discipline", 30);
    })

    test("1st GET /digipet/ignore informs them about the ignore and shows decrease discipline", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("discipline", 20);
    })
    test("2nd GET /digipet/ignore informs them about the ignore and shows decrease discipline", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("discipline", 10);
    })
    test("3rd GET /digipet/ignore informs them about the ignore and shows decrease discipline", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("discipline", 0);
    })
    test("4th GET /digipet/ignore informs them about the ignore and shows decrease discipline", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("discipline", 0);
    })
})

describe("When a user ignores a digipet repeatedly, its happiness decreases by 10 each time until it floors out at 0", () =>{
    beforeAll(() => {
        //setup: given an intial digipet
        const startingDigipet: Digipet = {
            happiness: 25,
            nutrition: 80,
            discipline: 50,
        }
        setDigipet(startingDigipet)
    });

    test("GET /digipet/ignore them that they have a digipet with expected stats", async () => {
        const response = await supertest(app).get("/digipet")
        expect(response.body.message).toMatch(/your digipet/i);
        expect(response.body.digipet).toHaveProperty("happiness", 25);
    })

    test("1st GET /digipet/ignore informs them about the ignore and shows decrease happiness", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 15);
    })
    test("2nd GET /digipet/ignore informs them about the ignore and shows decrease happiness", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 5);
    })
    test("3rd GET /digipet/ignore informs them about the ignore and shows decrease happiness", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 0);
    })
    test("4th GET /digipet/ignore informs them about the ignore and shows decrease happiness", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("happiness", 0);
    })
})

describe("When a user ignores a digipet repeatedly, its nutrition decreases by 10 each time until it floors out at 0", () =>{
    beforeAll(() => {
        //setup: given an intial digipet
        const startingDigipet: Digipet = {
            happiness: 25,
            nutrition: 33,
            discipline: 50,
        }
        setDigipet(startingDigipet)
    });

    test("GET /digipet/ignore them that they have a digipet with expected stats", async () => {
        const response = await supertest(app).get("/digipet")
        expect(response.body.message).toMatch(/your digipet/i);
        expect(response.body.digipet).toHaveProperty("nutrition", 33);
    })

    test("1st GET /digipet/ignore informs them about the ignore and shows decrease nutrition", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("nutrition", 23);
    })
    test("2nd GET /digipet/ignore informs them about the ignore and shows decrease nutrition", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("nutrition", 13);
    })
    test("3rd GET /digipet/ignore informs them about the ignore and shows decrease nutrition", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("nutrition", 3);
    })
    test("4th GET /digipet/ignore informs them about the ignore and shows decrease nutrition", async () => {
        const response = await supertest(app).get("/digipet/ignore");
        expect(response.body.digipet).toHaveProperty("nutrition", 0);
    })
})