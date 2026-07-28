import Image from 'next/image';
import PageMDX from '@/components/planwise/PageMDX';

interface TeamMember { name: string; role: string; bio: string; image?: string }
interface Props { members: TeamMember[] }

const accentBorders = ['border-t-pillar-mind-body', 'border-t-pillar-purpose'];
const accentGradients = ['from-pillar-mind-body to-pillar-legal-financial', 'from-pillar-purpose to-pillar-where-how'];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function TeamCards({ members }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {members.map((m, i) => (
        <div
          key={m.name}
          className={`rounded-2xl border border-navy/10 border-t-4 ${accentBorders[i % accentBorders.length]} bg-white p-6 md:p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
        >
          <div className="flex items-center gap-4">
            {m.image ? (
              <Image
                src={m.image}
                alt={m.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full object-cover shadow-md shrink-0"
              />
            ) : (
              <span
                className={`grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-gradient-to-br ${accentGradients[i % accentGradients.length]} text-white text-xl font-bold shadow-md`}
                aria-hidden="true"
              >
                {initials(m.name)}
              </span>
            )}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-navy">{m.name}</h3>
              <p className="text-base font-medium text-pillar-legal-financial">{m.role}</p>
            </div>
          </div>
          <div className="mt-4 [&_p]:my-2 [&_p]:text-base">
            <PageMDX source={m.bio} />
          </div>
        </div>
      ))}
    </div>
  );
}
