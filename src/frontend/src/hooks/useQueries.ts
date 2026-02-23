import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Sale, DeadPlant, Expense, Worker, Customer, SaleItem } from '../backend';

export function useGetAllPlants() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['plants'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPots() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['pots'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPots();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllPropagationPlants() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['propagation'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPropagationPlants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLowStockPlants() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['lowStock'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLowStockPlants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllSales() {
  const { actor, isFetching } = useActor();
  return useQuery<Sale[]>({
    queryKey: ['sales'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSales();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllDeadPlants() {
  const { actor, isFetching } = useActor();
  return useQuery<DeadPlant[]>({
    queryKey: ['deadPlants'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllDeadPlants();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllExpenses() {
  const { actor, isFetching } = useActor();
  return useQuery<Expense[]>({
    queryKey: ['expenses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExpenses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllWorkers() {
  const { actor, isFetching } = useActor();
  return useQuery<Worker[]>({
    queryKey: ['workers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWorkers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllCustomers() {
  const { actor, isFetching } = useActor();
  return useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCustomers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      category: string | null;
      purchasePrice: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPlant(
        data.name,
        data.category,
        data.purchasePrice,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useUpdatePlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      category: string | null;
      purchasePrice: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePlant(
        data.id,
        data.name,
        data.category,
        data.purchasePrice,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useDeletePlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePlant(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useAddPot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      size: string;
      color: string;
      potType: string;
      purchasePrice: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPot(
        data.name,
        data.size,
        data.color,
        data.potType,
        data.purchasePrice,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useUpdatePot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      size: string;
      color: string;
      potType: string;
      purchasePrice: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePot(
        data.id,
        data.name,
        data.size,
        data.color,
        data.potType,
        data.purchasePrice,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useDeletePot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePot(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useAddPropagationPlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      propagationType: string;
      parentPlant: bigint;
      actualCost: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPropagationPlant(
        data.name,
        data.propagationType,
        data.parentPlant,
        data.actualCost,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propagation'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useUpdatePropagationPlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: bigint;
      name: string;
      propagationType: string;
      parentPlant: bigint;
      actualCost: number;
      sellingPrice: number;
      stockQty: bigint;
      image: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.updatePropagationPlant(
        data.id,
        data.name,
        data.propagationType,
        data.parentPlant,
        data.actualCost,
        data.sellingPrice,
        data.stockQty,
        data.image
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propagation'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useDeletePropagationPlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePropagationPlant(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['propagation'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useCreateSale() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      billNo: string;
      date: bigint;
      customerName: string | null;
      customerPhone: string | null;
      isWalkIn: boolean;
      items: SaleItem[];
      subtotal: number;
      discount: number;
      discountReason: string | null;
      totalPaid: number;
      paymentMode: string;
      savedMessage: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createSale(
        data.billNo,
        data.date,
        data.customerName,
        data.customerPhone,
        data.isWalkIn,
        data.items,
        data.subtotal,
        data.discount,
        data.discountReason,
        data.totalPaid,
        data.paymentMode,
        data.savedMessage
      );
      
      if (!data.isWalkIn && data.customerPhone) {
        const customers = await actor.getAllCustomers();
        const existingCustomer = customers.find(c => c.phone === data.customerPhone);
        
        if (!existingCustomer && data.customerName) {
          await actor.addCustomer(data.customerName, data.customerPhone);
        }
        
        await actor.updateCustomerStats(
          data.customerPhone,
          BigInt(1),
          data.totalPaid,
          data.discount
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['propagation'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useAddDeadPlant() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      date: bigint;
      productId: bigint;
      productName: string;
      deadQuantity: bigint;
      purchasePriceEach: number;
      totalLoss: number;
      reason: string;
      notes: string | null;
      photo: string | null;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addDeadPlant(
        data.date,
        data.productId,
        data.productName,
        data.deadQuantity,
        data.purchasePriceEach,
        data.totalLoss,
        data.reason,
        data.notes,
        data.photo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deadPlants'] });
      queryClient.invalidateQueries({ queryKey: ['plants'] });
      queryClient.invalidateQueries({ queryKey: ['pots'] });
      queryClient.invalidateQueries({ queryKey: ['propagation'] });
      queryClient.invalidateQueries({ queryKey: ['lowStock'] });
    },
  });
}

export function useAddExpense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      date: bigint;
      category: string;
      description: string;
      amount: number;
      paymentMode: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addExpense(
        data.date,
        data.category,
        data.description,
        data.amount,
        data.paymentMode
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
}

export function useAddWorker() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      salary: number;
      joinDate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addWorker(data.name, data.phone, data.salary, data.joinDate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
}

export function useAddWorkerPayment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      workerId: bigint;
      date: bigint;
      amount: number;
      paymentMode: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addWorkerPayment(
        data.workerId,
        data.date,
        data.amount,
        data.paymentMode
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
}
