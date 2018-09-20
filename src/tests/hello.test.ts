import request from "supertest"
import app from "../app"

describe("/ hello url", () => {
    it("should return 200 OK", () => {
        return request(app).get('/').expect(200)
    })
})