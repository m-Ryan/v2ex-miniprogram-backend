export declare function parseDetail(html: string): Promise<{
    title: string;
    desc: string;
    tags: {
        name: string;
        href: string;
    }[];
    time: string;
    user: {
        name: string;
        url: string;
        avatar: string;
    };
    content: string;
    more_info: {
        is_collected: boolean;
        collection_url: string;
        is_ignore: boolean;
        ignore_url: string;
        click_count: number;
        collection_count: number;
        thank_count: number;
    };
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
