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

const BRAND_THEMES: Record<string, { theme: string | null; logoPath: string | null }> = {
  shuffle: {
    theme: null,
    logoPath: "/brands/shuffle.svg",
  },
  bitcasino: {
    theme: "bitcasino.css?v=3",
    logoPath: "/brands/bitcasino-footer.svg",
  },
  cloudbet: {
    theme: "cloudbet.css?v=3",
    logoPath: "/brands/cloudbet-footer.svg",
  },
  csgo500: {
    theme: "csgo500.css?v=3",
    logoPath: "/brands/csgo500-footer.svg",
  },
  metaspins: {
    theme: "metaspins.css?v=3",
    logoPath: "/brands/metaspins-footer.svg",
  },
};

function applyBrandTheme(url: string, brand: string, origin: string): string {
  const brandConfig = BRAND_THEMES[brand] || BRAND_THEMES.shuffle;
  if (!brandConfig) return url;

  try {
    const parsed = new URL(url);
    const settingsB64 = parsed.searchParams.get("settings");
    if (!settingsB64) return url;

    const settings = JSON.parse(
      Buffer.from(decodeURIComponent(settingsB64), "base64").toString()
    );

    if (brandConfig.theme) {
      settings.theme = brandConfig.theme;
    }
    if (brandConfig.logoPath) {
      settings.logoUrl = `${origin}${brandConfig.logoPath}`;
    }

    const newB64 = Buffer.from(JSON.stringify(settings)).toString("base64");
    parsed.searchParams.set("settings", newB64);
    return parsed.toString();
  } catch {
    return url;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { game, brand } = await req.json();

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
    const origin = req.nextUrl.origin;
    const themedUrl = applyBrandTheme(data.url, brand || "shuffle", origin);
    return NextResponse.json({ url: themedUrl });
  } catch (e) {
    console.error("Game session error:", e);
    return NextResponse.json(
      { error: "Failed to create game session" },
      { status: 500 }
    );
  }
}
