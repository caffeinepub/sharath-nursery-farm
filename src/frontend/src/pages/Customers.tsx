import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useGetAllCustomers } from '../hooks/useQueries';
import { CustomerTable } from '../components/customers/CustomerTable';
import { CustomerDetail } from '../components/customers/CustomerDetail';

export default function Customers() {
  const { data: customers = [], isLoading } = useGetAllCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-nursery-primary">Customers</h1>
        <p className="text-muted-foreground">View customer purchase history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-nursery-primary">Customer List</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <CustomerTable
            customers={filteredCustomers}
            onSelectCustomer={setSelectedCustomer}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
