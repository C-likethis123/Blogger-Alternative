import PostsController from "../../src/controllers/posts";
import App from "../../src/app";
import request from "supertest";
import express, { Request, Response, NextFunction } from 'express';

// stubs authentication
jest.mock("../../src/middleware/authenticator", () => ({
    __esModule: true,
    default: jest.fn((req: Request, res: Response, next: NextFunction) => {
        return next();
    }),
}))

describe("Test Posts Controller", () => {
    let server: express.Application;

    beforeAll(() => {
        server = new App([new PostsController()], 3000).getServer();
    });

    test('GET /posts with authentication', (done) => {
        request(server)
            .get("/api/posts")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject([{
                    title: 'Test',
                    content: 'Test',
                    _id: "1",
                }]);
                done();
            })
    })
});