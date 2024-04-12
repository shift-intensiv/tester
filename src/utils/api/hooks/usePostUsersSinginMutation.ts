import { useMutation } from '@tanstack/react-query';

import type { PostUsersSigninRequestConfig } from '@/utils/api/requests';
import { postUsersSignin } from '@/utils/api/requests';

export const usePostUsersSinginMutation = (
  settings?: MutationSettings<PostUsersSigninRequestConfig, typeof postUsersSignin>
) =>
  useMutation({
    mutationKey: ['postUsersSignin'],
    mutationFn: ({ params, config }) =>
      postUsersSignin({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
