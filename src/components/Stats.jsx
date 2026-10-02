import { dueStatus } from '../utils'

export default function Stats({ todos }) {
  const total = todos.length
  const done = todos.filter((t) => t.done).length
  const overdue = todos.filter((t) => dueStatus(t) === 'overdue').length
  const active = total - done - overdue
  const pct = total ? Math.round((done / total) * 100) : 0

  const segments = [
    { label: 'เสร็จแล้ว', value: done, stroke: 'stroke-emerald-500', dot: 'bg-emerald-500' },
    { label: 'กำลังทำ', value: active, stroke: 'stroke-indigo-500', dot: 'bg-indigo-500' },
    { label: 'เลยกำหนด', value: overdue, stroke: 'stroke-red-500', dot: 'bg-red-500' },
  ]
  let offset = 0

  return (
    <div className="rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
      <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">สถิติ</h2>
      <div className="flex items-center gap-4 md:flex-col md:items-stretch">
        <div className="relative mx-auto h-24 w-24 shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15.9155" fill="none" strokeWidth="4" className="stroke-slate-200 dark:stroke-slate-700" />
            {total > 0 &&
              segments.map((s) => {
                if (!s.value) return null
                const len = (s.value / total) * 100
                const el = (
                  <circle
                    key={s.label}
                    cx="18" cy="18" r="15.9155" fill="none" strokeWidth="4"
                    strokeDasharray={`${len} ${100 - len}`}
                    strokeDashoffset={-offset}
                    className={s.stroke}
                  />
                )
                offset += len
                return el
              })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold leading-none text-slate-800 dark:text-slate-100">{pct}%</span>
            <span className="mt-0.5 text-[10px] text-slate-400">สำเร็จ</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5 text-sm">
          <div className="flex justify-between text-slate-500 dark:text-slate-400">
            <span>งานทั้งหมด</span>
            <b className="text-slate-800 dark:text-slate-100">{total}</b>
          </div>
          {segments.map((s) => (
            <div key={s.label} className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
