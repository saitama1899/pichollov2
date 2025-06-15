import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const isDev = process.env.NODE_ENV !== 'production';

  if (!isDev) {
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  console.log('[CRON] Job triggered at', new Date().toISOString());

  return NextResponse.json({ ok: true });
}
