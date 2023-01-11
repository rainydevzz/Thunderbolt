import { GatewayClient } from "../client/gateway";

const bot = new GatewayClient(process.env.token);

bot.connect();