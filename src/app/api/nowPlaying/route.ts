export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${NOW_PLAYING_ENDPOINT}?timestamp=${Date.now()}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false }, { status: response.status });
    }

    const song = await response.json();

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item?.name,
      artist: song.item?.artists?.map((artist: any) => artist.name).join(", "),
      album: song.item?.album?.name,
      albumImageUrl: song.item?.album?.images[0]?.url,
      songUrl: song.item?.external_urls?.spotify,
    }, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch now playing" }, { status: 500 });
  }
}
