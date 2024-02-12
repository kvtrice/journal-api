import app from "./app.js";
import request from "supertest";

describe("App test", () => {
	// Description of what's being tested:
	test("GET /", async () => {
		// Details of the test:
		const response = await request(app).get("/");
		expect(response.statusCode).toBe(200);
		expect(response.header["content-type"]).toContain("application/json");
		expect(response.body.info).toBeDefined();
		expect(response.body.info).toBe("Journal API");
	});

	describe("POST /entries", () => {
		let cats, response

		beforeAll(async () => {
			// Get the categories first
			cats = await request(app).get("/categories");
			// Use the id of the first category
			response = await request(app).post("/entries").send({
				category: cats.body[0]._id,
				content: "Jest test content",
			});
		});

		test("Returns JSON with 201 status", () => {
			expect(response.status).toBe(201)
			expect(response.header["content-type"]).toContain("json")
			expect(response.body._id).toBeDefined()
		});

		test("Entries have correct fields populated", () => {
			expect(response.body.category).toBeDefined()
			expect(response.body.content).toBeDefined()
			expect(response.body._id).toBeDefined()
		});

		test("Entries is an object and entry category is correctly populated", () => {
			expect(response.body.category).toBeInstanceOf(Object)
			expect(response.body.category._id).toBeDefined()
			expect(response.body.category.name).toBeDefined()
		});

		test("Expected category content associated with the new entry", () => {
			// Expect the content + category ID (on the entries object) to be the same id as the one we sent in at the start
			expect(response.body.category._id).toBe(cats.body[0]._id)
			expect(response.body.content).toBe("Jest test content")
		});

		// Clean up the created entry
		afterAll(() => {
			request(app).delete(`/entries/${response.body._id}`)
		});
	});

	describe("GET /categories", () => {
		let response;
		beforeEach(async () => {
			response = await request(app).get("/categories");
		});

		test("Returns JSON content", () => {
			expect(response.status).toBe(200);
			expect(response.header["content-type"]).toContain("json");
		});

		test("Returns an array", () => {
			expect(response.body).toBeInstanceOf(Array);
		});

		test("Array has 4 elements", () => {
			expect(response.body).toHaveLength(4);
			expect(response.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ name: "Food" }),
				])
			);
			expect(response.body[0].name).toContain("Gaming");
		});

		test("Array ellemnts return expected categories of Gaming and Food", () => {
			expect(response.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({ name: "Food" }),
				])
			);
			expect(response.body[0].name).toContain("Gaming");
		});
	});
});
