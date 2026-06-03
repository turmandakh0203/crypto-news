"use client";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function BackButton({ className, children }: Props) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/news");
    }
  }

  return (
    <button onClick={handleBack} className={className}>
      {children}
    </button>
  );
}
