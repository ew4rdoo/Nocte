export async function GET() {
  return Response.json({
    ok: true,
    hasKey: !!process.env.ANTHROPIC_API_KEY,
    keyPrefix: process.env.ANTHROPIC_API_KEY?.slice(0, 10) || "missing",
  });
}
