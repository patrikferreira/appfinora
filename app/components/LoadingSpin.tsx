type Props = {
  className?: string;
};

export default function LoadingSpin({ className }: Props) {
  return (
    <div
      className={`h-5.5 w-5.5 border-2 border-white border-t-black/20 rounded-full animate-spin ${className}`}
    ></div>
  );
}
