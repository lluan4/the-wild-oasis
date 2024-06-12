import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllSettings, UpdateSettings } from "../services/apiSettings";
import toast from "react-hot-toast";

export function useSetting() {
  const queryClient = useQueryClient();

  function useGetAllSettings() {
    const result = useQuery({
      queryKey: ["settings"],
      queryFn: GetAllSettings,
    });
    return result;
  }

  function useGetUpdateSettings() {
    const result = useMutation({
      mutationFn: UpdateSettings,
      onSuccess: () => {
        toast.success("Settings successfully update");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (error) => {
        toast(error.message);
      },
    });
    return result;
  }
  return {
    useGetAllSettings,
    useGetUpdateSettings,
  };
}
