import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { env } from "../env";

export async function authRoutes(app: FastifyInstance): Promise<void> {
    app.post("/register", async (req) => {
        const bodySchema = z.object({
            code: z.string()
        });

        const { code } = bodySchema.parse(req.body);

        const accessTokenResponse = await axios.post("https://github.com/login/oauth/access_token", null, {
            params: {
                code,
                client_id: env.GITHUB_CLIENT_ID,
                client_secret: env.GITHUB_SECRET_ID,
            },
            headers: {
                Accept: "application/json"
            }
        });
        const { access_token } = accessTokenResponse.data;
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        const user = userResponse.data;
        return {
            user
        };
    });
}
