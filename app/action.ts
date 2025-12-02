"use client";

import { WeatherData } from "./types/weather";

export async function getWeatherData(
  city: string
): Promise<{ data?: WeatherData,
  error?: string 
 }> {
  try {
    if(
      !city.trim()
    ){
      return { error: "city name is required" }
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    );
    const data = await res.json();
    return { data };
  } catch (error) {
    console.error(error);
    return {};
  }
}
