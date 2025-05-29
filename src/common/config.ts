type ConfigType ={
    API_URL_INTRANET: string
    API_URL_SIGAS: string
}

export const Config:ConfigType={
    API_URL_INTRANET: process.env.NEXT_PUBLIC_API_URL_INTRANET || "https://localhost:44365",
    API_URL_SIGAS: process.env.NEXT_PUBLIC_API_URL_SIGAS || "https://localhost:44340"
}