import { NextResponse } from "next/server";
import Spotify from "spotify-web-api-node";

const api = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
});

let expirationTime = 0;

export async function GET() {
  try {
    // Refresh token if expired
    if (Date.now() > expirationTime) {
      const response = await api.refreshAccessToken();
      api.setAccessToken(response.body.access_token);
      expirationTime = Date.now() + response.body.expires_in * 1000;
    }

    // Get current playing track
    const playing = await api.getMyCurrentPlayingTrack();
    
    return Response.json(playing.body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}


