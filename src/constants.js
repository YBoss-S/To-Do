export const PRIORITIES = {
  low: {
    label: 'ต่ำ',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  medium: {
    label: 'กลาง',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  high: {
    label: 'สูง',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    dot: 'bg-rose-500',
  },
}

export const ORDER = ['low', 'medium', 'high']

export const FILTERS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['completed', 'เสร็จแล้ว'],
]
