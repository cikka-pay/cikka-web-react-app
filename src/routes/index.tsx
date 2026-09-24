import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  AudioLines,
  Bell,
  ChevronLeft,
  CircleDollarSign,
  Contact,
  CreditCard,
  EyeOff,
  Landmark,
  Plus,
  Send,
  Users,
  WalletCards,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Payer — Borderless Payments" },
      { name: "description", content: "Fast, secure and borderless payments, powered by Payer." },
      { property: "og:title", content: "Payer — Borderless Payments" },
      { property: "og:description", content: "Fast, secure and borderless payments, powered by Payer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PayerLanding,
});

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const travel = rect.height + window.innerHeight;
      setProgress(Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

function PayerLanding() {
  return (
    <main className="payer-page">
      <Header />
      <Hero />
      <QuickActions />
      <LargePayments />
      <CardsScene />
      <LightContinuation />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header" aria-label="Main navigation">
      <a className="brand-mark" href="#top" aria-label="Payer home"><span /></a>
      <nav className="nav-links">
        <a href="#features">Features</a>
        <a href="#download">Download</a>
        <a href="#company">Company</a>
        <a href="#support">Support</a>
      </nav>
      <a className="get-app" href="#download">Get app</a>
    </header>
  );
}

function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const motion = {
    "--hero-shift": `${progress * -90}px`,
    "--hero-scale": `${0.92 + progress * 0.12}`,
    "--glow-scale": `${0.82 + progress * 0.5}`,
  } as CSSProperties;

  return (
    <section id="top" ref={ref} className="hero-section" style={motion}>
      <div className="hero-sticky">
        <h1 className="hero-title"><span>We&apos;ve</span><span>Got You</span></h1>
        <div className="ambient-glow hero-glow" />
        <Phone className="hero-phone">
          <div className="hero-screen">
            <div className="hero-loop"><span /></div>
            <div className="hero-screen-copy">
              <div className="mini-brand"><i /> Payer</div>
              <strong>Borderless<br />Payments</strong>
              <p>Move money without borders.</p>
            </div>
          </div>
        </Phone>
      </div>
    </section>
  );
}

function QuickActions() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const style = { "--quick-progress": progress } as CSSProperties;
  const actions = [
    [ArrowUp, "Transfer"],
    [WalletCards, "Request"],
    [CircleDollarSign, "Savings"],
    [Users, "Contact"],
  ] as const;

  return (
    <section id="features" ref={ref} className="quick-section" style={style}>
      <div className="story-sticky quick-grid">
        <div className="feature-copy">
          <h2 className="gradient-title">Quick<br />Actions</h2>
          <p>All major actions are just a tap away, right on the home screen. Enjoy a seamless and efficient user experience.</p>
          <div className="action-grid">
            {actions.map(([Icon, label]) => (
              <div className="action-tile" key={label} aria-label={label}><Icon strokeWidth={1.5} /></div>
            ))}
          </div>
        </div>
        <div className="phone-stage">
          <div className="ambient-glow quick-glow" />
          <Phone className="dashboard-phone"><DashboardScreen /></Phone>
        </div>
      </div>
    </section>
  );
}

function DashboardScreen() {
  return (
    <div className="dashboard-screen">
      <div className="phone-status"><b>9:41</b><span>● ◒ ▰</span></div>
      <div className="profile-row"><div className="avatar">H</div><div><small>How&apos;s it going</small><b>Haley</b></div><Bell size={15} /></div>
      <div className="add-card"><span>Add Your New Card</span><Plus size={14} /></div>
      <div className="balance-card">
        <div className="visa-row"><b>VISA</b><EyeOff size={14} /></div>
        <span>**** **** **** 3241</span><small>Total Balance</small><strong>$214,453.00</strong>
      </div>
      <div className="mini-actions">
        <span><ArrowUp />Transfer</span><span><WalletCards />Request</span><span><Landmark />Savings</span><span><Users />Contact</span>
      </div>
      <div className="history"><div><b>History Transaction</b><small>See All</small></div><p><i>Ps</i><span><b>Abode Photoshop</b><small>Jan 21 2025 · 04:44 PM</small></span><strong>$19</strong></p></div>
      <div className="phone-nav"><Landmark /><CreditCard /><span><WalletCards /></span><AudioLines /><div className="avatar tiny">H</div></div>
    </div>
  );
}

