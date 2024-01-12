import { NextResponse } from "next/server";

export const GET = async ({ city }: any) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
  );
  const data = await res.json();
  return NextResponse.json({ data });
};
