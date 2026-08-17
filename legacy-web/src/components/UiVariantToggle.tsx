type Option<T extends string> = { id: T; label: string };

type Props<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (next: T) => void;
  label: string;
};

export default function UiVariantToggle<T extends string>({
  options,
  value,
  onChange,
  label,
}: Props<T>) {
  return (
    <div className="ui-variant-toggle" role="tablist" aria-label={label}>
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`ui-variant-btn${active ? " active" : ""}`}
            onClick={() => onChange(opt.id)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
