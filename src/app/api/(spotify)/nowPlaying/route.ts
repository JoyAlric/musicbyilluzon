export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const DEVICES_ENDPOINT = "https://api.spotify.com/v1/me/player/devices";

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

async function getActiveDevice(accessToken: string) {
  const response = await fetch(DEVICES_ENDPOINT, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 200) {
    const data = await response.json();
    // Find the active device that is playing
    const activeDevice = data.devices.find((device: any) => device.is_active);
    
    if (activeDevice) {
      const deviceType =
        activeDevice.type === "Computer"
          ? "Computer"
          : activeDevice.type === "Phone"
          ? "Phone"
          : activeDevice.type === "Tablet"
          ? "Tablet"
          : "Speaker";
      return { deviceName: activeDevice.name, deviceType }; // Return device name and type separately
    } else {
      return { deviceName: "No active device", deviceType: "Unknown" };
    }
  } else {
    return { deviceName: "Unable to fetch device info", deviceType: "Unknown" };
  }
}

export async function GET(req: NextRequest) {
  try {
    const accessToken = await getAccessToken();

    // Fetch the currently playing song
    const response = await fetch(`${NOW_PLAYING_ENDPOINT}?timestamp=${Date.now()}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    // If no song is playing (204 No Content) or response status > 400
    if (response.status === 204 || response.status >= 400) {
      // Returning default null values when no song is playing
      return NextResponse.json(
        {
          isPlaying: false,
          isPaused: false,
          progressMs: null,
          durationMs: null,
          title: null,
          artist: null,
          album: null,
          albumImageUrl: null,
          songUrl: null,
          activeDevice: "No active device",
          deviceType: "Unknown",
        },
        { status: response.status }
      );
    }

    // If song data is returned
    const song = await response.json();

    // Fetch the active device and its type
    const { deviceName, deviceType } = await getActiveDevice(accessToken);

    return NextResponse.json(
      {
        isPlaying: song.is_playing,
        isPaused: !song.is_playing,
        progressMs: song.progress_ms ?? null,
        durationMs: song.item?.duration_ms ?? null,
        title: song.item?.name ?? null,
        artist: song.item?.artists?.map((artist: any) => artist.name).join(", ") ?? null,
        album: song.item?.album?.name ?? null,
        albumImageUrl: song.item?.album?.images[0]?.url ?? null,
        songUrl: song.item?.external_urls?.spotify ?? null,
        activeDevice: deviceName, // Device name
        deviceType, // Device type (Phone, Computer, etc.)
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    // In case of any unexpected err,ro return default null values
    return NextResponse.json(
      {
        isPlaying: false,
        isPaused: false,
        progressMs: null,
        durationMs: null,
        title: null,
        artist: null,
        album: null,
        albumImageUrl: null,
        songUrl: null,
        activeDevice: "No active device",
        deviceType: "Unknown",
      },
      { status: 500 }
    );
  }
}
