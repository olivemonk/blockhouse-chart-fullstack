import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params: Record<string, string | undefined> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/line-chart-data`, {
    });
    
    return NextResponse.json({ data: response.data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch candlestick data' }, { status: 500 });
  }
}
