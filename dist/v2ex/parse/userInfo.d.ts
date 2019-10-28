export declare function parseUserInfo(html: string): Promise<"" | {
    avatar: string;
    nickname: string;
    bigger: string;
    widgets: {
        name: string;
        url: string;
    }[];
    register_rank: number;
    register_time: string;
    active_rank: string;
}>;
