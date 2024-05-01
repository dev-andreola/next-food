import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Decimal } from "@prisma/client/runtime/library";

interface DeliveryInfoProps {
  deliveryFee: Decimal;
  deliveryTimeMinutes: number;
}

const DeliveryInfo = ({
  deliveryFee,
  deliveryTimeMinutes,
}: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around py-2">
      {/* FEE */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>

        {Number(deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(deliveryFee))}
          </p>
        ) : (
          <p className="text-xs font-semibold">Grátis</p>
        )}
      </div>
      {/* TIME */}
      <div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14} />
          </div>

          <p className="text-xs font-semibold">{deliveryTimeMinutes}min</p>
        </div>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
