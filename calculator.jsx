import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles, Gem, Ticket, Target, CalendarDays, TrendingUp, Wallet, RotateCcw,
  CheckCircle2, AlertTriangle, XCircle, Info, Star, Swords,
} from 'lucide-react';

/* ---------- Данные игр (снимок на 27.11.2026, из открытых источников и оценок сообщества) ---------- */

const DATA_DATE = '27.11.2026';
const PATCH_DAYS = 42;
const JADE_PER_PULL = 160;

const item = (key, label, jade, passes = 0, endgame = false) => ({ key, label, jade, passes, endgame });

export const GAMES = {
  hsr: {
    name: 'Honkai: Star Rail',
    pass: 'Особые звёздные пропуски',
    currency: 'Звёздный нефрит',
    cashback: 'Неугасаемый звёздный свет',
    cashRate: 20,
    cashPerPull: 1.5,
    dupe: 'E', weaponDupe: 'S', weaponName: 'Световой конус',
    sub: 'Пропуск снабжения экспресса',
    bpName: 'Платный боевой пропуск',
    weapon: { base: 0.008, softFrom: 66, step: 0.07, hard: 80, featured: 0.75 },
    current: '4.7', next: '4.8',
    patchStart: '2026-11-11',
    nextStart: '2026-12-23',
    presets: [
      { label: 'Конец 1-й фазы 4.7', date: '2026-12-02' },
      { label: 'Старт 4.8 (оценка)', date: '2026-12-23' },
      { label: 'Конец 4.8 (оценка)', date: '2027-02-03' },
    ],
    bp: { jade: 680, passes: 4 },
    plans: {
      current: [
        item('events', 'Ивенты патча и ежедневный вход (20 пропусков)', 5640, 20),
        item('story', 'Сюжет, исследование, достижения', 1600),
        item('comp', 'Техработы, коды, веб-ивенты', 1000),
        item('abyss', 'Зал забвения, Чистый вымысел, Иллюзия конца', 2400, 0, true),
        item('weekly', 'Виртуальная вселенная / Войны валют (недельные)', 1350, 0, true),
        item('shop', 'Магазин за звёздный свет', 0, 5),
      ],
      next: [
        item('events', 'Ивенты патча и ежедневный вход', 2500, 5),
        item('story', 'Сюжет, исследование, достижения', 1500),
        item('comp', 'Техработы, коды, веб-ивенты', 900),
        item('abyss', 'Зал забвения, Чистый вымысел, Иллюзия конца', 2400, 0, true),
        item('weekly', 'Виртуальная вселенная / Войны валют (недельные)', 1350, 0, true),
        item('shop', 'Магазин за звёздный свет', 0, 7),
      ],
    },
    sources: [
      ['AstraVoy: доход по версиям (≈122 крутки F2P за 4.7)', 'https://astravoy.net/hsr/pull-income'],
      ['UU TOP: разбор 4.7 (105–118 круток)', 'https://uu-top.com/en/blog/honkai-star-rail-4-7-pull-count'],
      ['GamsGo: оценка 4.7 (≈116 круток)', 'https://www.gamsgo.com/blog/hsr-4-7-stellar-jade-count'],
    ],
  },
  gi: {
    name: 'Genshin Impact',
    pass: 'Переплетающиеся судьбы',
    currency: 'Камни Истока',
    cashback: 'Блуждающий звёздный блеск',
    cashRate: 5,
    cashPerPull: 0.35,
    dupe: 'C', weaponDupe: 'R', weaponName: 'Оружие',
    sub: 'Благословение полой луны',
    bpName: 'Платный боевой пропуск',
    weapon: { base: 0.007, softFrom: 63, step: 0.07, hard: 80, featured: 0.375 },
    current: '7.2', next: '7.3',
    patchStart: '2026-11-04',
    nextStart: '2026-12-16',
    presets: [
      { label: 'Конец баннеров 7.2', date: '2026-12-15' },
      { label: 'Старт 7.3 (оценка)', date: '2026-12-16' },
      { label: 'Конец 7.3 (оценка)', date: '2027-01-26' },
    ],
    bp: { jade: 680, passes: 4 },
    plans: {
      current: [
        item('events', 'Ивенты патча', 2330),
        item('story', 'Сюжет, исследование, достижения', 3600),
        item('comp', 'Техработы, коды, веб-ивенты', 1200),
        item('abyss', 'Витая Бездна', 1600, 0, true),
        item('theater', 'Театр Воображариум', 1000, 0, true),
        item('stygian', 'Мрачный натиск', 450, 0, true),
        item('shop', 'Магазин Паймон', 0, 7),
      ],
      next: [
        item('events', 'Ивенты патча', 2500),
        item('story', 'Сюжет, исследование, достижения', 1500),
        item('comp', 'Техработы, коды, веб-ивенты', 900),
        item('abyss', 'Витая Бездна', 1600, 0, true),
        item('theater', 'Театр Воображариум', 1000, 0, true),
        item('stygian', 'Мрачный натиск', 450, 0, true),
        item('shop', 'Магазин Паймон', 0, 7),
      ],
    },
    sources: [
      ['AstraVoy: доход по версиям (≈89 круток F2P за 7.2)', 'https://astravoy.net/genshin/pull-income'],
      ['AllThings.How: оценка 7.2 (≈86 круток)', 'https://allthings.how/genshin-impact-7-2-how-many-free-pulls-and-primogems-to-expect/'],
      ['Timesaver: ожидаемая дата 7.3', 'https://timesaver.gg/blog/genshin-7-3-release-date'],
    ],
  },
};

