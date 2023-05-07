import PostsService from "../../src/services/posts";
import App from "../../src/app";
import request from "supertest";
import express, { Request, Response, NextFunction } from 'express';

describe("Posts Service", () => {
    let service: express.Application;

    beforeEach(() => {
        service = new PostsService()
    });

    test('postService.getAllBlogs', async() => {

    });
});