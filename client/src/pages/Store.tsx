import React, { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  CircleHelp,
  Heart,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";

export type Product = {
  slug: string;
  name: string;
  eyebrow: string;
  price: number;
  compareAt?: number;
  score: number;
  description: string;
  longDescription: string;
  highlights: string[];
  specs: string[];
  colors: string[];
  category: string;
  badge: string;
  art: "travel" | "desk" | "pet";
};

export const products: Product[] = [
  {
    slug: "compression-packing-cubes",
    name: "Compression Packing Cubes",
    eyebrow: "Travel / 6-piece set",
    price: 29,
    compareAt: 39,
    score: 84,
    description: "Pack more calmly. Keep every outfit in its place.",
    longDescription:
      "A six-piece suitcase organization set with mechanical zipper compression, breathable mesh panels, and tidy handles. Built for weekenders, work trips, and anyone who prefers a calm suitcase.",
    highlights: ["Six useful sizes", "Mechanical zipper compression", "Breathable mesh panels", "Soft, fold-flat construction"],
    specs: ["Material: polyester and mesh", "Set includes: 6 organizers", "Care: wipe clean and air dry", "Use: clothing, shoes, accessories"],
    colors: ["Midnight", "Sand", "Olive"],
    category: "Travel",
    badge: "Best seller",
    art: "travel",
  },
  {
    slug: "cable-control-kit",
    name: "Cable Control Kit",
    eyebrow: "Desk / 12-piece set",
    price: 9,
    compareAt: 14,
    score: 83,
    description: "The tiny reset your desk has been waiting for.",
    longDescription:
      "A practical desk starter kit for charging cables, earbuds, and everyday wires. Mix, match, and label your way to a calmer workspace without tools or permanent installation.",
    highlights: ["Mixed clip sizes", "Strong adhesive pads", "Reusable cable ties", "Works on clean smooth surfaces"],
    specs: ["Set includes: 12 clips + 6 ties", "Colors: black and soft white", "Install: clean, press, wait", "Use: desk, bedside, media console"],
    colors: ["Ink", "Cloud"],
    category: "Desk",
    badge: "Easy win",
    art: "desk",
  },
  {
    slug: "self-cleaning-pet-brush",
    name: "Self-Cleaning Pet Brush",
    eyebrow: "Pet care / everyday grooming",
    price: 15,
    compareAt: 22,
    score: 83,
    description: "A gentler grooming ritual, with one satisfying click.",
    longDescription:
      "A routine grooming brush designed to lift loose fur from short- and medium-coated pets. Rounded pins and a one-button ejector make clean-up quick and simple.",
    highlights: ["One-button fur release", "Rounded grooming pins", "Comfort-grip handle", "For routine grooming"],
    specs: ["Material: ABS and silicone grip", "Use: short and medium coats", "Care: remove fur and wipe clean", "Note: always groom gently"],
    colors: ["Midnight", "Clay"],
    category: "Pet care",
    badge: "Pet pick",
    art: "pet",
  },
];

type CartLine = { product: Product; quantity: number };
type CartContextValue = {
  items: CartLine[];
  add: (product: Product) => void;
  decrease: (slug: string) => void;
  remove: (slug: string) => void;
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside StoreShell");
  return value;
}

function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-art art-${product.art} ${large ? "product-art-large" : ""}`} aria-label={`${product.name} product illustration`}>
      <div className="art-glow" />
      {product.art === "travel" && (
        <>
          <div className="cube cube-back" />
          <div className="cube cube-front" />
          <div className="cube cube-small" />
          <span className="art-label">PACK LIGHT</span>
        </>
      )}
      {product.art === "desk" && (
        <>
          <div className="desk-surface" />
          <div className="cable cable-one" />
          <div className="cable cable-two" />
          <div className="clip clip-one" />
          <div className="clip clip-two" />
          <span className="art-label">CLEAR SPACE</span>
        </>
      )}
      {product.art === "pet" && (
        <>
          <div className="brush-handle" />
          <div className="brush-head"><span /><span /><span /><span /><span /><span /><span /><span /></div>
          <div className="fur-dot fur-one" /><div className="fur-dot fur-two" /><div className="fur-dot fur-three" />
          <span className="art-label">GENTLE CARE</span>
        </>
      )}
    </div>
  );
}

function Header() {
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="staging-bar">Private preview · payments and checkout are disabled</div>
      <div className="nav-wrap">
        <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href="/" className="wordmark"><span className="wordmark-mark">M</span><span>midnight<span className="wordmark-dot">.</span></span></Link>
        <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Shop</a>
          <Link href="/info/about" onClick={() => setMenuOpen(false)}>Our story</Link>
          <Link href="/info/faq" onClick={() => setMenuOpen(false)}>Help</Link>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Search" onClick={() => toast("Search is coming soon in the private preview.")}><Search size={19} /></button>
          <button className="bag-button" onClick={() => setOpen(true)} aria-label={`Open bag with ${count} items`}><ShoppingBag size={19} /><span>{count}</span></button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Link href="/" className="wordmark footer-mark"><span className="wordmark-mark">M</span><span>midnight<span className="wordmark-dot">.</span></span></Link><p>Small upgrades for everyday living.</p></div>
        <div className="footer-links"><div><strong>Explore</strong><Link href="/#shop">Shop all</Link><Link href="/info/about">Our story</Link></div><div><strong>Support</strong><Link href="/info/faq">FAQ</Link><Link href="/info/contact">Contact</Link></div><div><strong>Policies</strong><Link href="/info/shipping">Shipping</Link><Link href="/info/returns">Returns</Link></div></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Midnight Store · Private preview</span><span>Made for calmer days.</span></div>
    </footer>
  );
}

function CartDrawer() {
  const { items, add, decrease, remove, subtotal, open, setOpen } = useCart();
  if (!open) return null;
  return <>
    <button className="drawer-backdrop" onClick={() => setOpen(false)} aria-label="Close bag" />
    <aside className="cart-drawer" aria-label="Shopping bag">
      <div className="drawer-head"><div><span className="eyebrow">Your bag</span><h2>{items.length ? "Ready when you are." : "Your bag is quiet."}</h2></div><button className="icon-button" onClick={() => setOpen(false)} aria-label="Close bag"><X size={20} /></button></div>
      {items.length === 0 ? <div className="empty-bag"><div className="empty-icon"><ShoppingBag size={24} /></div><p>Save your everyday upgrades here.</p><Link href="/#shop" className="text-link" onClick={() => setOpen(false)}>Explore the collection <ArrowRight size={16} /></Link></div> : <>
        <div className="cart-lines">{items.map(({ product, quantity }) => <div className="cart-line" key={product.slug}><div className="cart-thumb"><ProductArt product={product} /></div><div className="cart-info"><div className="line-title"><strong>{product.name}</strong><button onClick={() => remove(product.slug)} aria-label={`Remove ${product.name}`}><X size={14} /></button></div><span>${product.price.toFixed(2)}</span><div className="qty-control"><button onClick={() => decrease(product.slug)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{quantity}</span><button onClick={() => add(product)} aria-label="Increase quantity"><Plus size={13} /></button></div></div></div>)}</div>
        <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes are calculated during launch setup.</p><button className="button button-dark button-full" onClick={() => toast("Checkout is disabled while Midnight Store is in private preview.")}>Continue to checkout <ArrowRight size={17} /></button><span className="preview-note"><ShieldCheck size={14} /> No live payment is connected</span></div>
      </>}
    </aside>
  </>;
}

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return <article className="product-card"><Link href={`/product/${product.slug}`} className="product-card-art"><span className="product-badge">{product.badge}</span><ProductArt product={product} /></Link><div className="product-card-copy"><div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={12} fill="currentColor" /> 4.9</span></div><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.description}</p><div className="product-buy"><div><strong>${product.price}</strong>{product.compareAt && <del>${product.compareAt}</del>}</div><button className="quick-add" onClick={() => { add(product); toast(`${product.name} added to your bag.`); }} aria-label={`Add ${product.name} to bag`}><Plus size={18} /></button></div></div></article>;
}

export function Home() {
  return <div className="page"><Header /><main>
    <section className="hero-section"><div className="hero-copy"><span className="eyebrow hero-eyebrow"><Sparkles size={14} /> The everyday edit</span><h1>Small upgrades.<br /><em>Big difference.</em></h1><p>Thoughtful essentials for travel, work, and the people (and pets) you care about. Curated to make ordinary routines feel a little more considered.</p><div className="hero-actions"><a href="#shop" className="button button-dark">Shop the edit <ArrowRight size={17} /></a><Link href="/info/about" className="text-link">Why Midnight? <ArrowRight size={16} /></Link></div><div className="hero-proof"><div className="proof-avatars"><span>TL</span><span>MS</span><span>+</span></div><span>Loved by early testers<br /><b>Everyday, made better.</b></span></div></div><div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card hero-card-main"><span className="eyebrow">Curated for calm</span><div className="hero-stack"><div className="stack-item stack-back" /><div className="stack-item stack-mid" /><div className="stack-item stack-front" /></div><span className="hero-card-caption">Useful things, beautifully simple.</span></div><div className="hero-note note-one">01 <span>pack lighter</span></div><div className="hero-note note-two">02 <span>clear the clutter</span></div></div></section>
    <section className="trust-strip"><div><Truck size={20} /><span><b>Tracked delivery</b><small>Clear updates, always</small></span></div><div><RotateCcw size={20} /><span><b>Simple returns</b><small>30-day policy draft</small></span></div><div><ShieldCheck size={20} /><span><b>Thoughtfully chosen</b><small>Less, but better</small></span></div></section>
    <section className="shop-section" id="shop"><div className="section-heading"><div><span className="eyebrow">The first edit</span><h2>Useful things for<br /><em>everyday rituals.</em></h2></div><p>Three products. Three small ways to make space for what matters.</p></div><div className="product-grid">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div></section>
    <section className="manifesto-section"><div className="manifesto-number">/ 01</div><div><span className="eyebrow">The Midnight point of view</span><h2>Good design should<br /><em>earn its place.</em></h2></div><div className="manifesto-copy"><p>We look for the quiet wins: a suitcase that closes without a fight, a desk that lets you think, a grooming ritual that feels gentler.</p><Link href="/info/about" className="text-link">Read our story <ArrowRight size={16} /></Link></div></section>
    <section className="newsletter-section"><div><span className="eyebrow">The midnight note</span><h2>Useful ideas, no noise.</h2><p>Join the private preview list for product drops, practical tips, and the occasional good find.</p></div><form onSubmit={(event) => { event.preventDefault(); toast("You’re on the preview list. Thank you."); }}><input type="email" required placeholder="Your email address" aria-label="Your email address" /><button className="button button-light" type="submit">Join the list <ArrowRight size={16} /></button></form></section>
  </main><Footer /><CartDrawer /></div>;
}

export function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find(item => item.slug === params.slug);
  const { add, setOpen } = useCart();
  if (!product) return <InfoPage params={{ page: "404" }} />;
  return <div className="page"><Header /><main className="product-detail-page"><Link href="/#shop" className="back-link"><ArrowLeft size={16} /> Back to the edit</Link><section className="product-detail"><div className="detail-visual"><ProductArt product={product} large /><span className="detail-score"><Sparkles size={13} /> Opportunity score {product.score}/100</span></div><div className="detail-copy"><span className="eyebrow">{product.category} · {product.eyebrow.split(" / ")[1]}</span><h1>{product.name}</h1><div className="detail-rating"><span><Star size={14} fill="currentColor" /> 4.9</span><span>Early tester favorite</span></div><p className="detail-lead">{product.longDescription}</p><div className="detail-price"><strong>${product.price}</strong>{product.compareAt && <><del>${product.compareAt}</del><span>Preview price</span></>}</div><div className="color-select"><span>Color direction</span><div>{product.colors.map(color => <button key={color} onClick={() => toast(`${color} selected for the private preview.`)}>{color}</button>)}</div></div><button className="button button-dark button-large button-full" onClick={() => { add(product); setOpen(true); }}>Add to bag <ShoppingBag size={17} /></button><div className="detail-assurance"><span><Truck size={18} /><b>Tracked delivery</b><small>Final rates set at launch</small></span><span><RotateCcw size={18} /><b>Simple returns</b><small>30-day draft policy</small></span></div></div></section><section className="detail-lower"><div><span className="eyebrow">Why you’ll like it</span><h2>Designed around<br /><em>the real routine.</em></h2></div><div className="detail-highlights">{product.highlights.map((highlight, index) => <div key={highlight}><span>0{index + 1}</span><p>{highlight}</p><Check size={16} /></div>)}</div></section><section className="specs-section"><div><span className="eyebrow">Details</span><h2>Everything<br /><em>you need to know.</em></h2></div><div className="spec-list">{product.specs.map(spec => <div key={spec}><Check size={16} />{spec}</div>)}</div></section></main><Footer /><CartDrawer /></div>;
}

const infoPages: Record<string, { eyebrow: string; title: ReactNode; intro: string; sections: { title: string; body: string }[] }> = {
  about: { eyebrow: "Our story", title: <>Everyday,<br /><em>made better.</em></>, intro: "Midnight Store is a considered edit of small, useful things for modern everyday life.", sections: [{ title: "Less, but better", body: "We started with a simple question: what makes a routine feel lighter? Not more stuff. Better choices. Products that solve a real friction point, feel good to use, and earn their place in your home, bag, desk, or daily ritual." }, { title: "A quiet kind of confidence", body: "Midnight is the moment when the noise drops away and you can think clearly. Our aesthetic follows that feeling: warm, calm, practical, and quietly premium. We are building a store that values clarity over clutter and usefulness over hype." }, { title: "Starting small, intentionally", body: "This private preview begins with three everyday solutions: packing cubes for calmer travel, cable clips for clearer spaces, and a grooming brush for gentler pet care. We will grow only when a product meets the standard." }] },
  faq: { eyebrow: "Help center", title: <>Questions,<br /><em>answered simply.</em></>, intro: "We believe the best support is clear before you need it. Here are the first answers.", sections: [{ title: "Is Midnight Store live?", body: "Not yet. This is a private preview. Product pages and the shopping bag are functional for review, but payment, live checkout, supplier ordering, and public publishing are disabled." }, { title: "Where do you deliver?", body: "The first launch market is Lesotho. Final delivery zones, rates, duties, and estimated times will be confirmed after supplier and logistics validation. We will show the details clearly before launch." }, { title: "Can I return an item?", body: "A 30-day returns policy is drafted for review. Final eligibility, condition requirements, return address, and refund timing will be published only after the owner approves the operating model." }, { title: "How can I reach you?", body: "Use the contact page to send a support message during the preview. Live support channels will be connected before launch." }] },
  contact: { eyebrow: "Contact", title: <>Let’s make<br /><em>space for help.</em></>, intro: "Questions, feedback, or a product you think belongs in the edit? We’d love to hear it.", sections: [{ title: "Email", body: "lekoetjeteboho@gmail.com" }, { title: "Phone", body: "+266 6362 1898" }, { title: "Response time", body: "During the private preview, messages are reviewed manually. A customer-service platform and support hours will be configured before public launch." }] },
  shipping: { eyebrow: "Shipping policy draft", title: <>Clear expectations<br /><em>feel good.</em></>, intro: "This draft policy is for owner review and is not yet published as a live store policy.", sections: [{ title: "Processing", body: "Orders will be processed after payment and stock validation. The final processing window will be confirmed with the selected supplier and fulfillment workflow." }, { title: "Delivery", body: "Delivery times and rates will depend on destination, fulfillment route, customs, and local last-mile service. Final rates for Lesotho will be published before launch." }, { title: "Tracking", body: "Where available, a tracking link will be shared after fulfillment. Delays caused by customs or carriers will be communicated clearly." }] },
  returns: { eyebrow: "Returns policy draft", title: <>Keep what works.<br /><em>Return the rest.</em></>, intro: "This draft policy is for owner review and is not yet active.", sections: [{ title: "30-day window", body: "The proposed policy allows a return request within 30 days of delivery, subject to the final terms approved by the owner." }, { title: "Condition", body: "Items should be unused, clean, and in original condition. Product-specific hygiene and pet-care exclusions may apply and will be stated clearly." }, { title: "Refunds", body: "Refund timing, return shipping responsibility, and the return address will be finalized after payment and fulfillment workflows are selected." }] },
};

export function InfoPage({ params }: { params: { page: string } }) {
  const info = infoPages[params.page] ?? { eyebrow: "Not found", title: <>This page<br /><em>is still forming.</em></>, intro: "The link you followed is not part of this private preview yet.", sections: [] };
  return <div className="page"><Header /><main className="info-page"><Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link><section className="info-hero"><span className="eyebrow">{info.eyebrow}</span><h1>{info.title}</h1><p>{info.intro}</p></section><section className="info-sections">{info.sections.map((section, index) => <article key={section.title}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}</section>{params.page === "contact" && <form className="contact-form" onSubmit={(event) => { event.preventDefault(); toast("Thanks — your message has been saved for the private preview."); }}><span className="eyebrow">Send a note</span><input required placeholder="Your name" aria-label="Your name" /><input required type="email" placeholder="Email address" aria-label="Email address" /><textarea required placeholder="How can we help?" aria-label="How can we help?" rows={5} /><button className="button button-dark" type="submit">Send message <ArrowRight size={16} /></button></form>}</main><Footer /><CartDrawer /></div>;
}

export function StoreShell({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const value = useMemo<CartContextValue>(() => ({
    items,
    add: (product) => setItems(current => { const found = current.find(item => item.product.slug === product.slug); return found ? current.map(item => item.product.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]; }),
    decrease: (slug) => setItems(current => current.flatMap(item => item.product.slug === slug ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item])),
    remove: (slug) => setItems(current => current.filter(item => item.product.slug !== slug)),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    open,
    setOpen,
  }), [items, open]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useScrollToHash() {
  const [location] = useLocation();
  if (location.includes("#")) setTimeout(() => document.querySelector(location.split("#")[1] ? `#${location.split("#")[1]}` : "#shop")?.scrollIntoView({ behavior: "smooth" }), 0);
}
