import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Clear any session data
    const response = NextResponse.json({ success: true });

    const clearOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    };

    // Clear cookies with matching attributes used at set-time
    response.cookies.set("garage-session", "", clearOptions);
    response.cookies.set("garage_session", "", clearOptions);
    response.cookies.set("garage-id", "", {
      ...clearOptions,
      httpOnly: false,
    });
    
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}
