

export const revalidate = 0; // always fetch fresh data (no ISR) [web:38]
export const dynamic = 'force-dynamic'; // ensure this runs on the server per request [web:38]

type IpApiResponse = {
  city?: string;
  country_name?: string;
};

export async function GET() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

  try {
    const res = await fetch("https://ipwho.is/", {
      signal: controller.signal,
      // Do not cache external geo IP responses
      cache: "no-store", // runtime caching directive
      headers: {
        Accept: "application/json",
      },
    });

    // Handle non-OK responses
    if (!res.ok) {
      return Response.json(
        { city: "Unknown", country: "Earth" },
        { status: res.status, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data: IpApiResponse = await res.json();

    const city = data.city ?? "Unknown";
    const country = data.country_name ?? "Earth";

    return Response.json(
      { city, country },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err) {
    // AbortError or network error
    return Response.json(
      { city: "Unknown", country: "Earth" },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } finally {
    clearTimeout(timeout);
  }
}
