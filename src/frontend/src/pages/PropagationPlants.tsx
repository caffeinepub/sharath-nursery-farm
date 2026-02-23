import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useGetAllPropagationPlants } from '../hooks/useQueries';
import { PropagationForm } from '../components/propagation/PropagationForm';
import { PropagationTable } from '../components/propagation/PropagationTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function PropagationPlants() {
  const { data: propagationPlants = [], isLoading } = useGetAllPropagationPlants();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = propagationPlants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (plant: any) => {
    setEditingPlant(plant);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingPlant(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nursery-primary">Propagation Plants</h1>
          <p className="text-muted-foreground">Manage propagated plants</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-nursery-primary hover:bg-nursery-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Propagation Plant
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search propagation plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <PropagationTable plants={filteredPlants} onEdit={handleEdit} isLoading={isLoading} />

      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-nursery-primary">
              {editingPlant ? 'Edit Propagation Plant' : 'Add New Propagation Plant'}
            </DialogTitle>
          </DialogHeader>
          <PropagationForm plant={editingPlant} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
