import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CreditCard,
  Globe2,
  Camera,
  Layers3,
  MessageCircle,
  Menu,
  PencilRuler,
  Plus,
  Printer,
  Sparkles,
  Truck,
  Users,
  X,
} from "lucide-react";
import {
  brand,
  pageContent,
  personalizedQuoteMessage,
  productQuoteMessage,
} from "./content";
import { PhotoAsset } from "./components/PhotoAsset";
import { BootMugViewer } from "./components/BootMugViewer";
import { LazyProcessLottieIcon } from "./components/LazyProcessLottieIcon";
import { SectionLabel } from "./components/SectionLabel";
import { WhatsAppLink } from "./components/WhatsAppLink";
import { ScrollEffects } from "./components/ScrollEffects";
import { UiEffects } from "./components/UiEffects";

const reasonIcons = [Check, Printer, CreditCard, Globe2, Users];
const processIcons = [Layers3, PencilRuler, Printer, Sparkles, Truck];

function Wordmark() {
  return (
    <a className="wordmark" href="#inicio" aria-label={`${brand.name} — ${pageContent.ui.homeLabel}`}>
      <svg className="wordmark__symbol" viewBox="0 0 42 26" fill="none" aria-hidden="true">
        <path
          d="M21 13C13.8 1.8 5.8 1.8 1.5 13c4.3 11.2 12.3 11.2 19.5 0Zm0 0c7.2-11.2 15.2-11.2 19.5 0-4.3 11.2-12.3 11.2-19.5 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{brand.name}</span>
    </a>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    if (window.matchMedia("(max-width: 52rem)").matches) {
      toggleRef.current?.focus({ preventScroll: true });
    }
  };

  return (
    <header className="site-header" ref={headerRef}>
      <div className="site-header__inner page-container">
        <Wordmark />
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? pageContent.footer.closeMenuAction : pageContent.footer.menuAction}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
        </button>
        <nav
          className={`site-nav${menuOpen ? " site-nav--open" : ""}`}
          id="primary-navigation"
          aria-label={pageContent.ui.navigationLabel}
        >
          {pageContent.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
          <WhatsAppLink className="button button--small button--outline" position="meio" data-magnetic onClick={closeMobileMenu}>
            {pageContent.hero.action}
            <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
          </WhatsAppLink>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-pad" id="inicio" aria-labelledby="hero-title">
      <div className="hero__grid page-container">
        <div className="hero__copy">
          <SectionLabel>{pageContent.hero.eyebrow}</SectionLabel>
          <h1 id="hero-title">{pageContent.hero.title}</h1>
          <p className="hero__description">{pageContent.hero.description}</p>
          <div className="hero__actions">
            <WhatsAppLink className="button button--primary" position="hero" data-magnetic>
              {pageContent.hero.action}
              <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </WhatsAppLink>
            <a className="text-link" href="#pecas">
              {pageContent.hero.browseAction} <ArrowRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
          <div className="hero__footnote">
            <span className="micro-tag">{brand.phrases[0]}</span>
            <span className="hero__footnote-rule" aria-hidden="true" />
            <span className="micro-tag">{brand.shipping}</span>
          </div>
        </div>

        <div className="hero__visual" role="group" aria-label={pageContent.hero.imageAlt}>
          <div className="hero__visual-top">
            <span className="micro-tag">{pageContent.ui.heroFeatureLabel}</span>
            <span className="micro-tag">{pageContent.ui.heroItemCode}</span>
          </div>
          <BootMugViewer
            image={pageContent.hero.image}
            alt={pageContent.hero.imageAlt}
            className="hero__photo"
            loading="eager"
          />
          <div className="hero__product-note">
            <span className="hero__product-index">01</span>
            <span>
              <strong>{pageContent.ui.heroProductName}</strong>
              <small>{pageContent.ui.heroProductNote}</small>
            </span>
            <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span className="registration-mark registration-mark--top" aria-hidden="true" />
          <span className="registration-mark registration-mark--bottom" aria-hidden="true" />
        </div>
      </div>
      <div className="hero__atmosphere" aria-hidden="true">
        <span data-hero-parallax="0.18" />
        <span data-hero-parallax="0.42" />
        <span data-hero-parallax="0.7" />
      </div>
      <div className="hero__baseline page-container" aria-hidden="true">
        <span>{pageContent.ui.heroBaselineLeft}</span>
        <span>{pageContent.ui.heroBaselineCenter}</span>
        <span>{pageContent.ui.heroBaselineCount}</span>
      </div>
    </section>
  );
}

