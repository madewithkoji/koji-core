declare type UserToken = string | null;

declare enum ApiEndpoints {
  DATABASE_PRODUCTION = 'https://database.api.gokoji.com',
  REST_PRODUCTION = 'https://rest.api.gokoji.com',
  DISPATCH_PRODUCTION = 'wss://dispatch.api.gokoji.com',
}
