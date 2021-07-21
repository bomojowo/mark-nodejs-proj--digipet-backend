import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for rehoming a digipet.
 *
 * It is intended to test three behaviours:
 *  1. rehoming a digipet leads to the need to rehatch a new digipet
 */

describe("When a user rehomes a digipet, it removes the current digipet", () => {
  beforeAll(() => {
    //setup: given an initial digipet
    const startingDigipet: Digipet = {
      happiness: 60,
      nutrition: 80,
      discipline: 30,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet/rehome informs them that digitpet has been rehomed", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).toMatch(/rehomed your digipet/i);
    expect(response.body.digipet).toStrictEqual(undefined);
  });

  test("1 GET /digipet/rehome informs them that new digipet needs rehatching", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).toMatch(/hatching a digipet first/i);
  });
});
