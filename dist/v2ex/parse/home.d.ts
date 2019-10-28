export declare function parseHome(html: string): Promise<{
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
