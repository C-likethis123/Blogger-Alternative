import PostsController from "../../src/controllers/posts";
import App from "../../src/app";
import request from "supertest";
import express, { Request, Response, NextFunction } from 'express';

/*
A list of API tests relating to posts and blogs
*/

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
    });

    test('GET /api/blogs with authentication', (done) => {
        const expectedBlogList = [{
            id: 1,
            status: "live",
            name: "Blog Post 1",
        }];
        request(server)
            .get("/api/blogs")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(expectedBlogList);
                done();
            })
    })
});