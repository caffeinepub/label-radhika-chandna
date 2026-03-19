import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem, Product } from "../backend.d";
import { useActor } from "./useActor";

export function useGetBestsellers() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["bestsellers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBestsellers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCart() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) return;
      await actor.addToCart(productId, BigInt(1));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useRemoveFromCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) return;
      await actor.removeFromCart(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await actor.clearCart();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
  });
}
