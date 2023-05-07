import PostsController from "controllers/posts";
import App from "src/app";
import request from "supertest";
import express from 'express';

describe("Test Posts Controller", () => {
    let server: express.Application;

    beforeAll(() => {
        server = new App([new PostsController()], 3000).getServer();
    });

    test('GET /posts without authentication', (done) => {
        request(server)
            .get("/api/posts")
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
});