const CHARACTER = { base: 0.006, softFrom: 74, step: 0.06, hard: 90 };

/* ---------- Математика ---------- */

/** Шанс 5★ на крутке номер n после предыдущего 5★. */
const rateAt = (b, n) => (n >= b.hard ? 1 : n < b.softFrom ? b.base : Math.min(1, b.base + b.step * (n - b.softFrom + 1)));

/** dist[k] = вероятность, что следующий 5★ выпадет ровно через k круток. */
function fiveStarDist(b, pity) {
  const dist = [0];
  let alive = 1;
  for (let n = pity + 1; n <= b.hard; n += 1) {
    const p = rateAt(b, n);
    dist.push(alive * p);
    alive *= 1 - p;
  }
  return dist;
}

function convolve(a, b) {
  const out = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i += 1) {
    if (!a[i]) continue;
    for (let j = 0; j < b.length; j += 1) out[i + j] += a[i] * b[j];
  }
  return out;
}

/** Распределение круток до одной нужной копии: либо первый 5★ нужный, либо следующий гарантирован. */
function copyDist(b, winChance, pity, guaranteed) {
  const first = fiveStarDist(b, pity);
  if (guaranteed) return { dist: first, worst: first.length - 1 };
  const second = fiveStarDist(b, 0);
  const lost = convolve(first, second);
  const dist = lost.map((p, i) => (1 - winChance) * p + winChance * (first[i] || 0));
  return { dist, worst: lost.length - 1 };
}

export function goalStats(parts) {
  let dist = [1];
  let worst = 0;
  parts.forEach(({ banner, winChance, copies, pity, guaranteed }) => {
    for (let c = 0; c < copies; c += 1) {
      const one = copyDist(banner, winChance, c ? 0 : pity, c ? false : guaranteed);
      dist = convolve(dist, one.dist);
      worst += one.worst;
    }
  });
  const mean = dist.reduce((sum, p, i) => sum + p * i, 0);
  return { dist, worst, mean: Math.ceil(mean - 1e-9) };
}

export const chanceWithin = (dist, pulls) => {
  let sum = 0;
  for (let i = 0; i <= Math.min(pulls, dist.length - 1); i += 1) sum += dist[i];
  return Math.min(1, sum);
};

/* ---------- Даты (считаем в UTC-днях, чтобы не было сдвигов) ---------- */

const DAY = 86400000;
const dayNumber = (iso) => Math.round(Date.parse(`${iso}T00:00:00Z`) / DAY);
const isoFromDay = (n) => new Date(n * DAY).toISOString().slice(0, 10);
const todayIso = () => {
  const d = new Date();
  return isoFromDay(Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY));
};
const ruDate = (iso) => iso.split('-').reverse().join('.');

/* ---------- Доход и ресурсы ---------- */

export function patchIncome(game, state, which) {
  if (state.mode === 'total') return { jade: 0, passes: state.totals[which], rows: [] };
  const plan = state.plans[which];
  const rows = [{ key: 'daily', label: 'Ежедневные задания (60 × 42)', jade: 60 * PATCH_DAYS, passes: 0 }];
  if (state.sub) rows.push({ key: 'sub', label: `${GAMES[game].sub} (90 × 42)`, jade: 90 * PATCH_DAYS, passes: 0 });
  if (state.bp) rows.push({ key: 'bp', label: GAMES[game].bpName, jade: state.bpJade, passes: state.bpPasses });
  GAMES[game].plans[which].forEach((def) => {
    const k = def.endgame ? state.endgame / 100 : 1;
    rows.push({ key: def.key, label: def.label, jade: plan[def.key].jade * k, passes: plan[def.key].passes });
  });
  return {
    rows,
    jade: rows.reduce((s, r) => s + r.jade, 0),
    passes: rows.reduce((s, r) => s + r.passes, 0),
  };
}

