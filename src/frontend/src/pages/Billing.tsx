import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useGetAllSales } from '../hooks/useQueries';
import { InventorySearch } from '../components/billing/InventorySearch';
import { CartTable } from '../components/billing/CartTable';
import { PaymentSection } from '../components/billing/PaymentSection';
import { BillSuccessModal } from '../components/billing/BillSuccessModal';
import { formatDate } from '../lib/utils';

export default function Billing() {
  const { data: sales = [] } = useGetAllSales();
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [billData, setBillData] = useState<any>(null);

  const nextBillNumber = `#SNF-${String(sales.length + 1).padStart(3, '0')}`;
  const currentDate = formatDate(BigInt(Date.now() * 1000000));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-primary">Billing / Sales</h1>
        <p className="text-muted-foreground">Create new bill and manage sales</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-nursery-primary">Bill Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Bill Number</Label>
                  <p className="text-lg font-semibold text-nursery-primary">{nextBillNumber}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-lg font-semibold">{currentDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 border-t pt-4">
                <Switch
                  id="customer-details"
                  checked={showCustomerDetails}
                  onCheckedChange={setShowCustomerDetails}
                />
                <Label htmlFor="customer-details" className="cursor-pointer">
                  Add Customer Details?
                </Label>
              </div>
            </CardContent>
          </Card>

          <InventorySearch showCustomerDetails={showCustomerDetails} />
          <CartTable />
        </div>

        <div>
          <PaymentSection
            billNumber={nextBillNumber}
            showCustomerDetails={showCustomerDetails}
            onBillGenerated={setBillData}
          />
        </div>
      </div>

      {billData && (
        <BillSuccessModal
          billData={billData}
          onClose={() => setBillData(null)}
        />
      )}
    </div>
  );
}
