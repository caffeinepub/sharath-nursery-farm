import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { useDeletePot } from '../../hooks/useQueries';
import { formatCurrency } from '../../lib/utils';
import { toast } from 'sonner';
import type { Product } from '../../backend';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface PotTableProps {
  pots: Product[];
  onEdit: (pot: Product) => void;
  isLoading: boolean;
}

export function PotTable({ pots, onEdit, isLoading }: PotTableProps) {
  const deletePot = useDeletePot();

  const handleDelete = async (id: bigint) => {
    try {
      await deletePot.mutateAsync(id);
      toast.success('Pot deleted successfully');
    } catch (error) {
      toast.error('Failed to delete pot');
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (pots.length === 0) return <div className="text-center py-8">No pots found</div>;

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Size & Color</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Purchase Price</TableHead>
            <TableHead>Selling Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pots.map((pot) => (
            <TableRow key={Number(pot.id)}>
              <TableCell className="font-medium">{pot.name}</TableCell>
              <TableCell>{pot.size}" - {pot.color}</TableCell>
              <TableCell>{pot.potType}</TableCell>
              <TableCell>{formatCurrency(pot.purchasePrice)}</TableCell>
              <TableCell>{formatCurrency(pot.sellingPrice)}</TableCell>
              <TableCell>
                {Number(pot.stockQty) < 5 ? (
                  <Badge variant="destructive">{Number(pot.stockQty)}</Badge>
                ) : (
                  <span>{Number(pot.stockQty)}</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(pot)}>
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
                        <AlertDialogTitle>Delete Pot</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {pot.name}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(pot.id)} className="bg-destructive">
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
