import { getToken } from "@/utils/getToken";

export async function POST(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const query = await request.json();

  if (clientId && clientSecret) {
    try {
      const token = await getToken(clientId, clientSecret);
      const res = (
        await fetch(
          `https://api.spotify.com/v1/search?q=${JSON.stringify(
            query.query
          )}&type=track`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
      ).json();
      return Response.json(await res);
    } catch (err) {
      console.log(err);
    }
  }
}
