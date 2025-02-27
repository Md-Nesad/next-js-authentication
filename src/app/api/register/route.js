import { NextResponse } from "next/server";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import { connectDb } from "@/lib/mongo";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  // Create a DB Conenction
  await connectDb();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = new User({
    name,
    password: hashedPassword,
    email,
  });
  // Update the DB
  try {
    await newUser.save();
  } catch (err) {
    return new NextResponse(err.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
