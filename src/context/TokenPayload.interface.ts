import { JwtPayload } from 'jwt-decode';

export interface TokenPayload extends JwtPayload {
  email: string;
  role: string;
  sub: string;
}
