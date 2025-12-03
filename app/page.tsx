"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Droplets, Search, Thermometer, Wind } from "lucide-react";
import { getWeatherData } from "./action";
import { useState } from "react";
import { WeatherData } from "./types/weather";
import { Card, CardContent } from "@/components/ui/card";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Search className={`h-4 w-4 ${pending ? " animate-spin" : ""}`} />
    </Button>
  );
}
export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("")
  console.log("weather", weather);

  const handleSearch = async (formData: FormData) => {
    setError("");

    const city = formData.get("city") as string;
    const { data, error: weatherError } = await getWeatherData(city);
    console.log(error);
    if(weatherError){
      setError(weatherError);
      setWeather(null);
    }
    
    if (data) {
      setWeather(data);
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
          
          {
            error &&(
              <motion.div initial={{ opacity:0, y: 10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="text-center text-red-200 bg-red-500/20 rounded-md p-2 mt-4">{error}</motion.div>
            )
            
            }

          {weather && (
            <motion.div initial={{ opacity:0, y: 20}} animate={{opacity:1, y:0}} exit={{opacity:0}} transition={{duration: 0.3}} className="mt-5">
              <Card className="bg-white/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold">{weather.name}</h2>
                  <div className="flex justify-center items-center gap-2 mt-5">
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width={64} height={64} />
                    <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
                  </div>
                  <div className="text-gray-500 mt-2 capitalize">{weather.weather[0].description}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <Thermometer className="w-6 h-6 mx-auto text-orange-500"/>
                      <div>Feels like</div>
                      <div>
                        {Math.round(weather.main.feels_like)}°C
                      </div>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-6 h-6 mx-auto text-blue-500"/>
                      <div>Humidity</div>
                      <div>
                        {Math.round(weather.main.humidity)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <Wind className="w-6 h-6 mx-auto text-teal-500"/>
                      <div>Feels like</div>
                      <div>
                        {Math.round(weather.wind.speed)} m/s
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
