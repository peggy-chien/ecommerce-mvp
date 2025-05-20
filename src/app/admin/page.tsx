import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import prisma from "@/lib/prisma";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: {
      pricePaidInCents: true,
    },
    _count: true
  });

  return {
    ammount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  }
}

async function getCustomerData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: {
        pricePaidInCents: true,
      }
    })
  ]);

  return {
    userCount,
    averageValuePerCustomer: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchase: true
      }
    }),
    prisma.product.count({
      where: {
        isAvailableForPurchase: false
      }
    })
  ])

  return {
    activeCount,
    inactiveCount
  }
}

export default async function AdminDashboard() {
  const [salesData, customerData, productData] = await Promise.all([
    getSalesData(),
    getCustomerData(),
    getProductData()
  ]);
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <DashboardCard
      title="Sales"
      subtitle={`${formatNumber(salesData.numberOfSales)} orders`}
      body={formatCurrency(salesData.ammount)}
    />
    <DashboardCard
      title="Customer"
      subtitle={`${formatNumber(customerData.userCount)} average value`}
      body={formatCurrency(customerData.averageValuePerCustomer)}
    />
    <DashboardCard
      title="Active Products"
      subtitle={`${formatNumber(productData.inactiveCount)} inactive`}
      body={formatNumber(productData.activeCount)}
    />
  </div>;
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
}

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}