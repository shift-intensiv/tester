import { useMutation } from '@tanstack/react-query';

import type { PostAuthOptRequestConfig } from '@/utils/api/requests';
import { postAuthOpt } from '@/utils/api/requests';

export const usePostAuthOptMutation = (
  settings?: MutationSettings<PostAuthOptRequestConfig, typeof postAuthOpt>
) =>
  useMutation({
    mutationKey: ['postAuthOpt'],
    mutationFn: ({ params, config }) =>
      postAuthOpt({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
