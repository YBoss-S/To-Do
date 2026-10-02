import { CATEGORIES, CATEGORY_KEYS } from '../constants'

export default function CategoryNav({ todos, value, onChange }) {
  const count = (k) => todos.filter((t) => t.category === k).length
  const items = [
    { key: 'all', label: 'ทุกหมวดหมู่', dot: 'bg-slate-400', n: todos.length },
    ...CATEGORY_KEYS.map((k) => ({ key: k, label: CATEGORIES[k].label, dot: CATEGORIES[k].dot, n: count(k) })),
  ]
  return (
    <nav className="rounded-2xl bg-white p-2 shadow-md ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
      <div className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onChange(it.key)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
              value === it.key
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300'
                : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${it.dot}`} />
            <span className="flex-1 whitespace-nowrap text-left">{it.label}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-300">
              {it.n}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
