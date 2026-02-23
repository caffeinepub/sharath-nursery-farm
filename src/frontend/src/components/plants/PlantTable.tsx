import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { useDeletePlant } from '../../hooks/useQueries';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'sonner';
import type { Product } from '../../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface PlantTableProps {
  plants: Product[];
  onEdit: (plant: Product) => void;
  isLoading: boolean;
}

export function PlantTable({ plants, onEdit, isLoading }: PlantTableProps) {
  const deletePlant = useDeletePlant();

  const handleDelete = async (id: bigint) => {
    try {
      await deletePlant.mutateAsync(id);
      toast.success('Plant deleted successfully');
    } catch (error) {
      toast.error('Failed to delete plant');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  if (plants.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No plants found</div>;
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant) => (
            <TableRow key={Number(plant.id)}>
              <TableCell className="font-medium">{plant.name}</TableCell>
              <TableCell>{plant.category || '-'}</TableCell>
              <TableCell>{formatCurrency(plant.purchasePrice)}</TableCell>
              <TableCell>{formatCurrency(plant.sellingPrice)}</TableCell>
              <TableCell>
                {Number(plant.stockQty) < 5 ? (
                  <Badge variant="destructive">{Number(plant.stockQty)}</Badge>
                ) : (
                  <span>{Number(plant.stockQty)}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(plant)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Plant</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {plant.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(plant.id)} className="bg-destructive hover:bg-destructive/90">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
