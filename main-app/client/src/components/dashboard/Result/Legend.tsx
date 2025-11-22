export default function Legend() {
  return (
    <div className="w-full h-fit flex items-center justify-end md:justify-start gap-1">
      <p className="text-sm text-zinc-400">Less</p>
      <div className="w-3 h-3 bg-zinc-700 rounded-xs" />
      <div className="w-3 h-3 bg-orange-900 rounded-xs" />
      <div className="w-3 h-3 bg-orange-700 rounded-xs" />
      <div className="w-3 h-3 bg-orange-500 rounded-xs" />
      <div className="w-3 h-3 bg-orange-300 rounded-xs" />
      <p className="text-sm text-zinc-400">More</p>
    </div>
  )
}
