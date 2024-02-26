import { NextResponse } from 'next/server';
import {v4 as uuidv4} from 'uuid'
export async function GET(request : Request) {
  if (request.method === 'GET') {
    const csrfToken = uuidv4()
    return NextResponse.json({csrfToken})
  } 
};
