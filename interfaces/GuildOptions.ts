import { Role } from "../models/role";
import { Emoji } from "../models/emoji";
import { GuildFeatures } from "./GuildFeatures";
import { Sticker } from "../models/sticker";

export interface GuildOptions {
    id: number,
    name: string,
    icon: ?string,
    iconHash?: ?string,
    splash: ?string,
    ownerID: number,
    afkChannelID: ?number,
    afkTimeout: number,
    widgetEnabled?: boolean,
    widgetChannelID?: ?number
    verificationLevel: number,
    defaultNotifications: number,
    explicitFilter: number,
    roles: Array<Role>,
    emojis: Array<Emoji>,
    features: GuildFeatures,
    mfaLevel: number,
    applicationID: ?number,
    systemChannelID: ?number,
    systemChannelFlags: number,
    rulesChannelID: ?number,
    maxPresences: ?number,
    maxMembers?: number,
    vanityURL: ?string,
    description: ?string,
    banner: ?string,
    premiumTier: number,
    premiumSubscriptionCount: number,
    preferredLocale: string,
    publicUpdatesChannelID: ?number,
    maxVideoChannelUsers?: number,
    approximateMemberCount?: number,
    approximatePresenceCount?: number,
    welcomeScreen?: string,
    nsfwLevel: number,
    stickers?: Array<Sticker>,
    premiumProgressBarEnabled: boolean
}