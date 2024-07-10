import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
} from "@tanstack/react-query";

type OptimisticProps<TData = unknown, TVariables = void, TQueryFnData = any> = {
  mutationFn: MutationFunction<TData, TVariables>;
  queryKey: QueryKey;
  updater: (
    input: TQueryFnData | undefined,
    variables: TVariables,
  ) => TQueryFnData | undefined;
  invalidates: QueryKey;
};

export const useOptimisticMutation = <TData = unknown, TVariables = void>({
  mutationFn,
  queryKey,
  updater,
  invalidates,
}: OptimisticProps<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const snapshot = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (prevData) =>
        updater(prevData, variables),
      );

      return () => {
        queryClient.setQueryData(queryKey, snapshot);
      };
    },
    onError: (err, variables, rollback) => {
      rollback?.();
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: invalidates,
      });
    },
  });
};
