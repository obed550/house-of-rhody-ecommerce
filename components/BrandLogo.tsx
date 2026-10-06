import Link from 'next/link';

export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-2 flex items-center justify-center">
        <div className="relative h-20 w-20 rounded-full border-[6px] border-rhody-gold bg-rhody-cream shadow-md">
          <div className="absolute left-1/2 top-2 h-7 w-10 -translate-x-1/2 rounded-t-[1.25rem] border-b-4 border-rhody-gold bg-rhody-cream" />
          <div className="absolute left-1/2 top-7 h-10 w-10 -translate-x-1/2 rounded-t-md border border-rhody-gold bg-rhody-cream" />
          <div className="absolute left-1/2 top-10 h-8 w-8 -translate-x-1/2 rounded-[0.5rem] bg-rhody-navy" />
          <div className="absolute left-1/2 top-[60%] h-4 w-4 -translate-x-1/2 rounded-full bg-rhody-gold" />
        </div>
      </div>

      {!compact ? (
        <div className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 text-5xl font-black tracking-[-0.12em] text-rhody-navy">
            <span>H</span>
            <span className="text-rhody-gold">R</span>
          </div>
          <div className="font-display text-4xl font-black tracking-widest text-rhody-navy">HOUSE OF RHODY</div>
          <div className="text-sm uppercase tracking-[0.45em] text-rhody-gold">Wear confidence</div>
        </div>
      ) : null}
    </div>
  );
}
