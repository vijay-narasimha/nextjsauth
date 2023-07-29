import { connect } from '@/dbConfig/dbConfig'; //@->root folder
import User from '@/models/userModel';

import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        { error: 'user already exists' },
        { status: 400 }
      );

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'user created successfully', newUser });
  } catch (error: any) {
    console.log('error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