function LargePayments() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const style = { "--pay-progress": progress } as CSSProperties;
  return (
    <section ref={ref} className="payments-section" style={style}>
      <div className="story-sticky payments-grid">
        <div className="payment-phone-wrap">
          <div className="ambient-glow pay-glow" />
          <Phone className="payment-phone"><TransferScreen /></Phone>
        </div>
        <div className="payment-copy">
          <h2 className="gradient-title">Large<br />Payments</h2>
          <p>Send payments over $1,000,000 USD with ease and confidence. Experience unmatched security for high-value transactions.</p>
          <div className="million-card">
            <strong>$1,000,000</strong>
            <div><span>Add Note (Optional)</span><i><Send /></i></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TransferScreen() {
  return (
    <div className="transfer-screen">
      <div className="phone-status"><b>9:41</b><span>● ◒ ▰</span></div>
      <h3><ChevronLeft />Transfer Money</h3>
      <div className="recipient"><div className="avatar">H</div><span><b>Haley Baylee</b><small>1234 - 5678 - 9012 - 3456</small></span></div>
      <strong>$44,000</strong>
      <div className="transfer-fill" />
      <div className="transfer-note"><span>Add Note (Optional)</span><i><Send /></i></div>
    </div>
  );
}

function CardsScene() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const spread = Math.min(1, Math.max(0, (progress - 0.22) / 0.42));
  const style = { "--card-spread": spread } as CSSProperties;
  return (
    <section id="download" ref={ref} className="cards-section" style={style}>
      <div className="cards-sticky">
        <h2>Say <span>bye</span> to cards</h2>
        <div className="bank-card-stack">
          <BankCard className="bank-card card-left" number="3455 4562 7710 3507" />
          <BankCard className="bank-card card-center" number="3455 4562 7710 3507" />
          <BankCard className="bank-card card-right" number="3455 4562 7710 3507" />
        </div>
      </div>
    </section>
  );
}

function BankCard({ className, number }: { className: string; number: string }) {
  return <div className={className}><CreditCard /><span className="card-number">{number}</span><small>Cardholder name<br /><b>Haley Baylee</b></small><small className="expiry">Expiry date<br /><b>02/30</b></small></div>;
}

function LightContinuation() {
  return (
    <section id="company" className="light-section">
      <div className="light-top-band" />
      <div className="trust-block">
        <p>Trusted by 15,000+ founders &amp; business owners</p>
        <div className="logo-marquee"><div className="logo-track">
          <LogoGlyph name="Dummy Logo" glyph="◉" /><LogoGlyph name="Digital Dummy" glyph="◒" /><LogoGlyph name="Logo Text" glyph="✺" /><LogoGlyph name="Brand Name" glyph="◀" /><LogoGlyph name="Logo ipsum" glyph="●" />
          <LogoGlyph name="Dummy Logo" glyph="◉" /><LogoGlyph name="Digital Dummy" glyph="◒" />
        </div></div>
      </div>
      <div className="product-continuation">
        <div className="expenses-visual">
          <div className="soft-shape one" /><div className="soft-shape two" /><div className="soft-shape three" />
          <div className="light-phone"><div className="light-notch" /><p>Expenses</p><small>September 2020</small><strong>$1,812</strong><div className="budget"><span>Left to spend<br /><b>$738</b></span><span>Monthly budget<br /><b>$2,550</b></span><i /></div><div className="expense-row">🚙 <span>Auto &amp; transport</span><b>$700</b></div><div className="expense-row">▣ <span>Bill &amp; Utilities</span><b>$320</b></div></div>
          <div className="member-float"><span className="avatar-cluster">●●●</span><b>Join your team</b></div>
        </div>
        <div className="light-copy">
          <h2>We simplify the way you pay<br />our platform offers</h2>
          <p>We simplify the way you pay our platform offers secure transactions, tools, and a seamless experience for easy everyday payments</p>
          <a href="#support" className="start-button">Get started now <span>↗</span></a>
          <div className="stats">
            <div><strong>20<span>m</span></strong><b>Active users</b><p>Active users enjoying a simpler way to manage every payment.</p></div>
            <div><strong>100<span>+</span></strong><b>Team member</b><p>Skilled team driving secure, thoughtful financial products.</p></div>
          </div>
        </div>
      </div>
      <div id="support" className="light-footer"><b>Payer</b><span>Payments without borders.</span></div>
    </section>
  );
}

function LogoGlyph({ glyph, name }: { glyph: string; name: string }) {
  return <div><i>{glyph}</i><b>{name}</b></div>;
}

function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`phone-shell ${className}`}><div className="phone-inner"><div className="dynamic-island" />{children}</div></div>;
}