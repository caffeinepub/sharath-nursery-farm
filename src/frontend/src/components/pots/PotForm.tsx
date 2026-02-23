import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddPot, useUpdatePot } from '../../hooks/useQueries';
import { toast } from 'sonner';
import type { Product } from '../../backend';

const POT_TYPES = ['Plastic', 'Ceramic', 'Clay', 'Cement', 'Metal', 'Fiber', 'Terracotta', 'Wooden', 'Other'];
const POT_SIZES = Array.from({ length: 19 }, (_, i) => (i + 4).toString());

interface PotFormProps {
  pot?: Product | null;
  onSuccess: () => void;
}

export function PotForm({ pot, onSuccess }: PotFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    color: '',
    potType: '',
    purchasePrice: '',
    sellingPrice: '',
    stockQty: '',
    image: '',
  });

  const addPot = useAddPot();
  const updatePot = useUpdatePot();

  useEffect(() => {
    if (pot) {
      setFormData({
        name: pot.name,
        size: pot.size || '',
        color: pot.color || '',
        potType: pot.potType || '',
        purchasePrice: pot.purchasePrice.toString(),
        sellingPrice: pot.sellingPrice.toString(),
        stockQty: pot.stockQty.toString(),
        image: pot.image || '',
      });
    }
  }, [pot]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        name: formData.name,
        size: formData.size,
        color: formData.color,
        potType: formData.potType,
        purchasePrice: parseFloat(formData.purchasePrice),
        sellingPrice: parseFloat(formData.sellingPrice),
        stockQty: BigInt(formData.stockQty),
        image: formData.image || null,
      };

      if (pot) {
        await updatePot.mutateAsync({ id: pot.id, ...data });
        toast.success('Pot updated successfully');
      } else {
        await addPot.mutateAsync(data);
        toast.success('Pot added successfully');
      }
      
      onSuccess();
    } catch (error) {
      toast.error('Failed to save pot');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Pot Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="size">Size (inches) *</Label>
          <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {POT_SIZES.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}"
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="color">Color *</Label>
          <Input
            id="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="potType">Pot Type *</Label>
        <Select value={formData.potType} onValueChange={(value) => setFormData({ ...formData, potType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select pot type" />
          </SelectTrigger>
          <SelectContent>
            {POT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
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

      <Button type="submit" className="w-full bg-nursery-primary hover:bg-nursery-primary/90" disabled={addPot.isPending || updatePot.isPending}>
        {pot ? 'Update Pot' : 'Add Pot'}
      </Button>
    </form>
  );
}
