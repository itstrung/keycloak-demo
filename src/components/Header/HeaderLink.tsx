import { cn } from "@/lib/utils";
import Link from "next/link";

type HeaderLinkProps = {
  href: string;
  label: string;
  isDisabled?: boolean;
};
export const HeaderLink = ({ href, label, isDisabled }: HeaderLinkProps) => {
  return (
    <Link
      aria-disabled={isDisabled}
      className={cn(
        "bg-slate-500 p-4 rounded-md text-white hover:opacity-80",

        {
          "cursor-not-allowed": isDisabled,
          "pointer-events-none": isDisabled,
          "opacity-50": isDisabled,
        }
      )}
      href={href}
    >
      {label}
    </Link>
  );
};
