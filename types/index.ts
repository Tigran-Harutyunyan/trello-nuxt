interface IImage {
    id: string;
    urls: {
        thumb: string;
        full: string;
    }
    links: {
        html: string
    }
    user: {
        name: string
    }
}