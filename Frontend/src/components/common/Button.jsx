const styles = {
  primary: "bg-accent text-onaccent hover:bg-accent-hi font-semibold",
  ghost: "text-mute hover:bg-hover hover:text-ink",
  outline: "border border-line hover:bg-hover font-semibold",
  danger: "bg-danger text-black hover:opacity-90 font-semibold",
};

export default function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
