import { getMemberships } from '@/lib/content';
import CTAButton from '@/components/planwise/CTAButton';

export default function MembershipTable() {
  const { tiers, allMembershipsInclude, discoveryCall } = getMemberships();
  return (
    <div className="space-y-8">
      <p className="text-navy/80"><strong>All memberships include:</strong> {allMembershipsInclude}</p>
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <div key={t.id} className="relative rounded-2xl border-2 border-navy/10 bg-white p-6 md:p-7 flex flex-col shadow-sm hover:border-navy/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            <span className="absolute -top-3 -left-3 grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-white shadow-md">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-semibold text-navy">{t.name}</h3>
            <p className="mt-1 text-navy/70 text-base">{t.overview}</p>
            <p className="mt-4 text-2xl font-bold text-navy">{t.cost}</p>
            <dl className="mt-6 space-y-4 text-base flex-1 divide-y divide-navy/10">
              <div>
                <dt className="font-semibold text-navy">Who it suits</dt>
                <dd className="text-navy/80 mt-1">{t.whoItSuits}</dd>
              </div>
              <div className="pt-4">
                <dt className="font-semibold text-navy">How often you connect</dt>
                <dd className="text-navy/80 mt-1">{t.howOftenYouConnect}</dd>
              </div>
              <div className="pt-4">
                <dt className="font-semibold text-navy">What you get</dt>
                <dd className="text-navy/80 mt-1">{t.whatYouGet}</dd>
              </div>
              <div className="pt-4">
                <dt className="font-semibold text-navy">Plan updates over time</dt>
                <dd className="text-navy/80 mt-1">{t.planUpdatesOverTime}</dd>
              </div>
              <div className="pt-4">
                <dt className="font-semibold text-navy">Provider help</dt>
                <dd className="text-navy/80 mt-1">{t.providerHelp}</dd>
              </div>
              <div className="pt-4">
                <dt className="font-semibold text-navy">Extras</dt>
                <dd className="text-navy/80 mt-1">{t.extras}</dd>
              </div>
            </dl>
            {/* TODO: add href for select plan */}
            <div className="mt-6">
              <CTAButton label={"Select Plan"} href='' size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
