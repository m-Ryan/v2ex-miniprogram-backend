/// <reference types="cheerio" />
export declare function parseDetail(html: string): Promise<{
    title: string;
    desc: string;
    tags: CheerioElement[];
    time: string;
    user: {
        name: string;
        url: string;
    };
    content: string;
    replay: {
        list: {
            user: {
                name: string;
                url: string;
                avatar: string;
            };
            content: string;
            floor_num: number;
            love_num: string | number;
            time: string;
        }[];
        page_count: number;
    };
}>;
