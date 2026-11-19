type SectionLabelProps = {
  children: string;
  className?: string;
};

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`section-label ${className}`.trim()}>
      <span className="section-label__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
