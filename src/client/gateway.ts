import EventEmitter from "events";
import WebSocket from "ws";
import { OpCodes, GatewayCloseCodes } from "../constants/constants";
import { REST } from "./rest";

export class GatewayClient extends EventEmitter {
    private http: REST = new REST(this.token);
    private websocket: WebSocket;

    constructor(private token: string) {
        super()
        this.token = token;
        this.http = new REST(token);
        this.http.on("debug", console.log);
    }

    async connect() {
        const gatewayResponse = await this.http.get({ path: "/gateway/" });
        const gatewayBody = await gatewayResponse.json();
        const gateway = gatewayBody.url;

        this.websocket = new WebSocket(`${gateway}?v=10&encoding=json`);

        this.websocket.on("open", () => {
            this.emit("debug", `[Gateway] Connected to wss://${gateway}?v=10&encoding=json`);
        })

        this.websocket.on("message", async data => {
            const payload = JSON.parse(data.toString());
            this.emit("debug", `[Gateway] Received ${JSON.stringify(payload)}`);
        })
    }
}