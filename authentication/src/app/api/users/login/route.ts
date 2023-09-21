import { connect } from "../../../../dbConfig/dbconfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        // check if user exist or not?
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." }, { status: 400 })
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);

        // if password is not correct we have to send a error message
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            )
        }
        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,
            { expiresIn: "6h" })

        // The token has been created but it has not been set into the user's cookies.

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message }, { status: 500 })
    }
}