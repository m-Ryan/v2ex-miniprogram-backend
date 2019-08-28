export declare function parseReplay(html: string): Promise<"" | {
    user: {
        name: string;
        url: string;
        avatar: string;
    };
    content: string;
    floor_num: number;
    love_num: string | number;
    time: string;
}[]>;
