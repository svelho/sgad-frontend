class Credentials {
  name: string | undefined;
  email: string | undefined;
  token: string | undefined;
  refreshToken: string | undefined;
  expirationTime: number | undefined;
  uid: string | undefined;
  photoUrl: string | undefined;
  area: string | undefined;
  position: string | undefined;
  phone: string | undefined;
  onboarding: boolean | undefined;
}

export default Credentials;

export interface ListCredentials {
  users: Credentials[];
}
