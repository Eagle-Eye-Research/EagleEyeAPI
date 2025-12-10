export async function handlePing(
    _req: Request,
    cors: Record<string, string>
) {
    return new Response(
        JSON.stringify({
            pong: true,
            timestamp: Date.now(),
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                ...cors,
            },
        }
    );
}
