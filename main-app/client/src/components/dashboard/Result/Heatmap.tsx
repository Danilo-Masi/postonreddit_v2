// Heatmap.tsx
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}`);

export default function Heatmap({ data }: any) {
    return (
        <div className="flex gap-2">
            {/* Colonna sinistra: labels giorni */}
            <div className="flex flex-col justify-between py-[6px] mr-2">
                {days.map((day) => (
                    <div key={day} className="h-6 text-sm text-gray-400 flex items-center">
                        {day.slice(0, 3)}
                    </div>
                ))}
            </div>

            {/* Griglia */}
            <div className="w-full flex flex-col items-start justify-center overflow-x-scroll gap-[5px]">
                {days.map((day, dayIndex) => (
                    <div key={day} className="flex gap-[5px] ">
                        {hours.map((_, hourIndex) => {
                            const value = data[dayIndex]?.[hourIndex] ?? 0;
                            return (
                                <div
                                    key={`${dayIndex}-${hourIndex}`}
                                    className={`w-5 h-5 rounded-xs transition-colors duration-200 ${getColor(value)}`} />
                            );
                        })}
                    </div>
                ))}
            </div>

        </div>
    );
}

function getColor(v: any) {
    if (v === 0) return "bg-zinc-700";
    if (v < 2) return "bg-orange-900";
    if (v < 4) return "bg-orange-700";
    if (v < 6) return "bg-orange-500";
    return "bg-orange-300";
}