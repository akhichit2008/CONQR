interface BudgetSlice {
  label: string;
  percentage: number;
  color: string;
}

const SLICES: BudgetSlice[] = [
  { label: "Education", percentage: 45, color: "#0A9490" },
  { label: "Healthcare", percentage: 30, color: "#B8863D" },
  { label: "Rural development", percentage: 25, color: "#6C4FE0" },
];

const RADIUS = 70;
const STROKE_WIDTH = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BudgetPieChart() {
  let offset = 0;

  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <h3 className="font-mono text-xs uppercase tracking-wide text-neutral-500">
        Budget allocation by focus area
      </h3>

      <div className="mt-4 flex items-center gap-6">
        <svg viewBox="0 0 200 200" className="h-40 w-40 shrink-0 -rotate-90">
          {SLICES.map((slice) => {
            const dash = (slice.percentage / 100) * CIRCUMFERENCE;
            const circle = (
              <circle
                key={slice.label}
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={slice.color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                strokeDashoffset={-offset}
              />
            );
            offset += dash;
            return circle;
          })}
        </svg>

        <ul className="flex flex-col gap-2">
          {SLICES.map((slice) => (
            <li key={slice.label} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
              <span className="text-neutral-300">{slice.label}</span>
              <span className="font-mono text-neutral-500">{slice.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
