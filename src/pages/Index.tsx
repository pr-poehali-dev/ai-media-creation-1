import { useState } from "react";
import Icon from "@/components/ui/icon";

const PAYPAL_CLIENT_ID = "f404231c62a0f";

const paypalPlans: Record<string, { amount: string; currency: string; itemName: string }> = {
  "Старт":   { amount: "10.99", currency: "USD", itemName: "NeuroCreate Старт — подписка" },
  "Про":     { amount: "27.99", currency: "USD", itemName: "NeuroCreate Про — подписка" },
  "Бизнес":  { amount: "77.99", currency: "USD", itemName: "NeuroCreate Бизнес — подписка" },
};

function buildPayPalUrl(planName: string) {
  const plan = paypalPlans[planName];
  if (!plan) return "#";
  const params = new URLSearchParams({
    cmd: "_xclick",
    business: PAYPAL_CLIENT_ID,
    item_name: plan.itemName,
    amount: plan.amount,
    currency_code: plan.currency,
    no_shipping: "1",
  });
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}

const tools = [
  {
    id: "photo",
    emoji: "🖼️",
    title: "ИИ Фото",
    subtitle: "Генерация изображений",
    description: "Создавай уникальные фотографии и изображения за секунды. Портреты, пейзажи, продуктовые фото — всё что угодно.",
    image: "https://cdn.poehali.dev/projects/43c64935-9699-450f-beca-bc416978ea0a/files/d7dee0d2-997c-4566-bd01-904838124068.jpg",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
    tag: "от 100 фото/мес",
    color: "#00D4FF",
    accentClass: "gradient-text-cyan",
    borderColor: "border-cyan-500/30",
    bgAccent: "bg-cyan-500/10",
  },
  {
    id: "video",
    emoji: "🎬",
    title: "ИИ Видео",
    subtitle: "Генерация роликов",
    description: "Превращай идеи в видео с профессиональными эффектами. Рекламные ролики, reels, анимации — без оператора и монтажёра.",
    image: "https://cdn.poehali.dev/projects/43c64935-9699-450f-beca-bc416978ea0a/files/c769c832-7ccf-4f23-9e33-1bb12e40ec91.jpg",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    tag: "от 30 видео/мес",
    color: "#FF6B35",
    accentClass: "gradient-text-orange",
    borderColor: "border-orange-500/30",
    bgAccent: "bg-orange-500/10",
  },
  {
    id: "logo",
    emoji: "✨",
    title: "ИИ Логотипы",
    subtitle: "Создание брендинга",
    description: "Фирменный стиль за минуты. Логотипы, иконки, визитки — ИИ создаст уникальный дизайн специально для твоего бизнеса.",
    image: "https://cdn.poehali.dev/projects/43c64935-9699-450f-beca-bc416978ea0a/files/d79f085e-5f69-4445-8634-fa8f670c5419.jpg",
    gradient: "from-green-400 via-emerald-500 to-cyan-500",
    tag: "от 50 логотипов/мес",
    color: "#00FF88",
    accentClass: "gradient-text-green",
    borderColor: "border-green-500/30",
    bgAccent: "bg-green-500/10",
  },
];

const plans = [
  {
    name: "Старт",
    price: "990",
    description: "Для знакомства с ИИ",
    features: ["100 фото в месяц", "10 видео в месяц", "20 логотипов в месяц", "Стандартное качество", "Email поддержка"],
    border: "border-slate-600/50",
    buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    popular: false,
  },
  {
    name: "Про",
    price: "2 490",
    description: "Для профессионалов",
    features: ["500 фото в месяц", "100 видео в месяц", "Безлимит логотипов", "HD качество", "Приоритетная поддержка", "API доступ"],
    border: "border-purple-500/50",
    buttonClass: "bg-white text-purple-900 hover:bg-purple-50",
    popular: true,
  },
  {
    name: "Бизнес",
    price: "6 990",
    description: "Для команд и агентств",
    features: ["Безлимит фото", "Безлимит видео", "Безлимит логотипов", "4K качество", "Персональный менеджер", "White-label", "SLA гарантия"],
    border: "border-amber-500/50",
    buttonClass: "bg-white/10 hover:bg-white/20 text-white",
    popular: false,
  },
];

