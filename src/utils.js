const pad = (n) => String(n).padStart(2, '0')
export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => toISO(new Date())
export const addDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toISO(d)
}

// 'overdue' | 'today' | 'upcoming' | 'none' (completed todos and todos without a date are 'none')
export const dueStatus = (t) => {
  if (!t.due || t.done) return 'none'
  const today = todayISO()
  if (t.due < today) return 'overdue'
  if (t.due === today) return 'today'
  return 'upcoming'
}

export const formatDue = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}
