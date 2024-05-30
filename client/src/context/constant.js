export const apiUrl =
    process.env.NODE_ENV == "production"
    ? "http://localhost:4001"
    : "http://localhost:4001"

export const LOCAL_STORAGE_TOKEN_NAME = "token";