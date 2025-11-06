// eslint-disable-next-line import/prefer-default-export
export async function GET() {
  const assets = ['bitcoin', 'ethereum', 'kompete']; // you can generate this dynamically later

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${assets}&vs_currencies=usd`;

  const response = await fetch(url, {
    headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY ?? 'CG-h3an5YjZiwCjtSBN2WwqHPYr' },
    cache: 'no-store', // ensures always fresh
  });

  const data = await response.json();
  return Response.json(data);
}
