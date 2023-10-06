import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  const { push } = useRouter();

  useEffect(() => {
    push(to);
  }, [push, to]);

  return null;
}
