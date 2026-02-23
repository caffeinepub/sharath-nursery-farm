import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function PropagationForm({ plant, onSuccess }: any) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Propagation plant saved');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Plant Name</Label>
        <Input required />
      </div>
      <Button type="submit" className="w-full bg-nursery-primary">Save</Button>
    </form>
  );
}
