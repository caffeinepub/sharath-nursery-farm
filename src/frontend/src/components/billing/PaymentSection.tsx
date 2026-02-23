import { Button } from '@/components/ui/button';

export function PaymentSection({ billNumber, showCustomerDetails, onBillGenerated }: any) {
  return (
    <div className="p-4 border rounded space-y-4">
      <h3 className="font-semibold">Payment Section</h3>
      <Button className="w-full bg-nursery-primary">Generate Bill</Button>
    </div>
  );
}
