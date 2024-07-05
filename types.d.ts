declare namespace Express {
  export interface Request {
    user: any
  }
  export interface Response {
    user: any
  }
  export interface ProcessEnv {
    ORIGIN_URL: string
  }
}
