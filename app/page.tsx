"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./action";
import { useState } from "react";
import { WeatherData } from "./types/weather";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

function SubmitButton() {
  return (
    <Button type="submit">
      <Search className="w-4 h-4" />
    </Button>
  );
}
export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  console.log("weather", weather);

  const handleSearch = async (formData: FormData) => {
    console.log("clicked");
    const city = formData.get("city") as string;
    const { ...data } = await getWeatherData(city);
    if (data) {
      setWeather(data?.data ?? null);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-linear-to-b from-sky-400 to-blue-500 p-4 flex items-center justify-center">
        <div className="w-full max-w-md space-x-4">
          <form action={handleSearch} className="flex gap-2">
            <Input
              name="city"
              type="text"
              placeholder="Enter the city name"
              className="bg-white/90"
              required
            />
            <SubmitButton />
          </form>
          {weather && (
            <div className="mt-5">
              <Card className="bg-white/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold">{weather.name}</h2>
                    <div className="flex justify-center items-center gap-2 mt-5">
                      <div></div>
                      <Image
                        src="/cloud.png"
                        alt="cloud"
                        width={100}
                        height={100}
                      />
                      <div className="text-5xl">
                        {weather?.main?.temp ? Math.round(weather.main.temp): ""}°C
                      </div>
                    </div>
                    <div className="text-gray-500 mt-1 capitalize">
                      {weather?.weather?.[0].description?.toUpperCase(  )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt6">
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 mx-auto text-orange-500" />
                      <div className="mt-2 text-sm text-gray-500">
                        Feels like
                      </div>
                      <div className="font-semibold">
                        {Math.round(weather?.main?.feels_like && Math.round(weather.main.feels_like))}°C
                      </div>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto text-blue-500" />
                      <div className="mt-2 text-sm text-gray-500">
                        Humidity
                      </div>
                      <div className="font-semibold">
                        {Math.round(weather.main.humidity)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto text-orange-500" />
                      <div className="mt-2 text-sm text-gray-500">
                        wind
                      </div>
                      <div className="font-semibold">
                        {Math.round(weather.wind.speed)} m/s
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
