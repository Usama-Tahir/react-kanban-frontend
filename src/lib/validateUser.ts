import jwt_decode, { JwtPayload } from 'jwt-decode';
export const isAuthenticUser = () => {
  const token: string | null = localStorage.getItem('token');
  let authenticatedUser: boolean = false;
  if (token) {
    const decoded: JwtPayload = decodeJwt(token);
    const { exp } = decoded;
    if (exp) {
      const now = new Date();
      const secondsSinceEpoch = Math.round(now.getTime() / 1000);
      if (secondsSinceEpoch < exp) {
        authenticatedUser = true;
      }
    }
  }
  return authenticatedUser;
};
export const decodeJwt = (jwtToken: string) => {
  return jwt_decode<JwtPayload>(jwtToken);
};
