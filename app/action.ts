"use client";

import { WeatherData } from "./types/weather";
import { z } from "zod";

const weatherShema = z.object({
  name:z.string(),
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  wind: z.object({
    speed: z.number(),
  }),
})

export async function getWeatherData(
  city: string
): Promise<{ data?: WeatherData,
  error?: string
 }> {
  try {
    if(!city.trim()){
      return {error: "city name is required" }
    }
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`);
      if(!res.ok){
        throw new Error("city not found")
      }
    const rawData = await res.json();
    const data = weatherShema.parse(rawData);
    return { data };
  } catch (error) {
    if(error instanceof z.ZodError){
      return {
        error: "Invalid weather data received"
      };
    }
    return {
      error: error instanceof Error ? error.message : "Failed to fatch weather data"
    }
  }
}
