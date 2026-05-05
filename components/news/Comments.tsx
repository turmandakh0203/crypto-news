"use client";
import { useState, useRef } from "react";
import { submitComment } from "@/lib/actions";
import type { Comment } from "@/types/news";

function formatCommentDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function CommentItem({ comment }: { comment: Comment }) {
  const initials = comment.author_name.trim().slice(0, 2).toUpperCase();
  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center flex-shrink-0">
        <span className="text-[14px] font-mono font-semibold text-accent">
          {initials}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[12px] font-ttNormsPro text-ink">
            {comment.author_name}
          </span>
          <span className="text-[12px] font-mono text-muted">
            {formatCommentDate(comment.created_at)}
          </span>
        </div>
        <p className="text-[14px] text-muted leading-[1.7] font-ttNormsPro whitespace-pre-wrap break-words">
          {comment.body}
        </p>
      </div>
    </div>
  );
}

type Props = { newsId: number; initialComments: Comment[] };

export default function Comments({ newsId, initialComments }: Props) {
  const [comments] = useState(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const result = await submitComment(
      { news_id: newsId, author_name: name, author_email: email, body },
      honeypotRef.current?.value ?? "",
    );
    if (result.ok) {
      setName("");
      setEmail("");
      setBody("");
      setStatus("done");
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="mt-10 pt-6 border-t border-border">
      {/* Гарчиг */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2.5 h-[1.5px] bg-accent" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted font-ttNormsPro font-semibold">
          Сэтгэгдэл{" "}
          {comments.length > 0 && (
            <span className="text-accent">({comments.length})</span>
          )}
        </span>
      </div>

      {/* Форм */}
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Honeypot — бот хаах */}
        <input
          ref={honeypotRef}
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden
          className="hidden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[10px] tracking-[0.12em] uppercase text-muted font-ttNormsPro block mb-1.5">
              Нэр <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={60}
              placeholder="Таны нэр"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-[13px] text-ink placeholder:text-muted font-ttNormsPro outline-none focus:border-accent/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-[0.12em] uppercase text-muted font-ttNormsPro block mb-1.5">
              Имэйл <span className="text-muted/50">(нийтэд харагдахгүй)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={120}
              placeholder="email@example.com"
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-[13px] text-ink placeholder:text-muted font-ttNormsPro outline-none focus:border-accent/50 transition-colors"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-[10px] tracking-[0.12em] uppercase text-muted font-ttNormsPro block mb-1.5">
            Сэтгэгдэл <span className="text-accent">*</span>
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            minLength={3}
            maxLength={1000}
            rows={4}
            placeholder="Сэтгэгдэлээ бичнэ үү..."
            className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-[13px] text-ink placeholder:text-muted font-ttNormsPro outline-none focus:border-accent/50 transition-colors resize-none"
          />
          <div className="flex justify-end mt-1">
            <span className="text-[10px] font-mono text-muted">
              {body.length}/1000
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className="text-[10px] tracking-[0.14em] uppercase font-ttNormsPro font-semibold px-5 py-2 rounded-full border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Илгээж байна..." : "Илгээх"}
          </button>
          {status === "done" && (
            <span className="text-[11px] text-green-500 font-ttNormsPro">
              Сэтгэгдэл хүлээгдэж байна, баталгаажсаны дараа харагдана
            </span>
          )}
          {status === "error" && (
            <span className="text-[11px] text-accent font-ttNormsPro">
              Алдаа гарлаа, дахин оролдоно уу
            </span>
          )}
        </div>
      </form>

      {/* Сэтгэгдлийн жагсаалт */}
      {comments.length === 0 ? (
        <p className="text-[13px] text-muted font-ttNormsPro text-center py-6">
          Одоохондоо сэтгэгдэл байхгүй байна. Эхний сэтгэгдлийг үлдээгээрэй!
        </p>
      ) : (
        <div>
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>
      )}
    </div>
  );
}
