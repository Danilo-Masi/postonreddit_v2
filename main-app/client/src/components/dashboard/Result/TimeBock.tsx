export default function TimeBock() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getUTCDay();


    return (
        <div className="w-full md:w-[calc(33%-11px)] h-fit flex flex-col gap-2 rounded-lg p-5 bg-zinc-800 border border-zinc-700">
            <h1 className="text-lg font-semibold text-zinc-100">1st place</h1>
            <h3 className="text-base font-light text-zinc-300">{`${day}/${month}/${year}`} - 10.00</h3>
            <p className="text-base font-semibold text-blue-400">Score: 4</p>
        </div>
    )
}
