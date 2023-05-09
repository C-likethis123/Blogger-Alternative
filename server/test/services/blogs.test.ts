import type { blogger_v3 } from "googleapis";
import type { OAuth2Client } from 'google-auth-library';
import BlogService from "services/blogs";

var mockOAuth2Client: jest.Mocked<OAuth2Client> = {
    setCredentials: jest.fn(),
    generateAuthUrl: jest.fn(),
    getToken: jest.fn(),
    refreshAccessToken: jest.fn(),
} as any as jest.Mocked<OAuth2Client>;

var mockBloggerClient = {
    blogs: {
        listByUser: jest.fn(),
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

let service: BlogService;
beforeEach(() => {
    service = new BlogService(mockOAuth2Client);
});
describe("Blog Service", () => {
    test('getBlogs() returns a list of blogs', async () => {
        const expectedBlogList = [{
            id: '112',
            status: 'LIVE',
            name: 'Dairy',
        },
        {
            id: '113',
            status: 'LIVE',
            name: 'Travel Blog',
        }];
        (mockBloggerClient.blogs.listByUser as jest.Mock).mockReturnValue({status: 200, data: {items:expectedBlogList}});
        const blogs = await service.getBlogs();
        expect(blogs).toMatchObject(expectedBlogList);
    })

    test('getBlogs() returns an error if the blogger client returns an error', async () => {
        (mockBloggerClient.blogs.listByUser as jest.Mock).mockReturnValue({status: 400, statusText: "Blogs not found"});
        await expect(service.getBlogs()).rejects.toThrow("Blogs not found");
    })
});

afterEach(() => {
    jest.clearAllMocks();
})