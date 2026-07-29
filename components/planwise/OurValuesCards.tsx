interface ValueItem { title: string; body: string }
interface Props { items: ValueItem[] }

export default function OurValuesCards({ items }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((v) => (
        <div
          key={v.title}
          className="rounded-2xl border border-navy/10 bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          <h3 className="text-lg font-semibold text-navy">{v.title}</h3>
          <p className="mt-3 text-navy/80 text-base leading-relaxed">{v.body}</p>
        </div>
      ))}
    </div>
  );
}
