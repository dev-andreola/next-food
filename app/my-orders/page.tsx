import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <>
      <div className="lg:border-b-[1px] lg:border-neutral-200 lg:pb-6">
        <Header />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        <div className="gap-2 space-y-4 lg:grid lg:grid-cols-2 lg:justify-stretch lg:space-y-0">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
