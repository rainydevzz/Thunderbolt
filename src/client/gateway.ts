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
            switch (payload.op) {
                case (1):
                    await this.heartbeatOnce({ "op": 1, "d": payload.d });
                    break;

                case (10):
                    await this.heartbeat(payload.d.heartbeat_interval * Math.random(), { op: 1, d: payload.d })
                    await this.identify(this.token);
                    this.emit('ready');
                    break;

                case (11):
                    this.emit('heartbeatACK');
                    break;

                case (0):
                    await this.handleReceive(payload);
                    break;
            }
        })
    }

    async identify(token: string): Promise<void> {
        const idPayload = {
            op: OpCodes.IDENTIFY,
            d: {
                token: token,
                intents: 32767,
                properties: {
                    os: "linux",
                    browser: "my_library",
                    device: "my_library"
                }
            }
        }
        this.websocket.send(JSON.stringify(idPayload));
    }

    async heartbeatOnce(payload: any) {
        this.websocket.send(payload);
        this.emit('heartbeat');
    }

    async heartbeat(interval: number, payload: object) {
        setInterval(() => {
            this.websocket.send(JSON.stringify(payload));
            this.emit('heartbeat');
        }, interval);
    }

    async handleReceive(payload:any) {
        //const event = EventAliases[payload.t];
        //console.log(payload.t);
        //console.log(event);
        //this.emit(event, (payload.d));
    }
}