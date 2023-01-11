export class User {

}

export interface UserOptions {
    id: string
    username: string
    discriminator: string
    avatar: string | null | undefined
    bot?: boolean
    system?: boolean
    mfaEnabled?: boolean
    banner?: string | null | undefined
    accentColor?: number | null| undefined
    locale?: string
    verified?: boolean
    email?: string | null | undefined
    flags?: number
    premiumType?: number
    publicFlags?: number
}