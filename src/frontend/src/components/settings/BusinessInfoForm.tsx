import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BusinessInfoForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label>Business Name</Label>
        <Input defaultValue="Sharath Nursery Farm" />
      </div>
      <div>
        <Label>Owner Name</Label>
        <Input defaultValue="Dr. Sagar DN" />
      </div>
      <div>
        <Label>Address</Label>
        <Input defaultValue="Near Prasanth School, Maddur Malavalli Main Road, KM Doddi - 571422" />
      </div>
      <div>
        <Label>WhatsApp</Label>
        <Input defaultValue="9964893711" />
      </div>
      <div>
        <Label>Instagram</Label>
        <Input defaultValue="@sharathnursery" />
      </div>
      <Button className="bg-nursery-primary">Save Changes</Button>
    </form>
  );
}
