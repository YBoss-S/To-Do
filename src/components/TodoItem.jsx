import { useEffect, useRef, useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'
import { PRIORITIES } from '../constants'

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

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-out"
      style={
        todo.leaving
          ? { maxHeight: 0, opacity: 0, transform: 'translateX(24px)', paddingTop: 0, paddingBottom: 0 }
          : { maxHeight: 140, paddingTop: 2, paddingBottom: 6 }
      }
    >
      <div className="pop flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700 sm:px-4">
        <button
          onClick={() => onToggle(todo.id)}
          aria-label="ทำเครื่องหมายว่าเสร็จแล้ว"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
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
                todo.done
                  ? 'text-slate-400 line-through dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100'
              }`}
            >
              {todo.text}
            </span>
          )}
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
