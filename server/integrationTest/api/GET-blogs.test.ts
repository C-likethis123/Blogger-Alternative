import BlogsController from "controllers/blogs";
import * as checkAuthenticated from "middleware/authenticator";
import App from "src/app";
import request from "supertest";
import express, { Request, Response, NextFunction } from 'express';
import type { OAuth2Client } from 'google-auth-library';
import type { blogger_v3 } from "googleapis";

/*
A list of API tests relating to posts and blogs
*/

var mockOAuth2Client: jest.Mocked<OAuth2Client> = {
    setCredentials: jest.fn(),
    generateAuthUrl: jest.fn(),
    getToken: jest.fn(),
    refreshAccessToken: jest.fn(),
} as any as jest.Mocked<OAuth2Client>;

var mockedAuthenticator = (req: Request, res: Response, next: NextFunction) => {
    req.oauth2Client = mockOAuth2Client;
    return next();
};

jest.mock("middleware/authenticator", () => ({
    __esModule: true,
    default: jest.fn(),
}));

var mockBloggerClient = {
    blogs: {
        listByUser: jest.fn(),
    }
} as any as jest.Mocked<blogger_v3.Blogger>


jest.mock('googleapis', () => {
    return {
        google: {
            blogger: jest.fn((...args) => mockBloggerClient),
        },
    };
});

describe("Test Blogs Controller", () => {
    let server: express.Application;

    beforeAll(() => {
        server = new App([new BlogsController()], 3000).getServer();
    });

    test('GET /api/blogs returns books successfully', (done) => {
        const expectedBlogList = [{
            id: 1,
            status: "live",
            name: "Blog Post 1",
        }];
        (mockBloggerClient.blogs.listByUser as jest.Mock).mockReturnValue({ status: 200, data: { items: expectedBlogList } });
        jest.spyOn(checkAuthenticated, "default").mockImplementation(mockedAuthenticator);
        request(server)
            .get("/api/blogs")
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject(expectedBlogList);
                done();
            });
    })
});