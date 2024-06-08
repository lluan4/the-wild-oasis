import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCabin,
  DeleteCabin,
  GetAllCabins,
} from "../services/cabins/apiCabins";
import toast from "react-hot-toast";

export function useCabins() {
  const queryClient = useQueryClient();

  function useCreateCabins() {
    const result = useMutation({
      mutationFn: CreateCabin,
      onSuccess: () => {
        toast.success("Cabin successfully created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (error) => {
        toast(error.message);
      },
    });
    return result;
  }

  function useDeleteCabins() {
    const result = useMutation({
      mutationFn: DeleteCabin,
      onSuccess: () => {
        toast.success("Cabin successfully deleted");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (error) => {
        toast(error.message);
      },
    });
    return result;
  }

  function useGetAllCabins() {
    const result = useQuery({
      queryKey: ["cabins"],
      queryFn: GetAllCabins,
    });
    return result;
  }

  return { useDeleteCabins, useGetAllCabins, useCreateCabins };
}
