"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const model_1 = require("../digipet/model");
const server_1 = __importDefault(require("../server"));
/**
 * This file has integration tests for rehoming a digipet.
 *
 * It is intended to test three behaviours:
 *  1. rehoming a digipet leads to the need to hatch a new digipet
 */
describe("When a user rehomes a digipet, it removes the current digipet", () => {
    beforeAll(() => {
        //setup: given an initial digipet
        const startingDigipet = {
            happiness: 60,
            nutrition: 80,
            discipline: 30,
        };
        model_1.setDigipet(startingDigipet);
    });
    test("GET /digipet/rehome informs them that digitpet has been rehomed", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/rehome");
        expect(response.body.message).toMatch(/rehomed your digipet/i);
        expect(response.body.digipet).toStrictEqual(undefined);
    }));
    test("1 GET /digipet/rehome informs them that new digipet needs hatching", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/rehome");
        expect(response.body.message).toMatch(/hatching a digipet first/i);
    }));
});
