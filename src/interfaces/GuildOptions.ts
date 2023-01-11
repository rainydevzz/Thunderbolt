import { Role } from "../models/role";
import { Emoji } from "../models/emoji";
import { GuildFeatures } from "./GuildFeatures";
import { Sticker } from "../models/sticker";

export interface GuildOptions {
    id: string
    name: string
    icon: string | null | undefined
    iconHash?: string | null | undefined
    splash: string | null | undefined
    ownerID: string
    afkChannelID: string | null | undefined,
    afkTimeout: number
    widgetEnabled?: boolean
    widgetChannelID?: string | null | undefined
    verificationLevel: number
    defaultNotifications: number
    explicitFilter: number
    roles: Array<Role>
    emojis: Array<Emoji>
    features: GuildFeatures
    mfaLevel: number
    applicationID: string | null | undefined
    systemChannelID: string | null | undefined
    systemChannelFlags: number
    rulesChannelID: string | null | undefined
    maxPresences: number | null | undefined
    maxMembers?: number
    vanityURL: string | null | undefined
    description: string | null | undefined
    banner: string | null | undefined
    premiumTier: number
    premiumSubscriptionCount: number
    preferredLocale: string
    publicUpdatesChannelID: string | null | undefined
    maxVideoChannelUsers?: number
    approximateMemberCount?: number
    approximatePresenceCount?: number
    welcomeScreen?: string
    nsfwLevel: number
    stickers?: Array<Sticker>
    premiumProgressBarEnabled: boolean
}