export function forecast(game, state, today, target) {
  const start = dayNumber(today);
  const days = Math.max(0, Math.min(730, dayNumber(target) - start || 0));
  const boundary = dayNumber(GAMES[game].nextStart);
  let currentDays = 0;
  for (let i = 1; i <= days; i += 1) if (start + i < boundary) currentDays += 1;
  const nextDays = days - currentDays;
  const a = patchIncome(game, state, 'current');
  const b = patchIncome(game, state, 'next');
  return {
    days,
    currentDays,
    nextDays,
    jade: Math.floor((a.jade * currentDays + b.jade * nextDays) / PATCH_DAYS),
    passes: Math.floor((a.passes * currentDays + b.passes * nextDays) / PATCH_DAYS),
  };
}

export function pullsFrom(state, extraJade = 0, extraPasses = 0) {
  const jade = state.jade + extraJade;
  const passes = state.passes + extraPasses;
  const fromJade = Math.floor(jade / JADE_PER_PULL);
  const fromCash = state.useCashback ? Math.floor(state.cashback / state.cashRate) : 0;
  const direct = passes + fromJade + fromCash;
  // Каждая крутка возвращает часть кэшбэка, который снова идёт в крутки (геометрический ряд).
  const r = state.useCashback && state.reinvest ? Math.min(0.5, state.cashPerPull / state.cashRate) : 0;
  const bonus = Math.floor(direct / (1 - r)) - direct;
  return { passes, fromJade, fromCash, bonus, total: direct + bonus, jadeLeft: jade % JADE_PER_PULL };
}

/* ---------- Состояние ---------- */

const planDefaults = (list) => Object.fromEntries(list.map((d) => [d.key, { jade: d.jade, passes: d.passes }]));

function defaults(game) {
  const g = GAMES[game];
  const base = {
    passes: 0, jade: 0, cashback: 0, useCashback: true, reinvest: false,
    cashRate: g.cashRate, cashPerPull: g.cashPerPull,
    charPity: 0, weaponPity: 0, charGuarantee: false, weaponGuarantee: false,
    radiance: game === 'gi',
    mode: 'items', sub: false, bp: false, bpJade: g.bp.jade, bpPasses: g.bp.passes, endgame: 100,
    plans: { current: planDefaults(g.plans.current), next: planDefaults(g.plans.next) },
    charOwned: -1, charTarget: 0, weaponOwned: 0, weaponTarget: 0,
    targetDate: g.nextStart,
  };
  const total = (which) => {
    const inc = patchIncome(game, base, which);
    return Math.floor(inc.jade / JADE_PER_PULL) + inc.passes;
  };
  return { ...base, totals: { current: total('current'), next: total('next') } };
}

const STORAGE_KEY = 'gacha-planner-v1';

function load() {
  const fresh = { tab: 'hsr', hsr: defaults('hsr'), gi: defaults('gi') };
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!saved) return fresh;
    ['hsr', 'gi'].forEach((g) => {
      const s = saved[g] || {};
      fresh[g] = {
        ...fresh[g],
        ...s,
        totals: { ...fresh[g].totals, ...s.totals },
        plans: {
          current: { ...fresh[g].plans.current, ...s.plans?.current },
          next: { ...fresh[g].plans.next, ...s.plans?.next },
        },
      };
    });
    fresh.tab = saved.tab === 'gi' ? 'gi' : 'hsr';
    return fresh;
  } catch {
    return fresh;
  }
}

/* ---------- UI-компоненты ---------- */

const fmt = (n) => Math.round(n).toLocaleString('ru-RU');
const inputCls = 'w-full min-w-0 rounded-md border border-line bg-field px-3 py-2 text-ink tabular-nums focus:border-accent focus:outline-none';

function NumberField({ id, label, value, onChange, max = 1000000, step = 1, hint }) {
  const [text, setText] = useState(String(value));
  useEffect(() => {
    setText((t) => (Number(t) === value ? t : String(value)));
  }, [value]);
  const change = (e) => {
    const raw = e.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
    const num = Math.min(max, Math.max(0, Number(raw) || 0));
    const clean = step === 1 ? Math.floor(num) : num;
    setText(raw === '' ? '' : Number(raw) > max ? String(max) : raw);
    onChange(clean);
  };
  return (
    <label className="flex min-w-0 flex-col gap-1" htmlFor={id}>
      <span className="text-sm text-dim">{label}</span>
      <input id={id} className={inputCls} type="text" inputMode={step === 1 ? 'numeric' : 'decimal'}
        value={text} onChange={change} onBlur={() => setText(String(value))} onFocus={(e) => e.target.select()} />
      {hint && <span className="text-xs text-dim">{hint}</span>}
    </label>
  );
}

