import PageMDX from '@/components/planwise/PageMDX';

type PillarToken = 'purpose' | 'legal-financial' | 'mind-body' | 'where-how';
interface Story { title: string; body: string; accent?: PillarToken }
interface Props { stories: Story[] }

const pillarBorders = ['border-t-pillar-purpose', 'border-t-pillar-legal-financial', 'border-t-pillar-mind-body', 'border-t-pillar-where-how'];
const pillarBadgeBg = ['bg-pillar-purpose text-white', 'bg-pillar-legal-financial text-white', 'bg-pillar-mind-body text-white', 'bg-pillar-where-how text-white'];

const borderByAccent: Record<PillarToken, string> = {
  purpose: 'border-t-pillar-purpose',
  'legal-financial': 'border-t-pillar-legal-financial',
  'mind-body': 'border-t-pillar-mind-body',
  'where-how': 'border-t-pillar-where-how'
};
const badgeByAccent: Record<PillarToken, string> = {
  purpose: 'bg-pillar-purpose text-white',
  'legal-financial': 'bg-pillar-legal-financial text-white',
  'mind-body': 'bg-pillar-mind-body text-white',
  'where-how': 'bg-pillar-where-how text-white'
};

export default function StoryCards({ stories }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {stories.map((s, i) => {
        const border = s.accent ? borderByAccent[s.accent] : pillarBorders[i % pillarBorders.length];
        const badge = s.accent ? badgeByAccent[s.accent] : pillarBadgeBg[i % pillarBadgeBg.length];
        return (
        <div
          key={s.title}
          className={`relative rounded-2xl border border-navy/10 border-t-4 ${border} bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
        >
          <span className={`absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full text-xs font-bold shadow-md ${badge}`}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="mt-2 text-lg md:text-xl font-semibold text-navy">{s.title}</h3>
          <div className="mt-2 [&_p]:my-3 [&_p]:text-base">
            <PageMDX source={s.body} />
          </div>
        </div>
        );
      })}
    </div>
  );
}
