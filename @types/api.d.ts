interface MutationSettings<Params = void, Func = unknown> {
  config?: ApiRequestConfig;
  options?: import('@tanstack/react-query').UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface QuerySettings<Func = unknown> {
  config?: ApiRequestConfig;
  options?: Omit<
    import('@tanstack/react-query').UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey'
  >;
}

type ApiRequestConfig = import('axios').AxiosRequestConfig;

type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

interface BaseResponse {
  success: boolean;
  reason?: string;
}

interface CreateOtpDto {
  phone: string;
}

interface OtpResponse extends BaseResponse {
  retryDelay: number;
}

interface SignInDto {
  phone: string;
  code: number;
}

interface UpdateProfileDto {
  phone: string;
  profile: {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    city: string;
  };
}

interface User {
  phone: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  email?: string;
  city?: string;
}

interface SignInResponse extends BaseResponse {
  user: User;
  token: string;
}

interface SessionResponse extends BaseResponse {
  user: User;
}

interface UpdateProfileResponse extends BaseResponse {
  user: User;
}
