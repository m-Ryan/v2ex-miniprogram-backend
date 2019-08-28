export declare function parseNode(html: string): Promise<"" | {
    slogans: string;
    avatar: string;
    relative: {
        url: string;
        name: string;
        avatar: string;
    }[];
    page_count: number;
    list: {
        title: string;
        url: string;
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
