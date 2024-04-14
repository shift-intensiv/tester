import { api } from '@/utils/api/instance';

type PostAuthOptParams = CreateOtpDto;
export type PostAuthOptRequestConfig = RequestConfig<PostAuthOptParams>;

export const postAuthOpt = ({ params, config }: PostAuthOptRequestConfig) =>
  api.post<OtpResponse>('auth/otp', params, config);

type PostUsersSigninParams = SignInDto;
export type PostUsersSigninRequestConfig = RequestConfig<PostUsersSigninParams>;

export const postUsersSignin = ({ params, config }: PostUsersSigninRequestConfig) =>
  api.post<SignInResponse>('users/signin', params, config);

type GetUsersSessionRequestConfig = RequestConfig | void;

export const getUsersSession = (requestConfig?: GetUsersSessionRequestConfig) =>
  api.get<SessionResponse>('users/session', requestConfig?.config);

type PatchUsersSessionParams = UpdateProfileDto;
export type PatchUsersSessionRequestConfig = RequestConfig<PatchUsersSessionParams>;

export const patchUsersSession = ({ params, config }: PatchUsersSessionRequestConfig) =>
  api.patch<SignInResponse>('users/profile', params, config);
