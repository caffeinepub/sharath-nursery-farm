import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function BillSuccessModal({ billData, onClose }: any) {
  return (
    <Dialog open={!!billData} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-xl font-bold text-nursery-primary">Bill Generated Successfully!</h2>
        <div className="space-y-2">
          <Button className="w-full">Print Bill</Button>
          <Button className="w-full" variant="outline">Download PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