const faqs = [
  { q: "Нужны ли навыки дизайна?", a: "Нет! Просто опишите что хотите на русском языке — ИИ сделает всё сам." },
  { q: "Смогу ли я использовать результат коммерчески?", a: "Да, все созданные материалы принадлежат вам и могут использоваться в коммерческих целях." },
  { q: "Что если лимит закончится?", a: "Можно купить дополнительный пакет или перейти на более высокий тариф в любой момент." },
  { q: "Есть ли бесплатный период?", a: "Да! Первые 3 дня — бесплатно. Без ввода карты." },
];

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [payModal, setPayModal] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#070B14] text-white overflow-x-hidden">

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 70%)" }} />
        <div className="absolute top-[30%] right-[-15%] w-[400px] h-[400px] rounded-full opacity-15 animate-pulse-glow delay-300"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] rounded-full opacity-10 animate-pulse-glow delay-500"
          style={{ background: "radial-gradient(circle, #00FF88 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10">

        {/* Header */}
        <header className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-sm font-bold">N</div>
            <span className="font-unbounded font-bold text-sm tracking-wider">NEUROCREATE</span>
          </div>
          <button className="text-xs font-golos font-semibold px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-all bg-white/5 hover:bg-white/10">
            Войти
          </button>
        </header>

        {/* Hero */}
        <section className="px-5 pt-10 pb-16 md:px-10 md:pt-20 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-golos font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            ИИ онлайн и готов к работе
          </div>

          <h1 className="font-unbounded text-3xl md:text-6xl font-black leading-tight mb-5">
            Создавай контент<br />
            <span className="gradient-text-cyan">с помощью ИИ</span>
          </h1>

          <p className="font-golos text-base md:text-xl text-white/60 max-w-xl mx-auto mb-8">
            Фото, видео и логотипы за секунды.<br />
            Без дизайнера, без монтажёра, без опыта.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-8 py-3.5 rounded-full font-golos font-semibold text-base bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-all shadow-lg text-white">
              Попробовать бесплатно
            </button>
            <button className="px-8 py-3.5 rounded-full font-golos font-semibold text-base border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all">
              Смотреть демо
            </button>
          </div>
          <p className="mt-4 text-white/40 text-xs font-golos">3 дня бесплатно · Без карты</p>
        </section>

        {/* 3 Tools */}
        <section className="px-5 pb-20 md:px-10">
          <h2 className="font-unbounded text-xl md:text-3xl font-bold text-center mb-2">Выбери инструмент</h2>
          <p className="text-center text-white/50 font-golos mb-10 text-sm">Три направления — одна подписка</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tools.map((tool, i) => (
              <div key={tool.id}
                className={`card-hover rounded-2xl border ${tool.borderColor} bg-white/[0.03] backdrop-blur-sm overflow-hidden group`}>
                <div className="relative h-48 overflow-hidden">
                  <img src={tool.image} alt={tool.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${tool.gradient} opacity-40`} />
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-golos font-semibold ${tool.bgAccent} border ${tool.borderColor} text-white`}>
                    {tool.tag}
                  </div>
                  <div className="absolute bottom-3 left-3 text-3xl animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                    {tool.emoji}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-golos text-white/40 mb-1">{tool.subtitle}</p>
                  <h3 className={`font-unbounded text-xl font-bold mb-2 ${tool.accentClass}`}>{tool.title}</h3>
                  <p className="font-golos text-sm text-white/60 leading-relaxed mb-4">{tool.description}</p>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-golos font-semibold transition-all bg-gradient-to-r ${tool.gradient} text-white hover:opacity-90`}>
                    Начать создавать →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="px-5 py-12 md:px-10 border-y border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "50 000+", label: "Пользователей" },
              { num: "2 млн+", label: "Созданных работ" },
              { num: "< 10 сек", label: "Время генерации" },
              { num: "4.9 ★", label: "Рейтинг в Google" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-unbounded text-2xl md:text-3xl font-black gradient-text-cyan mb-1">{stat.num}</div>
                <div className="font-golos text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="px-5 py-20 md:px-10">
          <h2 className="font-unbounded text-xl md:text-3xl font-bold text-center mb-2">Тарифы</h2>
          <p className="text-center text-white/50 font-golos mb-10 text-sm">Выбери подходящий план и начни создавать</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name}
                className={`relative rounded-2xl border ${plan.border} p-6 flex flex-col bg-white/[0.03] ${plan.popular ? "ring-1 ring-purple-500/50" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-xs font-golos font-bold text-white">
                    Популярный
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="font-unbounded text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="font-golos text-white/50 text-xs">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="font-unbounded text-4xl font-black">{plan.price}</span>
                  <span className="text-white/50 font-golos text-sm ml-1">₽ / мес</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-golos text-sm text-white/70">
                      <Icon name="Check" size={14} className="text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setPayModal(plan.name)}
                  className={`w-full py-3 rounded-xl font-golos font-semibold text-sm transition-all flex items-center justify-center gap-2 ${plan.buttonClass}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.6 3h8.5c2.8 0 4.8 2.1 4.4 4.8l-.9 5.6c-.4 2.3-2.4 4-4.8 4h-1.6c-.3 0-.5.2-.6.5l-.6 3.7c-.1.3-.3.4-.6.4H8.4c-.3 0-.5-.3-.4-.6l.2-1.1M7.6 3l-1.5 9.5M7.6 3H4.3c-.3 0-.5.2-.6.5L2 17.5c-.1.3.2.5.4.5h3.3"/>
                  </svg>
                  {plan.popular ? "Оплатить через PayPal" : "Выбрать план"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 pb-20 md:px-10">
          <h2 className="font-unbounded text-xl md:text-2xl font-bold text-center mb-8">Частые вопросы</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-golos font-semibold text-sm hover:bg-white/5 transition-all"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/40 shrink-0" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 font-golos text-sm text-white/60 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-16 md:px-10">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(0,212,255,0.2) 100%)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: "radial-gradient(circle at 30% 50%, #A855F7, transparent 60%), radial-gradient(circle at 70% 50%, #00D4FF, transparent 60%)" }} />
            <div className="relative z-10">
              <h2 className="font-unbounded text-xl md:text-3xl font-black mb-3">Готов начать?</h2>
              <p className="font-golos text-white/60 mb-6 text-sm">3 дня бесплатно. Без ввода карты. Отмена в любой момент.</p>
              <button className="px-10 py-4 rounded-full font-golos font-bold text-base bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-all text-white">
                Попробовать бесплатно 🚀
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-5 py-8 md:px-10 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-xs font-bold">N</div>
              <span className="font-unbounded text-xs font-bold tracking-wider text-white/60">NEUROCREATE</span>
            </div>
            <div className="flex gap-5 font-golos text-xs text-white/40">
              <a href="#" className="hover:text-white/70 transition-colors">Условия</a>
              <a href="#" className="hover:text-white/70 transition-colors">Политика</a>
              <a href="#" className="hover:text-white/70 transition-colors">Поддержка</a>
              <a href="#" className="hover:text-white/70 transition-colors">Telegram</a>
            </div>
            <p className="font-golos text-xs text-white/30">© 2025 NeuroCreate</p>
          </div>
        </footer>

      </div>

      {/* PayPal Modal */}
      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPayModal(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0D1220] p-7 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}>

            {/* PayPal logo */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#003087] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.6 3h8.5c2.8 0 4.8 2.1 4.4 4.8l-.9 5.6c-.4 2.3-2.4 4-4.8 4h-1.6c-.3 0-.5.2-.6.5l-.6 3.7c-.1.3-.3.4-.6.4H8.4c-.3 0-.5-.3-.4-.6l.2-1.1M7.6 3l-1.5 9.5M7.6 3H4.3c-.3 0-.5.2-.6.5L2 17.5c-.1.3.2.5.4.5h3.3"/>
                </svg>
              </div>
              <div>
                <div className="font-unbounded text-sm font-bold text-white">PayPal</div>
                <div className="font-golos text-xs text-white/40">Безопасная оплата</div>
              </div>
            </div>

            <h3 className="font-unbounded text-lg font-bold text-white mb-1">
              Тариф «{payModal}»
            </h3>
            <p className="font-golos text-sm text-white/50 mb-2">
              {paypalPlans[payModal]?.itemName}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-unbounded text-3xl font-black text-white">
                ${paypalPlans[payModal]?.amount}
              </span>
              <span className="font-golos text-white/40 text-sm">/ месяц</span>
            </div>

            <div className="space-y-3">
              <a
                href={buildPayPalUrl(payModal)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl font-golos font-bold text-sm bg-[#0070ba] hover:bg-[#005ea6] transition-all text-white flex items-center justify-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.6 3h8.5c2.8 0 4.8 2.1 4.4 4.8l-.9 5.6c-.4 2.3-2.4 4-4.8 4h-1.6c-.3 0-.5.2-.6.5l-.6 3.7c-.1.3-.3.4-.6.4H8.4c-.3 0-.5-.3-.4-.6l.2-1.1M7.6 3l-1.5 9.5M7.6 3H4.3c-.3 0-.5.2-.6.5L2 17.5c-.1.3.2.5.4.5h3.3"/>
                </svg>
                Перейти к оплате в PayPal
              </a>
              <button
                onClick={() => setPayModal(null)}
                className="w-full py-3 rounded-xl font-golos text-sm text-white/40 hover:text-white/70 transition-all">
                Отмена
              </button>
            </div>

            <p className="mt-4 font-golos text-xs text-white/25 text-center">
              🔒 Платёж защищён шифрованием PayPal
            </p>
          </div>
        </div>
      )}

    </div>
  );
}