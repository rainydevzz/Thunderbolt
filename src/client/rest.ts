import EventEmitter from "events";
import { Paths } from "../constants/constants";

export class REST extends EventEmitter {
    constructor(private token: string) {
        super();
        this.token = token;
    }

    async request(options: RequestOptions): Promise<any> {
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

        return resp;
    }

    async get(options: RequestOptions) {
        return await this.request({path: options.path, method: 'GET', data: options.data});
    }

    async post(options: RequestOptions) {
        return await this.request({path: options.path, method: 'POST', data: options.data});
    }

    async patch(options: RequestOptions) {
        return await this.request({path: options.path, method: 'PATCH', data: options.data});
    }

    async delete(options: RequestOptions) {
        return await this.request({path: options.path, method: 'DELETE', data: options.data});
    }

    async put(options: RequestOptions) {
        return await this.request({path: options.path, method: 'PUT', data: options.data});
    }
}

export interface RequestOptions {
    method?: string
    path: string
    data?: any
}