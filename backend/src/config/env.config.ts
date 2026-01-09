import { getEnv } from "../utils/get-env"

const envconfig = () => ({
    NODE_ENV : getEnv("NODE_ENV" , "development"),
    PORT : getEnv("PORT" , "4000"),
    BASE_PATH: getEnv("BASE_PATH", "/api"),
    
    GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),

    CLOUDINARY_CLOUD_NAME: getEnv("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY : getEnv("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET : getEnv("CLOUDINARY_API_SECRET"),

    FRONTEND_ORIGIN : getEnv("FRONTEND_ORIGIN " , "http://localhost:5173"),
});

export const Env = envconfig();
