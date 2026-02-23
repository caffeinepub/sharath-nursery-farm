import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useGetAllPots } from '../hooks/useQueries';
import { PotForm } from '../components/pots/PotForm';
import { PotTable } from '../components/pots/PotTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Pots() {
  const { data: pots = [], isLoading } = useGetAllPots();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPot, setEditingPot] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPots = pots.filter((pot) =>
    pot.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (pot: any) => {
    setEditingPot(pot);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPot(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">Pots Inventory</h1>
          <p className="text-muted-foreground">Manage your pot stock</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-nursery-primary hover:bg-nursery-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Pot
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search pots..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <PotTable pots={filteredPots} onEdit={handleEdit} isLoading={isLoading} />

      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-nursery-primary">
              {editingPot ? 'Edit Pot' : 'Add New Pot'}
            </DialogTitle>
          </DialogHeader>
          <PotForm pot={editingPot} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
