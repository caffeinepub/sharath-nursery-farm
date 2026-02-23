import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { useGetAllPlants } from '../hooks/useQueries';
import { PlantForm } from '../components/plants/PlantForm';
import { PlantTable } from '../components/plants/PlantTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PLANT_CATEGORIES = [
  'All',
  'Flowering',
  'Indoor',
  'Outdoor',
  'Medicinal',
  'Fruit',
  'Vegetable',
  'Succulent',
];

export default function Plants() {
  const { data: plants = [], isLoading } = useGetAllPlants();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || plant.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-3xl font-bold text-nursery-primary">Plants Inventory</h1>
          <p className="text-muted-foreground">Manage your plant stock</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-nursery-primary hover:bg-nursery-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Plant
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {PLANT_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <PlantTable plants={filteredPlants} onEdit={handleEdit} isLoading={isLoading} />

      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-nursery-primary">
              {editingPlant ? 'Edit Plant' : 'Add New Plant'}
            </DialogTitle>
          </DialogHeader>
          <PlantForm plant={editingPlant} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
