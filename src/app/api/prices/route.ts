// eslint-disable-next-line import/prefer-default-export
export async function GET(request: Request) {
  const url = new URL(request.url);
  const idsParam = url.searchParams.get('ids');
  const assets = idsParam ? idsParam.split(',').map((id) => id.trim()).filter(Boolean) : ['bitcoin', 'ethereum', 'kompete'];

  const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${assets.join(',')}&vs_currencies=usd`;

  const response = await fetch(apiUrl, {
    headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY ?? 'CG-h3an5YjZiwCjtSBN2WwqHPYr' },
    cache: 'no-store', // ensures always fresh
  });

  const data = await response.json();
  return Response.json(data);
}
