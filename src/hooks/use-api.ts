import type { AxiosError } from "axios";
import { useCallback, useState } from "react";

type UseApiReturn<FunctionType, ResultType, ErrorType> = [
  {
    data?: ResultType;
    isLoading: boolean;
    isError: boolean;
    error?: ErrorType;
  },
  FunctionType
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export type ReturnTypeAsync<T extends (...args: Any[]) => Any> = T extends (
  ...args: Any[]
) => Promise<infer R>
  ? R
  : T extends (...args: Any[]) => infer R
  ? R
  : Any;

export const useApi = <
  FunctionType extends (...params: Any) => Promise<ResultType | ErrorType>,
  ResultType = ReturnTypeAsync<FunctionType>,
  ErrorType extends Error = AxiosError<{
    code: number;
    name: string;
    message: string;
  }>
>(
  asyncFn: FunctionType
): UseApiReturn<FunctionType, ResultType, ErrorType> => {
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ResultType>();
  const [error, setError] = useState<ErrorType>();

  const execute = useCallback(
    async (...args: Any[]) => {
      setIsLoading(true);

      try {
        const result = await asyncFn(...args);

        if (result instanceof Error) throw result;

        setData(result);

        return result as ResultType;
      } catch (error) {
        setError(error as ErrorType);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn]
  ) as FunctionType;

  return [{ isError, isLoading, data, error }, execute];
};
