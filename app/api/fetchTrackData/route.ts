import { getToken } from "@/utils/getToken";

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const trackID = request.headers.get("referer")?.split("create/")[1];

  if (clientId && clientSecret) {
    try {
      const token = await getToken(clientId, clientSecret);
      const res = (
        await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
      ).json();
      return Response.json(await res);
    } catch (err) {
      console.log(err);
    }
  }
}
