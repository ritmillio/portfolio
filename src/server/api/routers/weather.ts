import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";

const weatherResponseSchema = z.object({
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
        humidity: z.number(),
    }),
    weather: z.array(
        z.object({
            main: z.string(),
            description: z.string(),
        })
    ),
    name: z.string(),
});

export const weatherRouter = createTRPCRouter({
    getWeatherByCity: publicProcedure
        .input(
            z.object({
                city: z.string().min(1, "City is required"),
                countryCode: z.string().optional(),
                units: z.enum(["metric", "imperial"]).optional().default("metric"),
            })
        )
        .query(async ({ input }) => {
            const { city, countryCode, units } = input;
            // If a country code is provided, combine it with the city name.
            // The OpenWeather API expects this in the form "city,countryCode"
            const query = countryCode ? `${city},${countryCode}` : city;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                query
            )}&appid=${env.OPENWEATHER_API_KEY}&units=${units}`;

            try {
                const response = await fetch(url);
                const jsonData = await response.json() as z.infer<typeof weatherResponseSchema>;

                if (!response.ok) {
                    const errorMessage =
                        (jsonData as { message?: string }).message ??
                        "Failed to fetch weather data";
                    throw new Error(errorMessage);
                }
                return weatherResponseSchema.parse(jsonData);
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Failed to fetch weather data");
                }
                throw new Error("Failed to fetch weather data");
            }
        }),
});
