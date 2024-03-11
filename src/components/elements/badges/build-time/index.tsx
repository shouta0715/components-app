export function BuildTimeBadge({ date }: { date: string }) {
  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-border">
      <svg
        aria-hidden="true"
        className="h-1.5 w-1.5 fill-green-400"
        viewBox="0 0 6 6"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      {date}に更新
    </span>
  );
}
