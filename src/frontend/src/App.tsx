import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { AppLayout } from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Pots from './pages/Pots';
import PropagationPlants from './pages/PropagationPlants';
import Billing from './pages/Billing';
import DeadPlants from './pages/DeadPlants';
import Expenses from './pages/Expenses';
import Workers from './pages/Workers';
import Customers from './pages/Customers';
import MonthlySalesReport from './pages/MonthlySalesReport';
import YearlySalesReport from './pages/YearlySalesReport';
import ROIReport from './pages/ROIReport';
import CAGRReport from './pages/CAGRReport';
import DeadPlantReport from './pages/DeadPlantReport';
import Settings from './pages/Settings';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const plantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plants',
  component: Plants,
});

const potsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pots',
  component: Pots,
});

const propagationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/propagation',
  component: PropagationPlants,
});

const billingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/billing',
  component: Billing,
});

const deadPlantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dead-plants',
  component: DeadPlants,
});

const expensesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/expenses',
  component: Expenses,
});

const workersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/workers',
  component: Workers,
});

const customersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customers',
  component: Customers,
});

const monthlyReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/monthly',
  component: MonthlySalesReport,
});

const yearlyReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/yearly',
  component: YearlySalesReport,
});

const roiReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/roi',
  component: ROIReport,
});

const cagrReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/cagr',
  component: CAGRReport,
});

const deadPlantReportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports/dead-plants',
  component: DeadPlantReport,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  plantsRoute,
  potsRoute,
  propagationRoute,
  billingRoute,
  deadPlantsRoute,
  expensesRoute,
  workersRoute,
  customersRoute,
  monthlyReportRoute,
  yearlyReportRoute,
  roiReportRoute,
  cagrReportRoute,
  deadPlantReportRoute,
  settingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
