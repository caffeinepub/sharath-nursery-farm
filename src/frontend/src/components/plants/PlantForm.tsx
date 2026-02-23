import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddPlant, useUpdatePlant } from '../../hooks/useQueries';
import { toast } from 'sonner';
import type { Product } from '../../backend';

const PLANT_CATEGORIES = ['Flowering', 'Indoor', 'Outdoor', 'Medicinal', 'Fruit', 'Vegetable', 'Succulent'];

interface PlantFormProps {
  plant?: Product | null;
  onSuccess: () => void;
}

export function PlantForm({ plant, onSuccess }: PlantFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    purchasePrice: '',
    sellingPrice: '',
    stockQty: '',
    image: '',
  });

  const addPlant = useAddPlant();
  const updatePlant = useUpdatePlant();

  useEffect(() => {
    if (plant) {
      setFormData({
        name: plant.name,
        category: plant.category || '',
        purchasePrice: plant.purchasePrice.toString(),
        sellingPrice: plant.sellingPrice.toString(),
        stockQty: plant.stockQty.toString(),
        image: plant.image || '',
      });
    }
  }, [plant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        name: formData.name,
        category: formData.category || null,
        purchasePrice: parseFloat(formData.purchasePrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        stockQty: BigInt(formData.stockQty),
        image: formData.image || null,
      };

      if (plant) {
        await updatePlant.mutateAsync({ id: plant.id, ...data });
        toast.success('Plant updated successfully');
      } else {
        await addPlant.mutateAsync(data);
        toast.success('Plant added successfully');
      }
      
      onSuccess();
    } catch (error) {
      toast.error('Failed to save plant');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Plant Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {PLANT_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="purchasePrice">Purchase Price (₹) *</Label>
          <Input
            id="purchasePrice"
            type="number"
            step="0.01"
            value={formData.purchasePrice}
            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="stockQty">Stock Quantity *</Label>
        <Input
          id="stockQty"
          type="number"
          value={formData.stockQty}
          onChange={(e) => setFormData({ ...formData, stockQty: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <Button type="submit" className="w-full bg-nursery-primary hover:bg-nursery-primary/90" disabled={addPlant.isPending || updatePlant.isPending}>
        {plant ? 'Update Plant' : 'Add Plant'}
      </Button>
    </form>
  );
}
