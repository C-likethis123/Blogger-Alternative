import type { blogger_v3 } from "googleapis";
import type { OAuth2Client } from 'google-auth-library';
import PostsService from "services/posts";

var mockOAuth2Client: jest.Mocked<OAuth2Client> = {
    setCredentials: jest.fn(),
    generateAuthUrl: jest.fn(),
    getToken: jest.fn(),
    refreshAccessToken: jest.fn(),
} as any as jest.Mocked<OAuth2Client>;

var mockBloggerClient = {
    posts: {
        list: jest.fn(),
        get: jest.fn(),
        insert: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    }
} as any as jest.Mocked<blogger_v3.Blogger>

jest.mock('google-auth-library', () => {
    return {
        GoogleAuth: jest.fn().mockImplementation(() => {
            return {
                getClient: () => {
                    return mockOAuth2Client;
                },
            };
        }),
    };
});

jest.mock('googleapis', () => {
    return {
        google: {
            blogger: jest.fn((...args) => mockBloggerClient),
        },
    };
});

let service: PostsService;
beforeEach(() => {
    service = new PostsService(mockOAuth2Client);
});
describe("Posts Service", () => {
    test('getBlogs() returns a list of blogs', async () => {
        const expectedBlogList = [{
            id: '112',
            blog: {
                id: '1',
            },
            status: 'LIVE',
            title: 'Post 1',
        },
        {
            id: '113',
            blog: {
                id: '1',
            },
            status: 'LIVE',
            title: 'Post 2',
        }];
        (mockBloggerClient.posts.list as jest.Mock).mockReturnValue({status: 200, data: {items:expectedBlogList}});
        const blogs = await service.getPosts('1');
        expect(blogs).toMatchObject(expectedBlogList);
    })

    test('getPosts() returns an error if the blogger client returns an error', async () => {
        (mockBloggerClient.posts.list as jest.Mock).mockReturnValue({status: 400, statusText: "Posts not found"});
        await expect(service.getPosts('1')).rejects.toThrow("Posts not found");
    })

    test('getPost() retrieves a single blog post', async () => {
        const expectedPost = {
            id: '112',
            blog: {
                id: '1',
            },
            status: 'LIVE',
            title: 'Post 1',
        };
        (mockBloggerClient.posts.get as jest.Mock).mockReturnValue({status: 200, data: expectedPost});
        const blogs = await service.getPost('1', '112');
        expect(blogs).toMatchObject(expectedPost);
    })

    test('insertPost() adds a new blog post', async () => {
        const expectedPost = {
            id: '112',
            blog: {
                id: '1',
            },
            title: 'Test'
        };
        (mockBloggerClient.posts.insert as jest.Mock).mockReturnValue({status: 200, data: expectedPost});
        const blogs = await service.insertPost('1', {title: 'Test'});
        expect(blogs).toMatchObject(expectedPost);
    })
});

afterEach(() => {
    jest.clearAllMocks();
})