import { useMutation } from '@tanstack/react-query';
import { loginUser,LoginPayload } from '../service/UserService.ts';

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
};