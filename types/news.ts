export type News = {
  id: number
  title: string
  slug: string
  category: string
  lead: string
  content: string
  image_url: string
  tags: string[] | string
  published: boolean 
  created_at?: string
  video_url?: string
  exercise_config?: string
  author?: string
  author_role?: string
}

export type NewsCardProps = {
  news: News
  variant?: 'hero' | 'sub' | 'grid' | 'list'
  index?: number
}

export const TAG_COLORS: Record<number, { color: string; bg: string; border: string }> = {
  0: { color: '#B070E8', bg: 'rgba(176,112,232,0.1)', border: 'rgba(176,112,232,0.8)' },
  1: { color: '#E63329', bg: 'rgba(230,51,41,0.1)',   border: 'rgba(230,51,41,0.8)'   },
  2: { color: '#3060B0', bg: 'rgba(48,96,176,0.1)',   border: 'rgba(48,96,176,0.8)'   },
  3: { color: '#50D880', bg: 'rgba(80,216,118,0.1)',  border: 'rgba(80,216,118,0.8)'  },
  4: { color: '#D4A020', bg: 'rgba(212,160,32,0.1)',  border: 'rgba(212,160,32,0.8)'  },
}
export const PROSE_CLASSES = [
  'prose max-w-none dark:prose-invert',
  'prose-h2:font-["TT_Norms_Pro"] prose-h2:text-2xl prose-h2:tracking-widest prose-h2:mt-10 prose-h2:mb-4',
  'prose-h3:text-lg prose-h3:font-medium prose-h3:mt-7 prose-h3:mb-2',
  'prose-p:text-muted prose-p:text-[14px] prose-p:leading-[1.9] prose-p:font-ttnormspro prose-p:mb-4',
  'prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
  'prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[11px] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:border-l-2 prose-pre:border-l-accent prose-pre:rounded-none prose-pre:text-[11px] prose-pre:leading-[2.1] prose-pre:my-4 prose-pre:overflow-x-auto',
  'prose-blockquote:border-l-accent prose-blockquote:border-l-2 prose-blockquote:text-muted prose-blockquote:font-light prose-blockquote:not-italic prose-blockquote:pl-4 prose-blockquote:text-[14px]',
  'prose-strong:font-semibold prose-strong:text-ink prose-hr:border-border',
  'prose-li:text-muted prose-li:text-[14px] prose-li:leading-[1.9] prose-li:font-ttnormspro',
  'prose-ul:my-4 prose-ol:my-4',
].join(' ')

export const CATEGORIES = [
  'Криптограф',
  'Криптоанализ',
  'Кодлол',
  'Мэдээ',
]

export const SECTIONS = [
  { key: 'Криптограф', sectionLabel: 'НЭГДҮГЭЭР ХЭСЭГ', line1: 'CRYPTO', line2: 'ГРАФ',   desc: 'Мэдээллийг шифрлэх, хамгаалах шинжлэх ухааны үндэс, алгоритм, математик суурь болон орчин үеийн хэрэглээ' },
  { key: 'Мэдээ',      sectionLabel: 'ХОЁРДУГААР ХЭСЭГ', line1: 'INFO',   line2: 'МЭДЭЭ',  desc: 'Криптологийн ертөнцийн хамгийн шинэ мэдээ, үйл явдал, хөгжил дэвшлийн талаарх мэдээлэл' },
  { key: 'Криптоанализ', sectionLabel: 'ГУРАВДУГААР ХЭСЭГ', line1: 'CRYPTO', line2: 'АНАЛИЗ', desc: 'Шифрлэгдсэн мэдээллийг задлах, сул талыг илрүүлэх арга техник болон дайралтын төрлүүдийн шинжилгээ' },
  { key: 'Кодлол',    sectionLabel: 'ДӨРӨВДҮГЭЭР ХЭСЭГ', line1: 'CODE',   line2: 'КОДЛОЛ', desc: 'Криптографийн алгоритм, протоколын хэрэгжилт, програмчлалын техник болон нээлттэй эхийн кодын шинжилгээ' },
]

