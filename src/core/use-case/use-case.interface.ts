import type { Result } from '@/core/result/result';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- We need to use any to be able to register the use cases in the container without having to specify the payload and result types
export interface IUseCase<TPayload extends object = any, TResultResponse extends object = any> {
  execute(payload: TPayload): Promise<Result<TResultResponse>>;
}