import { sectorStats } from "../../main.ts";

const API_SECRET = Deno.env.get("API_SECRET") ?? "";

function requireAuth(req: Request): Response | null {
    const auth = req.headers.get("authorization");

    if (!auth || !auth.startsWith("Bearer ")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = auth.slice("Bearer ".length);

    if (!API_SECRET || token !== API_SECRET) {
        return new Response("Forbidden", { status: 403 });
    }

    return null;
}

export async function handleSectorStats(
    req: Request,
    cors: Record<string, string>
): Promise<Response> {
    const authError = requireAuth(req);
    if (authError) return authError;

    if (req.method === "GET") {
        return new Response(
            JSON.stringify(sectorStats),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    ...cors,
                },
            }
        );
    }

    if (req.method === "POST") {
        try {
            const data = await req.json();

            sectorStats.timestamp = Date.now();
            sectorStats.data = data;

            return new Response(
                JSON.stringify({ success: true }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                        ...cors,
                    },
                }
            );
        } catch {
            return new Response(
                JSON.stringify({ error: "Invalid JSON" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                        ...cors,
                    },
                }
            );
        }
    }

    return new Response(
        "Method Not Allowed",
        {
            status: 405,
            headers: cors,
        }
    );
}
