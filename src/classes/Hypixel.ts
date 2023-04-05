import { IGuild, IPlayer } from '../types';
import { request, timeConverter } from '../util'

export class Hypixel {
    public apikey: string;
    constructor(key: string) {
        this.apikey = key;
    }

    private async keyErrorTest() {
        const result = await request(`https://api.hypixel.net/key?key=${this.apikey}`)
        switch (result.success) {
            case false:
                throw new Error(`An error has occured related to processing your api key. Either it is invalid or does not exist.`);
            case true:
                break;
        }
    }

    public async getPlayer(identifier: string): Promise<IPlayer> {
        await this.keyErrorTest();
        let uuid: string;

        if (identifier.includes("-") || identifier.length > 16) {
            const data = await request(`https://sessionserver.mojang.com/session/minecraft/profile/${identifier}`);
            if (data.errorMessage) throw new Error("That UUID is invalid and cannot be translated into player data!")
            uuid = identifier;
        } else {
            const data = await request(`https://api.mojang.com/users/profiles/minecraft/${identifier}`);
            if (data.errorMessage) throw new Error("That username is invalid and cannot be translated into player data!")
            uuid = data.id;
        }

        const playerReq = await request(`https://api.hypixel.net/player?key=${this.apikey}&uuid=${uuid}`);
        const guildReq = await request(`https://api.hypixel.net/guild?key=${this.apikey}&player=${uuid}`)
        const a = await request(`https://api.hypixel.net/status?key=${this.apikey}&uuid=${uuid}`);
        const online = a.session.online
        let guild: IGuild | null;

        if (guildReq.guild === null)
            guild === null;
        else guild = {
            name: guildReq.guild.name,
            tag: guildReq.guild.tag,
            tagColor: guildReq.guild.tagColor,
            description: guildReq.guild.description,
            memberCount: guildReq.guild.members.length - 1,
            createdAt: timeConverter(guildReq.guild.created)
        }

        return {
            uuid,
            username: playerReq.player.displayname,
            rank: playerReq.player.newPackageRank ?? "None",
            online,
            socialMedia: playerReq.player.socialMedia.links ?? "None Linked",
            firstLogin: timeConverter(playerReq.player.firstLogin),
            lastLogin: timeConverter(playerReq.player.lastLogin),
            lastLogout: timeConverter(playerReq.player.lastLogout),
            guild,
        }
    }

    public async getGuild(name: string): Promise<IGuild> {
        await this.keyErrorTest();

        const guildReq = await request(`https://api.hypixel.net/guild?key=${this.apikey}&name=${name}`);
        if (guildReq.guild === null) throw new Error("The provided guild name is invalid and cannot be translated into guild data!")
        
        return {
            name,
            tag: guildReq.guild.tag,
            tagColor: guildReq.guild.tagColor,
            description: guildReq.guild.description,
            memberCount: guildReq.guild.members.length - 1,
            createdAt: timeConverter(guildReq.guild.created)
        }
    }

    public async usernameToUUID(name: string): Promise<string> {
        const data = await request(`https://api.mojang.com/users/profiles/minecraft/${name}`);
        if (data.errorMessage) throw new Error("That username is invalid and cannot be translated into an UUID!")
        return data.id;
    }

    public async uuidToUsername(uuid: string): Promise<string> {
        const data = await request(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`);
        if (data.errorMessage) throw new Error("That UUID is invalid and cannot be translated into an username!")
        return data.name;
    }
}