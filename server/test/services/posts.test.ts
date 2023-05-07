import PostService from "../../src/services/posts";

describe("Posts Service", () => {
    test('PostService.getPosts()', async() => {
        const posts = PostService.getPosts();
        expect(posts).toMatchObject([{
            title: 'Test',
            content: 'Test',
            _id: '1',
        }])
    });
});