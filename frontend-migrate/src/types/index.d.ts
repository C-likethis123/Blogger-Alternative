export {}
declare global {
    interface Post {
        id: string;
        title?: string;
        content?: string;
        isDraft?: boolean;
    }

    interface Blog {
        name: string;
        id: string;
        status: string;
    }
}