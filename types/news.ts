export type Category = {
  id: number;
  slug: string;
  name: string;
  nav_label?: string;
  icon?: string;
  section_label?: string;
  line1?: string;
  line2?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
};

export type News = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  category: string; // joined from categories.name
  lead: string;
  content: string;
  image_url: string;
  tags: string[] | string;
  published: boolean;
  created_at?: string;
  video_url?: string;
  exercise_config?: string;
  author?: string;
  author_role?: string;
};

export type CommentStatus = "pending" | "published" | "spam";

export type Comment = {
  id: number;
  news_id: number;
  author_name: string;
  author_email?: string;
  body: string;
  status: CommentStatus;
  created_at: string;
};

export type NewsCardProps = {
  news: News;
  variant?: "hero" | "sub" | "grid" | "list";
  index?: number;
};

export const TAG_COLORS: Record<
  number,
  { color: string; bg: string; border: string }
> = {
  0: {
    color: "#B070E8",
    bg: "rgba(176,112,232,0.1)",
    border: "rgba(176,112,232,0.8)",
  },
  1: {
    color: "#E63329",
    bg: "rgba(230,51,41,0.1)",
    border: "rgba(230,51,41,0.8)",
  },
  2: {
    color: "#3060B0",
    bg: "rgba(48,96,176,0.1)",
    border: "hsla(218, 57%, 44%, 0.80)",
  },
  3: {
    color: "#50D880",
    bg: "rgba(80,216,118,0.1)",
    border: "rgba(80,216,118,0.8)",
  },
  4: {
    color: "#D4A020",
    bg: "rgba(212,160,32,0.1)",
    border: "rgba(212,160,32,0.8)",
  },
};
export const PROSE_CLASSES = [
  "prose max-w-none dark:prose-invert",
  'prose-h2:font-["TT_Norms_Pro"] prose-h2:text-[22px] prose-h2:tracking-wide prose-h2:font-semibold prose-h2:text-ink prose-h2:mt-12 prose-h2:mb-5',
  "prose-h3:text-[18px] prose-h3:font-semibold prose-h3:text-ink prose-h3:mt-8 prose-h3:mb-3",
  "prose-p:text-muted prose-p:text-[15px] prose-p:leading-[2.0] prose-p:font-ttnormspro prose-p:mb-5",
  "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
  "prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[12px] prose-code:font-mono prose-code:before:content-none prose-code:after:content-none",
  "prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:border-l-2 prose-pre:border-l-accent prose-pre:rounded-none prose-pre:text-[12px] prose-pre:leading-[2.0] prose-pre:my-5 prose-pre:overflow-x-auto",
  "prose-blockquote:border-l-accent prose-blockquote:border-l-2 prose-blockquote:text-muted prose-blockquote:font-light prose-blockquote:not-italic prose-blockquote:pl-4 prose-blockquote:text-[15px] prose-blockquote:leading-[1.9]",
  "prose-strong:font-semibold prose-strong:text-ink prose-hr:border-border prose-hr:my-8",
  "prose-li:text-muted prose-li:text-[15px] prose-li:leading-[2.0] prose-li:font-ttnormspro",
  "prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1 prose-ol:space-y-1",
].join(" ");
