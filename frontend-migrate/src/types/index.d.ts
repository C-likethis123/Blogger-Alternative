export {}
declare global {
    interface Post {
        _id: string | number;
        title?: string;
        isDraft: boolean;
    }

    interface Blog {
        name: string;
        id: string;
        status: string;
    }
}