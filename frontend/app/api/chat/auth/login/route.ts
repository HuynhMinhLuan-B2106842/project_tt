import { NextResponse } from "next/server"
import { authenticateUser } from "../../../../lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Vui lòng nhập email và mật khẩu" }, { status: 400 })
    }

    // Authenticate user
    const result = await authenticateUser({ email, password })

    if (!result.success) {
      return NextResponse.json({ error: result.error || result.message }, { status: 401 })
    }

    // Create response with token in cookie
    const response = NextResponse.json({
      success: true,
      message: result.message,
      token: result.token,
      user: result.user,
    })

    // Set HTTP-only cookie for additional security (optional)
    response.cookies.set("auth-token", result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 })
  }
}
