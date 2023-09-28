import type { RouterOutputs } from "~/utils/api";


type GeneralLedgerCodeData = RouterOutputs["generalLedgerCodes"]["getAll"][number];
export const VendorView = (props: GeneralLedgerCodeData) => {
  return (
    <div key={props.id} className="flex gap-3 border-b border-slate-400 p-4">
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
            <span>{`${props.name} `}</span>
            <span className="font-thin">{`${props.number} `}</span>
        </div>
      </div>
    </div>
  );
};