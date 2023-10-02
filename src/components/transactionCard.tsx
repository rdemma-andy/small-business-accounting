import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Link from "next/link";


type TransactionData = RouterOutputs["transactions"]["getAllwithCodeAndVendor"][number];
export const TransactionView = (props: TransactionData) => {
  return (
    <div key={props.id} className="flex gap-3 border-b border-slate-400 p-4">
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/vendor/${props.vendorId}`}>
              <span>{`${props.vendor.description} `}</span>
          </Link>
            <span className="font-thin">{` · ${dayjs(
              props.date
            ).format('MM/DD/YYYY')}`}</span>
        </div>
        <span className="text-2xl">{props.amount.toFixed(2)}</span>
      </div>
    </div>
  );
};