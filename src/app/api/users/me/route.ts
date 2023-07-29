import { getData } from '@/helpers/getData';

import { NextRequest, NextResponse } from 'next/server';

import User from '@/models/userModel';
import { connect } from '@/dbConfig/dbConfig';

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getData(req);
    const user = await User.findOne({ _id: userId }).select('-password');
    return NextResponse.json({
      message: 'user found',
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
