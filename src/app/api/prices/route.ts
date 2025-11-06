// eslint-disable-next-line import/prefer-default-export
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.get('ids') ?? 'bitcoin,ethereum,solana'; // coingecko-style ids
  const vs = searchParams.get('vs') ?? 'usd';

  const url = `https://pro-api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${vs}`;
  const res = await fetch(url, {
    headers: { 'x-cg-pro-api-key': process.env.COINGECKO_API_KEY! },
    cache: 'no-store',
  });
  if (!res.ok) return new Response(JSON.stringify({ error: 'upstream' }), { status: 502 });

  const data = await res.json(); // shape: { bitcoin:{usd:12345}, ethereum:{usd:...}, ...}
  return Response.json({ data, ts: Date.now(), vs });
}
