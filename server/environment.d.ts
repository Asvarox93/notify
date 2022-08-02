declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      dbUser: string;
      dbHost: string;
      dbDatabase: string;
      dbPassword: string;
      dbPort: number;
      dbDialect: Dialect;
      TOKEN_SECRET: Secret;
      REFRESH_TOKEN_SECRET: Secret;
    }
  }
}

export {};
