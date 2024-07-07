export const getAppConfiguration = () => ({
  port: parseInt(process.env.PORT, 10) ?? 3000,
  httpClients: {
    googlePlaces: {
      apiUrl: process.env.GOOGLE_PLACES_API_URL,
      apiKey: process.env.GOOGLE_PLACES_API_KEY,
    },
    googleGeocode: {
      apiUrl: process.env.GOOGLE_GEOCODE_API_URL,
      apiKey: process.env.GOOGLE_GEOCODE_API_KEY,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME ?? 3600,
  },
});
