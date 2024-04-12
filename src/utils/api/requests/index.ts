import { api } from '@/utils/api/instance';

type PostAuthOptParams = CreateOtpDto;
export type PostAuthOptRequestConfig = RequestConfig<PostAuthOptParams>;

export const postAuthOpt = ({ params, config }: PostAuthOptRequestConfig) =>
  api.post<OtpResponse>('auth/otp', params, config);

type PostUsersSigninParams = SignInDto;
export type PostUsersSigninRequestConfig = RequestConfig<PostUsersSigninParams>;

export const postUsersSignin = ({ params, config }: PostUsersSigninRequestConfig) =>
  api.post<SignInResponse>('users/signin', params, config);
