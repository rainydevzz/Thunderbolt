import EventEmitter from "events";
import { RequestOptions } from "../interfaces/RequestOptions";
import { Paths } from "../constants/constants";

export class REST extends EventEmitter {
    constructor(private token: string) {
        super();
        this.token = token;
    }

    async request(options: RequestOptions): Promise<void> {
        let method = options.method;
        this.emit('debug', `[HTTP] ${options.method} ${options.data ? JSON.stringify(options.data): ""}`);
        const resp = await fetch(`${Paths.API_PATH}${options.path}`, {
            method,
            body: JSON.stringify(options.data),
            headers: {
                "authorization": `Bot ${this.token}`,
                "user-agent": `Thunderbolt 0.0.1`,
                "content-type": "application/json",
                "authority": "https://discord.com"
            }
        });
    }
}