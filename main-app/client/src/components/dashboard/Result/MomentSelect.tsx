import DateTimePicker from "./DateTimePicker";
import Heatmap from "./Heatmap";

interface MomentSelectProps {
    sub: string;
}

const data = [
    Array(24).fill(1), // Monday
    Array(24).fill(2), // Tuesday
    Array(24).fill(3),
    Array(24).fill(4),
    Array(24).fill(5),
    Array(24).fill(6),
    Array(24).fill(7),
];

export default function MomentSelect({ sub }: MomentSelectProps) {
    return (
        <div className="w-full flex flex-col gap-6">
            <h3 className="text-lg text-zinc-100 font-semibold">{sub} (Next 7 days)</h3>
            <DateTimePicker />
            <Heatmap data={data} />
        </div>
    )
}
