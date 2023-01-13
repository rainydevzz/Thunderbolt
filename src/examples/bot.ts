import { GatewayClient } from "../client/gateway";
import { token } from "./cfg.json";

console.log(token);
const bot = new GatewayClient(token);

bot.connect();