import { NextResponse } from "next/server";
import Spotify from "spotify-web-api-node";

type NowPlayingResponseSuccess = SpotifyApi.CurrentlyPlayingResponse;
type NowPlayingResponseError = { error: unknown };
type NowPlayingResponse = NowPlayingResponseSuccess | NowPlayingResponseError;

const api = new Spotify({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
});
let expirationTime = 0;

export async function GET(): Promise<NextResponse<NowPlayingResponse>> {
  try {
    if (Date.now() > expirationTime) {
      const response = await api.refreshAccessToken();
      api.setAccessToken(response.body.access_token);
      expirationTime = Date.now() + response.body.expires_in * 1000;
    }

    const playing = await api.getMyCurrentPlayingTrack();
    return NextResponse.json(playing.body, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as any)?.message }, { status: 500 });
  }
}