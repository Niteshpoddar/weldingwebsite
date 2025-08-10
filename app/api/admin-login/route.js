import { connectToDatabase } from "../../dbconfig/dbconfig";
import Admin from "../../models/adminmodels";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

await connectToDatabase();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);


    // Check if user exists
    const user = await Admin.findOne({ email });
    // console.log(user)
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }
    // console.log("User exists");

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create JWT token
    // const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    // console.log("JWT created");

    // Create response and set cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("admin-session", 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 *60 *24,
      path:'/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}