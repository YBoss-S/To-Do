import { useEffect, useRef, useState } from 'react'
import { Calendar, Check, Pencil, Trash2 } from 'lucide-react'
import { CATEGORIES, PRIORITIES } from '../constants'
import { dueStatus, formatDue } from '../utils'

const DUE_STYLE = {
  overdue: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
  today: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-400/20 dark:text-yellow-300',
  upcoming: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  none: 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500',
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCycle }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const startEdit = () => {
    setDraft(todo.text)
    setEditing(true)
  }
  const save = () => {
    const t = draft.trim()
    if (t) onEdit(todo.id, t)
    setEditing(false)
  }
  const p = PRIORITIES[todo.priority]
  const cat = CATEGORIES[todo.category]
  const status = dueStatus(todo)
  const dueLabel =
    status === 'today' ? 'วันนี้' : status === 'overdue' ? `เลยกำหนด · ${formatDue(todo.due)}` : todo.due && formatDue(todo.due)

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-out"
      style={
        todo.leaving
          ? { maxHeight: 0, opacity: 0, transform: 'translateX(24px)', paddingTop: 0, paddingBottom: 0 }
          : { maxHeight: 180, paddingTop: 2, paddingBottom: 6 }
      }
    >
      <div className="pop flex items-start gap-3 rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700 sm:px-4">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label="ทำเครื่องหมายว่าเสร็จแล้ว"
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            todo.done
              ? 'border-indigo-500 bg-indigo-500 text-white'
              : 'border-slate-300 hover:border-indigo-400 dark:border-slate-500'
          }`}
        >
          {todo.done && <Check size={14} />}
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={save}
              onKeyDown={(e) => {
                if (e.key === 'Enter') save()
                if (e.key === 'Escape') setEditing(false)
              }}
              className="w-full rounded-md border border-indigo-300 bg-white px-2 py-1 text-base outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-slate-900 dark:text-slate-100"
            />
          ) : (
            <span
              onDoubleClick={startEdit}
              title="ดับเบิลคลิกเพื่อแก้ไข"
              className={`block cursor-text select-none break-words text-base transition-colors ${
                todo.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {todo.text}
            </span>
          )}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {cat && <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.tag}`}>{cat.label}</span>}
            {todo.due && (
              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${DUE_STYLE[status]}`}>
                <Calendar size={12} />
                {dueLabel}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onCycle(todo.id)}
          title="คลิกเพื่อเปลี่ยนระดับความสำคัญ"
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.badge}`}
        >
          {p.label}
        </button>
        <button
          onClick={startEdit}
          aria-label="แก้ไข"
          className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-indigo-500 dark:hover:bg-slate-700"
        >
          <Pencil size={17} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบ"
          className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-slate-700"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  )
}
