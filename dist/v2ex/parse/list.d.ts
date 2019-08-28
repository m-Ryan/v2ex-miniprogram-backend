export declare function parseList(html: string): Promise<{
    page_count: number;
    list: {
        title: string;
        url: string;
        tag: {
            name: string;
            url: string;
        };
        user: {
            avatar: string;
            name: string;
            url: string;
        };
        last_replay: {
            time: string;
            user_name: string;
            user_url: string;
        };
        replay_count: number;
    }[];
}>;
