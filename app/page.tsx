"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
            <div className="mt-">
              <Card className="bg-white/70 backdrop-blur">
                <CardContent className="p-6">
                  <h2>{weather.name}</h2>
                  <div className="flex justify-center items-center gap-2 mt-5">
                    <div></div>
                    <Image src="/cloud.png" width={100} height={100}/>
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
