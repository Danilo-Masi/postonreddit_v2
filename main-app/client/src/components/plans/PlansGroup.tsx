export default function PlansGroup() {
  return (
    <div className="w-full md:w-1/3 h-auto min-h-[60svh] flex flex-col items-center justify-center p-5 bg-red-500">
      <div className="w-full h-min p-5 bg-green-500">
        <h1>Monthly</h1>
        <p className="text-sm underline">9.99$<span className="text-xl font-bold"> 7.99$</span></p>
      </div>
      <div className="w-full h-min p-5 bg-blue-500">
        <h1>Lifetime</h1>
        <p>59$</p>
      </div>
    </div>
  )
}
