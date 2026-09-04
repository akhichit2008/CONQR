interface MonthlyCount {
  month: string;
  proposals: number;
}

const DATA: MonthlyCount[] = [
  { month: "Apr", proposals: 2 },
  { month: "May", proposals: 4 },
  { month: "Jun", proposals: 3 },
  { month: "Jul", proposals: 6 },
  { month: "Aug", proposals: 5 },
  { month: "Sep", proposals: 8 },
];

const BAR_MAX_HEIGHT = 110;
const MAX_VALUE = Math.max(...DATA.map((entry) => entry.proposals));

export function ActivityBarChart() {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <h3 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
        Proposals sent per month
      </h3>

      <div className="mt-6 flex items-end gap-4">
        {DATA.map((entry) => {
          const barHeight = (entry.proposals / MAX_VALUE) * BAR_MAX_HEIGHT;
          return (
            <div key={entry.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-xs text-neutral-400">{entry.proposals}</span>
              <div
                className="w-full rounded-t-sm bg-[#09C7C4]"
                style={{ height: Math.max(barHeight, 4) }}
              />
              <span className="text-xs text-neutral-500">{entry.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
