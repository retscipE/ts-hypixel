export interface IPlayer {
    uuid: string;
    username: string;
    rank: string;
    online: boolean;
    socialMedia: Object | string;
    firstLogin: string;
    lastLogin: string;
    lastLogout: string;
    guild: IGuild | "None";
}

export interface IGuild {
    name: string;
    tag: string;
    tagColor: string;
    description: string;
    memberCount: number;
    createdAt: string;
}