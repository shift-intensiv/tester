import { useMutation } from '@tanstack/react-query';

import type { PatchUsersSessionRequestConfig } from '@/utils/api/requests';
import { patchUsersSession } from '@/utils/api/requests';

export const usePatchUsersSessionMutation = (
  settings?: MutationSettings<PatchUsersSessionRequestConfig, typeof patchUsersSession>
) =>
  useMutation({
    mutationKey: ['patchUsersSession'],
    mutationFn: ({ params, config }) =>
      patchUsersSession({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options
  });
