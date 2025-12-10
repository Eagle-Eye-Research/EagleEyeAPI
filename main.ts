import { serveDir } from "https://deno.land/std@0.170.0/http/file_server.ts";
import { handlePing } from "./routes/ping.ts";
import { handleStats } from "./routes/stats.ts";
import { handleMomentumStats } from "./routes/algorithms/momentum.ts";
import { handleFactorStats } from "./routes/algorithms/factor.ts";
import { handleAIMLStats } from "./routes/algorithms/aiml.ts";
import { handleEquityStats } from "./routes/algorithms/equity.ts";
import { handleEventStats } from "./routes/algorithms/event.ts";
import { handleOptionsStats } from "./routes/algorithms/options.ts";
import { handleSectorStats } from "./routes/algorithms/sector.ts";

const ALLOWED_ORIGINS = [
    "https://eagleeyeresearch-web.vercel.app",
];

//cors headers
function corsHeaders(origin: string | null): Record<string, string> {
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
        return {
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS,DELETE",
            "Access-Control-Allow-Headers": "Content-Type,Authorization",
        };
    }

    return {};
}

//data variables init
export let latestStats: Record<string, unknown> = {};
export let momentumStats: Record<string, unknown> = {};
export let factorStats: Record<string, unknown> = {};
export let aimlStats: Record<string, unknown> = {};
export let equityStats: Record<string, unknown> = {};
export let eventStats: Record<string, unknown> = {};
export let optionsStats: Record<string, unknown> = {};
export let sectorStats: Record<string, unknown> = {};

Deno.serve(async (req) => {
    const url = new URL(req.url);
    const origin = req.headers.get("origin");

    //auth check
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
        return new Response("Forbidden", { status: 403 });
    }

    const headers = corsHeaders(origin);

    if (req.method === "OPTIONS") {
        return new Response(null, { status: 204, headers });
    }


    //routes

    if (url.pathname === "/api/ping") {
        return await handlePing(req, headers);
    }


    if (url.pathname === "/api/stats") {
        return await handleStats(req, headers);
    }

    if (url.pathname === "/api/momentum_stats") {
        return await handleMomentumStats(req, headers);
    }

    if (url.pathname === "/api/factor_stats") {
        return await handleFactorStats(req, headers);
    }

    if (url.pathname === "/api/aiml_stats") {
        return await handleAIMLStats(req, headers);
    }

    if (url.pathname === "/api/equity_stats") {
        return await handleEquityStats(req, headers);
    }

    if (url.pathname === "/api/event_stats") {
        return await handleEventStats(req, headers);
    }

    if (url.pathname === "/api/option_stats") {
        return await handleOptionsStats(req, headers);
    }

    if (url.pathname === "/api/sector_stats") {
        return await handleSectorStats(req, headers);
    }

    //public redirect
    return serveDir(req, {
        fsRoot: "./public",
    });
});
