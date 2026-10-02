import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { FILTERS, ORDER, PRIORITIES } from './constants'

const INITIAL_TODOS = [
  { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
  { id: 3, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low' },
]

export default function App() {
  const nextId = useRef(4)
  const [todos, setTodos] = useState(INITIAL_TODOS)
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  const add = () => {
    const t = text.trim()
    if (!t) return
    setTodos((prev) => [{ id: nextId.current++, text: t, done: false, priority }, ...prev])
    setText('')
  }
  const toggle = (id) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const edit = (id, newText) => setTodos((p) => p.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  const cycle = (id) =>
    setTodos((p) =>
      p.map((t) => (t.id === id ? { ...t, priority: ORDER[(ORDER.indexOf(t.priority) + 1) % ORDER.length] } : t))
    )
  const remove = (id) => {
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => setTodos((p) => p.filter((t) => t.id !== id)), 300)
  }
  const clearDone = () => {
    setTodos((p) => p.map((t) => (t.done ? { ...t, leaving: true } : t)))
    setTimeout(() => setTodos((p) => p.filter((t) => !t.done)), 300)
  }

  const remaining = todos.filter((t) => !t.done && !t.leaving).length
  const doneCount = todos.filter((t) => t.done).length
  const visible = todos.filter((t) => filter === 'all' || (filter === 'active' ? !t.done : t.done))

  return (
    <div className="mx-auto min-h-screen w-full max-w-xl px-4 py-8 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100 sm:text-3xl">
        รายการสิ่งที่ต้องทำ
      </h1>

      {/* Add card */}
      <div className="mb-5 rounded-2xl bg-white p-4 shadow-md ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            onClick={add}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 active:scale-95"
          >
            <Plus size={18} /> <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm text-slate-500 dark:text-slate-400">ความสำคัญ:</span>
          {ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition ${
                priority === k
                  ? PRIORITIES[k].badge + ' ring-2 ring-current ring-offset-1 dark:ring-offset-slate-800'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${PRIORITIES[k].dot}`} />
              {PRIORITIES[k].label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-xl bg-slate-200/70 p-1 dark:bg-slate-800">
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`rounded-lg py-2 text-sm font-medium transition ${
              filter === k
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-600 dark:text-white'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* List */}
      <div>
        {visible.length === 0 && (
          <div className="rounded-xl bg-white/60 py-10 text-center text-slate-400 dark:bg-slate-800/60">
            {filter === 'completed' ? 'ยังไม่มีงานที่เสร็จ' : 'ไม่มีงานในรายการ 🎉'}
          </div>
        )}
        {visible.map((t) => (
          <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={remove} onEdit={edit} onCycle={cycle} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between px-1 text-sm text-slate-500 dark:text-slate-400">
        <span>
          เหลืออีก <b className="text-slate-700 dark:text-slate-200">{remaining}</b> งาน
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className="rounded-lg px-3 py-1.5 font-medium text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:hover:bg-slate-800"
        >
          ล้างที่เสร็จแล้ว ({doneCount})
        </button>
      </div>
      <p className="mt-6 text-center text-xs text-slate-400">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข • คลิกป้ายเพื่อเปลี่ยนระดับความสำคัญ
      </p>
    </div>
  )
}
