import { Dialog, DialogContent } from '@/components/ui/dialog';

export function CustomerDetail({ customer, onClose }: any) {
  return (
    <Dialog open={!!customer} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-xl font-bold">{customer?.name}</h2>
      </DialogContent>
    </Dialog>
  );
}
