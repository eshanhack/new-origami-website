import { NextRequest, NextResponse } from "next/server";

const PROXY_BASE = "https://betorigami.com/api/casino-proxy";
const EXCLUDED_GAMES = ["HILO", "CRASH", "BLACKJACK"];

let cachedAuthToken: string | null = null;

async function registerUser(): Promise<string> {
  const res = await fetch(`${PROXY_BASE}/user`, { method: "POST" });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  const data = await res.json();
  cachedAuthToken = data.authToken;
  return data.authToken;
}

async function getAuthToken(): Promise<string> {
  return cachedAuthToken || registerUser();
}

async function createSession(
  game: string,
  authToken: string
): Promise<Response> {
  return fetch(`${PROXY_BASE}/user/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      apiType: "HUB88",
      currency: "USD",
      language: "en",
      game: game.toUpperCase(),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { game } = await req.json();

    if (!game || typeof game !== "string") {
      return NextResponse.json({ error: "Missing game" }, { status: 400 });
    }

    if (EXCLUDED_GAMES.includes(game.toUpperCase())) {
      return NextResponse.json(
        { error: "Demo not available for this game" },
        { status: 422 }
      );
    }

    let authToken = await getAuthToken();
    let res = await createSession(game, authToken);

    if (res.status === 401 || res.status === 403) {
      cachedAuthToken = null;
      authToken = await registerUser();
      res = await createSession(game, authToken);
    }

    if (!res.ok) {
      throw new Error(`Session creation failed: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ url: data.url });
  } catch (e) {
    console.error("Game session error:", e);
    return NextResponse.json(
      { error: "Failed to create game session" },
      { status: 500 }
    );
  }
}