function MarqueeSection() {
  return (
    <section className="marquee" aria-label={pageContent.ui.marqueeLabel}>
      <div className="page-container marquee__heading">
        <SectionLabel>{pageContent.ui.marqueeEyebrow}</SectionLabel>
      </div>
      <div className="marquee__inner page-container">
        {pageContent.marquee.map((item, index) => (
          <span className="marquee__item" key={item}>
            <span className="marquee__index">0{index + 1}</span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ManifestoSection() {
  const { quote, emphasis } = pageContent.manifesto;
  const emphasizedWords = new Set(emphasis.split(" "));
  const words = quote.split(/\s+/);

  return (
    <section className="manifesto section-pad" aria-labelledby="manifesto-title">
      <div className="page-container manifesto__grid">
        <SectionLabel>{pageContent.manifesto.eyebrow}</SectionLabel>
        <h2 id="manifesto-title">
          {words.map((word, index) => {
            const cleanWord = word.replace(/[.,!?]$/, "");
            return (
              <span
                className={`manifesto-word${emphasizedWords.has(cleanWord) ? " manifesto-word--emphasis" : ""}`}
                key={`${word}-${index}`}
              >
                {word}
              </span>
            );
          })}
        </h2>
        <p className="manifesto__signature">{brand.phrases[1]}</p>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process-section section-pad" id="processo" aria-labelledby="process-title">
      <div className="page-container">
        <div className="section-heading section-heading--split" data-scroll-reveal>
          <div>
            <SectionLabel>{pageContent.process.eyebrow}</SectionLabel>
            <h2 id="process-title">{pageContent.process.title}</h2>
          </div>
          <p>{pageContent.process.intro}</p>
        </div>
        <div className="process-layout" data-process-section>
          <ol className="process-list">
            {pageContent.process.steps.map((step, index) => {
              const FallbackIcon = processIcons[index];
              return (
                <li className="process-step" key={step}>
                  <span className="process-step__number">0{index + 1}</span>
                  <LazyProcessLottieIcon index={index} fallback={FallbackIcon} />
                  <h3>{step}</h3>
                  <p>{pageContent.process.stepDescriptions[index]}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateControls = () => {
      setCanScrollBack(rail.scrollLeft > 2);
      setCanScrollForward(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
    };

    updateControls();
    rail.addEventListener("scroll", updateControls, { passive: true });
    const resizeObserver = new ResizeObserver(updateControls);
    resizeObserver.observe(rail);
    if (rail.firstElementChild) resizeObserver.observe(rail.firstElementChild);

    return () => {
      rail.removeEventListener("scroll", updateControls);
      resizeObserver.disconnect();
    };
  }, []);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <section className="products-section section-pad" id="pecas" aria-labelledby="products-title">
      <div className="page-container">
        <div className="section-heading section-heading--split" data-scroll-reveal>
          <div>
            <SectionLabel>{pageContent.products.eyebrow}</SectionLabel>
            <h2 id="products-title">{pageContent.products.title}</h2>
          </div>
          <p>{pageContent.products.intro}</p>
        </div>

        <div ref={railRef} className="product-rail" data-product-rail role="region" aria-label={pageContent.products.panelsLabel} tabIndex={0}>
          <div className="product-mosaic" data-product-track>
            {pageContent.products.items.map((product, index) => (
              <article className={`product-tile product-tile--${index + 1}`} key={product.name}>
                <PhotoAsset src={product.image} alt={product.alt} className="product-tile__photo" />
                <div className="product-tile__caption">
                  <div>
                    <span className="micro-tag">{pageContent.ui.productIndexPrefix} / {String(index + 1).padStart(2, "0")}</span>
                    <h3>{product.name}</h3>
                  </div>
                  <WhatsAppLink
                    className="icon-link"
                    aria-label={`${pageContent.ui.productQuotePrefix} ${product.name}`}
                    position="produto"
                    message={productQuoteMessage(product.name)}
                  >
                    <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
                  </WhatsAppLink>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="product-rail-controls" role="group" aria-label="Controles da galeria de produtos">
          <button className="product-rail-control" type="button" aria-label="Ver produtos anteriores" onClick={() => moveRail(-1)} disabled={!canScrollBack}>
            <ArrowLeft size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <button className="product-rail-control" type="button" aria-label="Ver próximos produtos" onClick={() => moveRail(1)} disabled={!canScrollForward}>
            <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PersonalizeSection() {
  const [name, setName] = useState("");
  const selectedColor = pageContent.personalize.colors[0];
  const personalizedMessage = personalizedQuoteMessage(name, selectedColor.name);

  return (
    <section className="personalize-section section-pad" id="personalize" aria-labelledby="personalize-title">
      <div className="page-container personalize-layout">
        <div className="personalize-copy" data-scroll-reveal>
          <SectionLabel>{pageContent.personalize.eyebrow}</SectionLabel>
          <h2 id="personalize-title">{pageContent.personalize.title}</h2>
          <p>{pageContent.personalize.intro}</p>
          <div className="personalize-steps">
            {pageContent.personalize.flowSteps.map((step, index) => (
              <span key={step}><span>0{index + 1}</span> {step}</span>
            ))}
          </div>
        </div>

        <div className="customizer">
          <div className="customizer__preview">
            <div className="customizer__meta">
              <span className="micro-tag">{pageContent.personalize.product}</span>
            </div>
            <BootMugViewer
              image={pageContent.personalize.image}
              alt={pageContent.personalize.imageAlt}
              className="customizer__photo"
            />
          </div>

          <div className="customizer__controls">
            <label className="field-label" htmlFor="personalized-name">{pageContent.ui.personalizeNameLabel}</label>
            <input
              id="personalized-name"
              className="text-input"
              type="text"
              maxLength={24}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={pageContent.personalize.defaultName}
              autoComplete="off"
            />
            <div className="customizer__input-meta" aria-hidden="true">
              <span>{pageContent.ui.nameCharacterCount.replace("{count}", String(name.length))}</span>
              <span>{name.trim() ? pageContent.ui.previewUpdatedLabel : pageContent.ui.previewHintLabel}</span>
            </div>
            <div className="customizer__fixed-color" aria-label={`Cor disponível: ${selectedColor.name}`}>
              <span className="customizer__fixed-color-swatch" style={{ backgroundColor: selectedColor.value }} aria-hidden="true" />
              <span><small>Cor da peça</small><strong>{selectedColor.name}</strong></span>
            </div>
            <WhatsAppLink
              className="button button--primary button--full"
              position="produto"
              message={personalizedMessage}
            >
              {pageContent.personalize.action}
              <ArrowUpRight size={18} strokeWidth={1.7} aria-hidden="true" />
            </WhatsAppLink>
            <p className="customizer__note">{pageContent.personalize.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="reasons-section section-pad" id="sobre" aria-labelledby="reasons-title">
      <div className="page-container">
        <div className="section-heading" data-scroll-reveal>
          <SectionLabel>{pageContent.reasons.eyebrow}</SectionLabel>
          <h2 id="reasons-title">{pageContent.reasons.title}</h2>
        </div>
        <div className="reasons-grid" data-scroll-reveal-group>
          {pageContent.reasons.items.map((reason, index) => {
            const Icon = reasonIcons[index];
            return (
              <article className={`reason reason--${index + 1}`} key={reason.title} data-scroll-reveal-item data-tilt-card>
                <span className="reason__index">0{index + 1}</span>
                <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                <h3>{reason.title}</h3>
                <p>{reason.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChristmasSection() {
  return (
    <section className="christmas-section section-pad" id="natal" aria-labelledby="christmas-title">
      <div className="page-container">
        <div className="christmas-heading" data-scroll-reveal>
          <div>
            <SectionLabel>{pageContent.christmas.eyebrow}</SectionLabel>
            <h2 id="christmas-title">{pageContent.christmas.title}</h2>
          </div>
          <WhatsAppLink
            className="button button--christmas"
            position="natal"
            message={pageContent.christmas.whatsappMessage}
          >
            {pageContent.christmas.action}
            <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </WhatsAppLink>
        </div>
        <div className="christmas-gallery">
          {pageContent.christmas.items.map((item, index) => (
            <article className={`christmas-piece christmas-piece--${index + 1}`} key={item.name}>
              <PhotoAsset src={item.image} alt={item.alt} className="christmas-piece__photo" />
              <div className="christmas-piece__caption">
                <span className="micro-tag">{pageContent.ui.christmasItemPrefix} / 0{index + 1}</span>
                <h3>{item.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialSection() {
  return (
    <section className="social-section section-pad" aria-labelledby="social-title">
      <div className="page-container social-layout">
        <div className="social-copy" data-scroll-reveal>
          <SectionLabel>{pageContent.social.eyebrow}</SectionLabel>
          <h2 id="social-title">{pageContent.social.title}</h2>
          <p className="social-copy__disclosure">{pageContent.social.disclosure}</p>
          <div className="testimonial-list" data-scroll-reveal-group>
            {pageContent.social.testimonials.map((item, index) => (
              <figure className="testimonial" key={`${item.name}-${index}`} data-scroll-reveal-item>
                <span className="testimonial__index">0{index + 1}</span>
                <blockquote>{item.quote}</blockquote>
                <figcaption>{item.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="instagram-preview" data-scroll-reveal>
          <div className="instagram-preview__heading">
            <span className="micro-tag">{pageContent.social.instagramLabel}</span>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label={brand.instagramHandle}>
              {brand.instagramHandle}<ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
          <div className="instagram-preview__grid">
            {pageContent.social.previewImages.map((item) => (
              <a
                className="instagram-preview__image"
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                key={item.src}
                aria-label={`${pageContent.ui.instagramAltPrefix}${item.alt}`}
              >
                <PhotoAsset src={item.src} alt={item.alt} />
              </a>
            ))}
          </div>
          <a className="text-link" href={brand.instagram} target="_blank" rel="noopener noreferrer">
            {pageContent.social.instagramAction}
            <Camera size={16} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function OrderingSection() {
  return (
    <section className="ordering-section section-pad" aria-labelledby="ordering-title">
      <div className="page-container ordering-layout">
        <div className="ordering-copy" data-scroll-reveal>
          <SectionLabel>{pageContent.ordering.eyebrow}</SectionLabel>
          <h2 id="ordering-title">{pageContent.ordering.title}</h2>
          <ol className="ordering-steps">
            {pageContent.ordering.steps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="faq-list" data-scroll-reveal>
          <SectionLabel>{pageContent.ordering.faqLabel}</SectionLabel>
          <h3>{pageContent.faqHeading}</h3>
          {pageContent.faq.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <Plus size={18} strokeWidth={1.6} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="closing-section section-pad" id="orcamento" aria-labelledby="closing-title">
      <div className="page-container closing-layout">
        <div data-scroll-reveal>
          <SectionLabel>{pageContent.closing.eyebrow}</SectionLabel>
          <h2 id="closing-title">{pageContent.closing.title}</h2>
        </div>
        <WhatsAppLink className="button button--primary button--large" position="final" data-magnetic>
          {pageContent.closing.action}
          <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />
        </WhatsAppLink>
        <span className="closing-index" aria-hidden="true">{pageContent.ui.closingCount}</span>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__main">
        <div className="site-footer__brand">
          <Wordmark />
          <p>{pageContent.footer.line}</p>
        </div>
        <div className="site-footer__links">
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer">
            {pageContent.footer.instagramAction}
            <Camera size={15} strokeWidth={1.7} aria-hidden="true" />
          </a>
          <WhatsAppLink position="final">
            {pageContent.footer.whatsappAction}
            <ArrowUpRight size={15} strokeWidth={1.7} aria-hidden="true" />
          </WhatsAppLink>
        </div>
        <div className="site-footer__payment">
          <span className="micro-tag">{pageContent.ui.paymentLabel}</span>
          <p>{pageContent.footer.payment}</p>
          <span className="micro-tag">{brand.shipping}</span>
        </div>
      </div>
      <div className="page-container site-footer__base">
        <span>{pageContent.ui.copyright} {new Date().getFullYear()} {brand.name}</span>
        <span>{pageContent.footer.developerCredit}</span>
        <span>{pageContent.ui.footerBaseline}</span>
        <a href="#inicio">{pageContent.ui.backToTop} <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <WhatsAppLink
      className="floating-whatsapp"
      position="flutuante"
      aria-label={pageContent.footer.whatsappAction}
    >
      <MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" />
    </WhatsAppLink>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">{pageContent.ui.skipContent}</a>
      <SiteHeader />
      <main id="conteudo">
        <HeroSection />
        <MarqueeSection />
        <ManifestoSection />
        <ProcessSection />
        <ProductsSection />
        <PersonalizeSection />
        <ReasonsSection />
        <ChristmasSection />
        <SocialSection />
        <OrderingSection />
        <ClosingSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
      <ScrollEffects />
      <UiEffects />
    </>
  );
}