function Check({ id, label, checked, onChange, disabled }) {
  return (
    <label htmlFor={id} className={`flex items-start gap-2 text-sm ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <input id={id} type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
        checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function Select({ id, label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1" htmlFor={id}>
      <span className="text-sm text-dim">{label}</span>
      <select id={id} className={inputCls} value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
      </select>
    </label>
  );
}

function Panel({ icon: Icon, title, children }) {
  return (
    <section className="flex min-w-0 flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:p-5">
      <h2 className="font-display flex items-center gap-2 text-base font-semibold">
        <Icon size={18} className="shrink-0 text-accent" aria-hidden="true" />
        {title}
      </h2>
      {children}
    </section>
  );
}

const Row = ({ label, value, strong }) => (
  <div className={`flex items-baseline justify-between gap-3 ${strong ? 'font-semibold' : 'text-sm text-dim'}`}>
    <span>{label}</span>
    <span className="shrink-0 tabular-nums text-ink">{value}</span>
  </div>
);

function verdict(have, mean, worst) {
  if (worst === 0) return { tone: 'good', Icon: CheckCircle2, title: 'Выберите цель', note: 'Сейчас копить не на что: цель уже достигнута или не задана.' };
  if (have >= worst) return { tone: 'good', Icon: CheckCircle2, title: 'Хватает с запасом', note: `Цель гарантирована даже при худшей удаче. Запас ${fmt(have - worst)} круток.` };
  if (have >= mean) return { tone: 'warn', Icon: AlertTriangle, title: 'Хватит в среднем сценарии', note: `Сверх среднего ${fmt(have - mean)}, до гарантии не хватает ${fmt(worst - have)} круток.` };
  return { tone: 'bad', Icon: XCircle, title: `Не хватает ${fmt(mean - have)} круток`, note: `Это до среднего сценария. До гарантии не хватает ${fmt(worst - have)}.` };
}

function ProgressBar({ now, total, mean, worst }) {
  const scale = Math.max(worst, total, 1);
  const pct = (n) => `${Math.min(100, (n / scale) * 100)}%`;
  return (
    <div className="flex flex-col gap-2">
      <div role="img" aria-label={`Сейчас ${now}, к дате ${total}, в среднем нужно ${mean}, максимум ${worst}`}
        className="relative h-5 overflow-hidden rounded-full bg-field">
        <div className="absolute inset-y-0 left-0 bg-accent opacity-40 transition-all" style={{ width: pct(total) }} />
        <div className="absolute inset-y-0 left-0 bg-accent transition-all" style={{ width: pct(now) }} />
        {worst > 0 && <div className="absolute inset-y-0 w-0.5 bg-warn" style={{ left: `calc(${pct(mean)} - 1px)` }} />}
        {worst > 0 && <div className="absolute inset-y-0 w-0.5 bg-bad" style={{ left: `calc(${pct(worst)} - 2px)` }} />}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-dim">
        <span><i className="mr-1 inline-block h-2 w-2 bg-accent" />сейчас {fmt(now)}</span>
        <span><i className="mr-1 inline-block h-2 w-2 bg-accent opacity-40" />к дате {fmt(total)}</span>
        <span><i className="mr-1 inline-block h-3 w-0.5 bg-warn align-middle" />средний {fmt(mean)}</span>
        <span><i className="mr-1 inline-block h-3 w-0.5 bg-bad align-middle" />худший {fmt(worst)}</span>
      </div>
    </div>
  );
}

/* ---------- Экран одной игры ---------- */

function GameView({ game, s, set, reset }) {
  const g = GAMES[game];
  const id = (name) => `${game}-${name}`;
  const today = todayIso();
  const [confirmReset, setConfirmReset] = useState(false);

  const charCopies = Math.max(0, s.charTarget - s.charOwned);
  const weaponCopies = Math.max(0, s.weaponTarget - s.weaponOwned);

  const { goal, fresh } = useMemo(() => {
    const parts = (usePity) => [
      {
        banner: CHARACTER,
        winChance: game === 'gi' && s.radiance ? 0.55 : 0.5,
        copies: charCopies,
        pity: usePity ? s.charPity : 0,
        guaranteed: usePity && s.charGuarantee,
      },
      {
        banner: g.weapon,
        winChance: g.weapon.featured,
        copies: weaponCopies,
        pity: usePity ? s.weaponPity : 0,
        guaranteed: usePity && s.weaponGuarantee,
      },
    ];
    return { goal: goalStats(parts(true)), fresh: goalStats(parts(false)) };
  }, [game, g, charCopies, weaponCopies, s.radiance, s.charPity, s.weaponPity, s.charGuarantee, s.weaponGuarantee]);

  const now = pullsFrom(s);
  const gain = forecast(game, s, today, s.targetDate);
  const later = pullsFrom(s, gain.jade, gain.passes);
  const added = later.total - now.total;
  const status = verdict(later.total, goal.mean, goal.worst);
  const toneCls = { good: 'text-good border-good', warn: 'text-warn border-warn', bad: 'text-bad border-bad' }[status.tone];
  const income = { current: patchIncome(game, s, 'current'), next: patchIncome(game, s, 'next') };
  const patchPulls = (w) => Math.floor(income[w].jade / JADE_PER_PULL) + income[w].passes;

  const need = (n) => Math.max(0, n - later.total);
  const jadeFor = (pulls) => (pulls ? pulls * JADE_PER_PULL - later.jadeLeft : 0);

  const setPlan = (which, key, field, v) =>
    set({ plans: { ...s.plans, [which]: { ...s.plans[which], [key]: { ...s.plans[which][key], [field]: v } } } });

  const charOptions = [0, 1, 2, 3, 4, 5, 6];
  const weaponOptions = [0, 1, 2, 3, 4, 5];

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
      {/* Итоговый прогноз */}
      <section aria-live="polite" className={`flex flex-col gap-4 rounded-xl border-2 bg-panel p-4 sm:p-5 lg:col-span-2 ${toneCls}`}>
        <div className="flex items-start gap-3">
          <status.Icon size={32} className="shrink-0" aria-hidden="true" />
          <div className="min-w-0">
            <p className="font-display text-xl font-bold sm:text-2xl">{status.title}</p>
            <p className="text-sm text-ink">{status.note}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 text-ink">
          <ProgressBar now={now.total} total={later.total} mean={goal.mean} worst={goal.worst} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm text-dim">Круток к {s.targetDate ? ruDate(s.targetDate) : 'дате'}</p>
              <p className="font-display text-3xl font-bold tabular-nums">{fmt(later.total)}</p>
              <p className="text-xs text-dim">{fmt(now.total)} сейчас + {fmt(added)} за {gain.days} дн.</p>
            </div>
            {[['Средний сценарий', goal.mean], ['Худший сценарий', goal.worst]].map(([label, n]) => (
              <div key={label}>
                <p className="text-sm text-dim">{label}: нужно {fmt(n)}</p>
                <p className={`font-display text-3xl font-bold tabular-nums ${later.total >= n ? 'text-good' : 'text-bad'}`}>
                  {later.total >= n ? '+' : '−'}{fmt(Math.abs(later.total - n))}
                </p>
                <p className="text-xs text-dim">{later.total >= n ? 'останется в запасе' : `не хватает (≈ ${fmt(jadeFor(need(n)))} валюты)`}</p>
              </div>
            ))}
          </div>
          {goal.worst > 0 && (
            <p className="text-sm">
              Шанс получить цель: сейчас <b className="tabular-nums">{(chanceWithin(goal.dist, now.total) * 100).toFixed(1)}%</b>,
              к выбранной дате <b className="tabular-nums">{(chanceWithin(goal.dist, later.total) * 100).toFixed(1)}%</b>.
            </p>
          )}
        </div>
      </section>

      <Panel icon={Wallet} title="Мои ресурсы">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NumberField id={id('passes')} label={g.pass} value={s.passes} onChange={(v) => set({ passes: v })} />
          <NumberField id={id('jade')} label={g.currency} value={s.jade} onChange={(v) => set({ jade: v })}
            hint={`= ${fmt(Math.floor(s.jade / JADE_PER_PULL))} круток, остаток ${s.jade % JADE_PER_PULL}`} />
          <NumberField id={id('cashback')} label={g.cashback} value={s.cashback} onChange={(v) => set({ cashback: v })}
            hint={`= ${fmt(Math.floor(s.cashback / s.cashRate))} круток, остаток ${s.cashback % s.cashRate}`} />
          <NumberField id={id('cashRate')} label="Курс кэшбэка за 1 крутку" value={s.cashRate}
            onChange={(v) => set({ cashRate: Math.max(1, v) })} hint={`В игре: ${g.cashRate}`} />
        </div>
        <Check id={id('useCashback')} label="Переводить кэшбэк в крутки" checked={s.useCashback} onChange={(v) => set({ useCashback: v })} />
        <Check id={id('reinvest')} label="Кэшбэк, выпавший с круток, тоже тратить на крутки" checked={s.reinvest}
          disabled={!s.useCashback} onChange={(v) => set({ reinvest: v })} />
        {s.useCashback && s.reinvest && (
          <NumberField id={id('cashPerPull')} label="Средний возврат кэшбэка за крутку" step={0.01} max={10}
            value={s.cashPerPull} onChange={(v) => set({ cashPerPull: v })} hint="Оценка. Зависит от того, сколько копий 4★ у вас уже есть." />
        )}
        <div className="grid grid-cols-2 gap-3">
          <NumberField id={id('charPity')} label="Pity персонажа (0–89)" max={89} value={s.charPity} onChange={(v) => set({ charPity: v })} />
          <NumberField id={id('weaponPity')} label={`Pity: ${g.weaponName.toLowerCase()} (0–${g.weapon.hard - 1})`} max={g.weapon.hard - 1}
            value={s.weaponPity} onChange={(v) => set({ weaponPity: v })} />
        </div>
        <Check id={id('charGuarantee')} label="100% гарант на персонажа" checked={s.charGuarantee} onChange={(v) => set({ charGuarantee: v })} />
        <Check id={id('weaponGuarantee')}
          label={game === 'gi' ? 'Гарант на выбранное оружие (1 очко судьбы, сгорает с концом баннера)' : '100% гарант на световой конус'}
          checked={s.weaponGuarantee} onChange={(v) => set({ weaponGuarantee: v })} />
        {game === 'gi' && (
          <Check id={id('radiance')} label="Учитывать «Пленительное сияние» (шанс выиграть 50/50 ≈ 55%)" checked={s.radiance} onChange={(v) => set({ radiance: v })} />
        )}
      </Panel>

      <Panel icon={Ticket} title="Всего круток у меня сейчас">
        <p className="font-display text-5xl font-extrabold tabular-nums text-accent">{fmt(now.total)}</p>
        <div className="flex flex-col gap-1">
          <Row label={g.pass} value={fmt(now.passes)} />
          <Row label={`${g.currency} (остаток ${now.jadeLeft})`} value={fmt(now.fromJade)} />
          <Row label="Кэшбэк" value={fmt(now.fromCash)} />
          {s.useCashback && s.reinvest && <Row label="Повторный кэшбэк (оценка)" value={fmt(now.bonus)} />}
        </div>
        <div className="flex flex-col gap-1 border-t border-line pt-3">
          <Row label="Pity персонажа / гарант" value={`${s.charPity} / ${s.charGuarantee ? 'да' : 'нет'}`} />
          <Row label={`Pity: ${g.weaponName.toLowerCase()} / гарант`} value={`${s.weaponPity} / ${s.weaponGuarantee ? 'да' : 'нет'}`} />
          <Row label="До гарантированного 5★ персонажа" value={`${CHARACTER.hard - s.charPity} круток`} />
        </div>
      </Panel>

      <Panel icon={Target} title="Цель накоплений">
        <div className="grid grid-cols-2 gap-3">
          <Select id={id('charOwned')} label="Персонаж: есть сейчас" value={s.charOwned} onChange={(v) => set({ charOwned: v })}
            options={[[-1, 'Нет'], ...charOptions.map((n) => [n, `${g.dupe}${n}`])]} />
          <Select id={id('charTarget')} label="Персонаж: хочу" value={s.charTarget} onChange={(v) => set({ charTarget: v })}
            options={[[-1, 'Не нужен'], ...charOptions.map((n) => [n, `${g.dupe}${n}`])]} />
          <Select id={id('weaponOwned')} label={`${g.weaponName}: есть`} value={s.weaponOwned} onChange={(v) => set({ weaponOwned: v })}
            options={weaponOptions.map((n) => [n, n ? `${g.weaponDupe}${n}` : 'Нет'])} />
          <Select id={id('weaponTarget')} label={`${g.weaponName}: хочу`} value={s.weaponTarget} onChange={(v) => set({ weaponTarget: v })}
            options={weaponOptions.map((n) => [n, n ? `${g.weaponDupe}${n}` : 'Не нужно'])} />
        </div>
        <p className="flex items-center gap-2 text-sm text-dim">
          <Swords size={16} className="shrink-0" aria-hidden="true" />
          Нужно копий: персонаж {charCopies}, {g.weaponName.toLowerCase()} {weaponCopies}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm tabular-nums">
            <thead>
              <tr className="text-dim">
                <th className="py-1 text-left font-normal">Круток</th>
                <th className="py-1 text-right font-normal">Средний</th>
                <th className="py-1 text-right font-normal">Худший</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Всего на цель с нуля', fresh.mean, fresh.worst],
                ['Закрыто pity и гарантом', fresh.mean - goal.mean, fresh.worst - goal.worst],
                ['Закрыто ресурсами', Math.min(now.total, goal.mean), Math.min(now.total, goal.worst)],
                ['Осталось накопить', Math.max(0, goal.mean - now.total), Math.max(0, goal.worst - now.total)],
                [`Осталось: ${g.currency}`,
                  goal.mean > now.total ? (goal.mean - now.total) * JADE_PER_PULL - now.jadeLeft : 0,
                  goal.worst > now.total ? (goal.worst - now.total) * JADE_PER_PULL - now.jadeLeft : 0],
              ].map(([label, a, b]) => (
                <tr key={label} className="border-t border-line">
                  <td className="py-2 pr-2">{label}</td>
                  <td className="py-2 text-right">{fmt(a)}</td>
                  <td className="py-2 text-right">{fmt(b)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-dim">Средний: математическое ожидание с учётом soft pity. Худший: каждый 5★ на hard pity и каждый первый шанс проигран.</p>
      </Panel>

      <Panel icon={CalendarDays} title="Дата баннера">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex min-w-0 flex-col gap-1" htmlFor={id('date')}>
            <span className="text-sm text-dim">Целевая дата</span>
            <input id={id('date')} type="date" className={inputCls} min={today} value={s.targetDate}
              onChange={(e) => set({ targetDate: e.target.value })} />
          </label>
          <NumberField id={id('days')} label="Или дней от сегодня" max={730} value={gain.days}
            onChange={(v) => set({ targetDate: isoFromDay(dayNumber(today) + v) })} />
        </div>
        <div className="flex flex-wrap gap-2">
          {g.presets.filter((p) => p.date >= today).map((p) => (
            <button key={p.label} type="button" onClick={() => set({ targetDate: p.date })}
              aria-pressed={s.targetDate === p.date}
              className={`rounded-full border px-3 py-1 text-sm ${s.targetDate === p.date ? 'border-accent text-accent' : 'border-line text-dim hover:text-ink'}`}>
              {p.label}: {ruDate(p.date).slice(0, 5)}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <Row label={`Дней в патче ${g.current}`} value={gain.currentDays} />
          <Row label={`Дней в ${g.next} и дальше`} value={gain.nextDays} />
          <Row label={g.currency} value={`+${fmt(gain.jade)}`} />
          <Row label={g.pass} value={`+${fmt(gain.passes)}`} />
          <Row label="Прибавка круток" value={`+${fmt(added)}`} strong />
        </div>
        <p className="text-xs text-dim">
          Доход распределён равномерно: 1/42 патча в день, начиная с завтрашнего. Реальные ивенты и вход выдаются порциями.
          Для дат, близких к сегодняшней, цифра приблизительная.
        </p>
        {s.targetDate && s.targetDate < today && <p className="text-sm text-warn">Эта дата уже прошла, поэтому доход не добавляется.</p>}
        {today >= g.nextStart && <p className="text-sm text-warn">Патч {g.current} по расписанию закончился. Проверьте цифры дохода.</p>}
      </Panel>

      <div className="lg:col-span-2">
        <Panel icon={TrendingUp} title="Доход за патч">
          <p className="flex items-start gap-2 text-sm text-dim">
            <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Снимок на {DATA_DATE}, страница не обновляет его сама. {g.current} ({ruDate(g.patchStart).slice(0, 5)} – {ruDate(isoFromDay(dayNumber(g.nextStart) - 1))}):
              оценка сообщества, не официальная сумма. {g.next} и дальше: базовый шаблон на 42 дня, дата старта тоже оценочная. Все цифры можно менять.
            </span>
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Check id={id('sub')} label={`${g.sub} (+90 в день)`} checked={s.sub} onChange={(v) => set({ sub: v })} />
            <Check id={id('bp')} label={g.bpName} checked={s.bp} onChange={(v) => set({ bp: v })} />
            <Check id={id('mode')} label="Задать доход одной суммой" checked={s.mode === 'total'} onChange={(v) => set({ mode: v ? 'total' : 'items' })} />
          </div>
          {s.mode === 'total' ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {['current', 'next'].map((w) => (
                <NumberField key={w} id={id(`total-${w}`)} label={`Круток за патч ${w === 'current' ? g.current : `${g.next} и дальше`}`}
                  max={1000} value={s.totals[w]} onChange={(v) => set({ totals: { ...s.totals, [w]: v } })}
                  hint="Полная сумма, включая подписку и боевой пропуск." />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="flex flex-col gap-1" htmlFor={id('endgame')}>
                  <span className="text-sm text-dim">Прохождение эндгейма: <b className="text-ink">{s.endgame}%</b></span>
                  <input id={id('endgame')} type="range" min="0" max="100" step="5" value={s.endgame}
                    className="w-full accent-[var(--accent)]" onChange={(e) => set({ endgame: Number(e.target.value) })} />
                </label>
                {s.bp && <NumberField id={id('bpJade')} label={`Боевой пропуск: ${g.currency.toLowerCase()}`} value={s.bpJade} onChange={(v) => set({ bpJade: v })} />}
                {s.bp && <NumberField id={id('bpPasses')} label="Боевой пропуск: крутки" value={s.bpPasses} onChange={(v) => set({ bpPasses: v })} />}
              </div>
              <p className="text-xs text-dim">Бесплатный боевой пропуск не даёт круток для лимитированного баннера.</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {['current', 'next'].map((w) => (
                  <div key={w} className="flex min-w-0 flex-col gap-3">
                    <h3 className="flex flex-wrap items-baseline justify-between gap-2 font-semibold">
                      <span>{w === 'current' ? `Патч ${g.current} (оценка)` : `${g.next} и дальше (шаблон)`}</span>
                      <span className="text-accent tabular-nums">≈ {patchPulls(w)} круток</span>
                    </h3>
                    <Row label="Ежедневные задания" value={fmt(60 * PATCH_DAYS)} />
                    {s.sub && <Row label={g.sub} value={fmt(90 * PATCH_DAYS)} />}
                    {g.plans[w].map((def) => (
                      <fieldset key={def.key} className="min-w-0 border-t border-line pt-2">
                        <legend className="sr-only">{def.label}</legend>
                        <p className="pb-1 text-sm" aria-hidden="true">{def.label}{def.endgame && <span className="text-dim"> (при 100%)</span>}</p>
                        <div className="grid grid-cols-2 gap-2">
                          <NumberField id={id(`${w}-${def.key}-jade`)} label="Валюта" value={s.plans[w][def.key].jade}
                            onChange={(v) => setPlan(w, def.key, 'jade', v)} />
                          <NumberField id={id(`${w}-${def.key}-passes`)} label="Крутки" value={s.plans[w][def.key].passes}
                            onChange={(v) => setPlan(w, def.key, 'passes', v)} />
                        </div>
                      </fieldset>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-dim">Источники:</span>
            {g.sources.map(([label, url]) => (
              <a key={url} href={url} target="_blank" rel="noreferrer" className="text-accent underline">{label}</a>
            ))}
          </div>
        </Panel>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm lg:col-span-2">
        {confirmReset ? (
          <>
            <span>Стереть все введённые данные по {g.name}?</span>
            <button type="button" className="rounded-md border border-bad px-3 py-1.5 text-bad"
              onClick={() => { reset(); setConfirmReset(false); }}>Да, стереть</button>
            <button type="button" className="rounded-md border border-line px-3 py-1.5" onClick={() => setConfirmReset(false)}>Отмена</button>
          </>
        ) : (
          <button type="button" className="flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-dim hover:text-ink"
            onClick={() => setConfirmReset(true)}>
            <RotateCcw size={14} aria-hidden="true" />Сбросить данные этой игры
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [state, setState] = useState(load);
  const game = state.tab;

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* хранилище недоступно: калькулятор работает без сохранения */
    }
  }, [state]);

  const set = (patch) => setState((p) => ({ ...p, [p.tab]: { ...p[p.tab], ...patch } }));
  const reset = () => setState((p) => ({ ...p, [p.tab]: defaults(p.tab) }));

  return (
    <div data-game={game} className="app min-h-screen text-ink">
      <div className="shell mx-auto flex max-w-5xl flex-col gap-4 py-5">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display flex items-center gap-2 text-2xl font-extrabold">
            <Sparkles className="text-accent" aria-hidden="true" />Планировщик круток
          </h1>
          <div role="tablist" aria-label="Игра" className="flex gap-1 rounded-full border border-line bg-panel p-1">
            {[['hsr', Star], ['gi', Gem]].map(([key, Icon]) => (
              <button key={key} type="button" role="tab" aria-selected={game === key}
                onClick={() => setState((p) => ({ ...p, tab: key }))}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${game === key ? 'bg-accent text-bg' : 'text-dim hover:text-ink'}`}>
                <Icon size={16} aria-hidden="true" />{GAMES[key].name}
              </button>
            ))}
          </div>
        </header>
        <GameView key={game} game={game} s={state[game]} set={set} reset={reset} />
      </div>
    </div>
  );
}
