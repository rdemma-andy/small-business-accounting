import type { RouterOutputs } from "~/utils/api";


type VendorData = RouterOutputs["vendors"]["getAll"][number];
export const VendorView = (props: VendorData) => {
  return (
    <div key={props.id} className="flex gap-3 border-b border-slate-400 p-4">
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
            <span>{`${props.description} `}</span>
            <span className="font-thin">{`${props.gLCode.number} `}</span>
        </div>
      </div>
    </div>
  );
};