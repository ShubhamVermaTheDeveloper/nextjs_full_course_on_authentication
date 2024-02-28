"use server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import conf from "@/conf";

connect();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    console.log("user exists");

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // create taken data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log(tokenData);

    console.log(process.env.JWT_SECRET_KEY);
    // create token
    const token = jwt.sign(tokenData, conf.jwtsecretkey!, { expiresIn: "1d" });
    console.log(token);
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    console.log(response);
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
