export const JWKS_SERVICE = Symbol("JWKS_SERVICE");

export interface JwksService {
  verifyJwt(jwt: string): Promise<string>;
}