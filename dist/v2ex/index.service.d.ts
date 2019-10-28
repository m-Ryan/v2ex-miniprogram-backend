export declare class V2exService {
    getHomePage(url: string, cookie: string): Promise<{
        user: {
            avatar: string;
            nickname: string;
        };
        hot_nodes: {
            url: string;
            name: string;
        }[];
        new_nodes: {
            url: string;
            name: string;
        }[];
        topic: {
            avatar: string;
            url: string;
            name: string;
        }[];
        list: {
            title: string;
            url: string;
            user: {
                avatar: string;
                name: string;
                url: string;
            };
            tag: {
                name: string;
                url: string;
            };
            last_replay: {
                time: string;
                user_name: string;
                user_url: string;
            };
            replay_count: string | number;
        }[];
        tabs: {
            name: string;
            url: string;
        }[];
        secondary_tabs: {
            name: string;
            url: string;
        }[];
    }>;
    getListPage(url: string, cookie: string): Promise<{
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
    getDetailPage(url: string, cookie: string): Promise<{
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
    getDetailReplay(url: string, cookie: string): Promise<"" | {
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
    getNodeList(url: string, cookie: string): Promise<"" | {
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
    getUserInfo(url: string, cookie: string): Promise<"" | {
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
    getCollection(url: string, cookie: string): Promise<"" | {
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
    }[]>;
    setCollection(url: string, cookie: string, referer: string): Promise<{
        message: string;
        code: number;
    }>;
    setIgnore(url: string, cookie: string, referer: string): Promise<{
        message: string;
        code: number;
    }>;
}
