import { useState } from "react";

type Screen = {
  label: string;
  title: string;
  body: string;
  visual: string;
  cards?: string[];
  metrics?: [string, string][];
  timeline?: [string, string][];
  areas?: string[];
  download?: {
    label: string;
    href: string;
  };
};

type Module = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  theme: "veloci" | "rgc";
  screens: Screen[];
};

const pdfs = {
  velocisuite: "/downloads/velocisuite-flyer-2025.pdf",
  rgc: "/downloads/rgc-factsheet-2025.pdf"
};

function trackEvent(eventName: string, data?: Record<string, string | number>) {
  console.log("[Tracking]", eventName, data);

  // Später z. B. Google Analytics:
  // window.gtag?.("event", eventName, data);

  // Später z. B. Matomo:
  // window._paq?.push(["trackEvent", "NFC Microsite", eventName, JSON.stringify(data)]);
}

const modules: Module[] = [
  {
    id: "velocisuite",
    eyebrow: "Technology Leader",
    title: "VelociSuite® Technologies",
    subtitle:
      "Proprietary technology platforms designed to address drug development bottlenecks.",
    theme: "veloci",
    screens: [
      {
        label: "Overview",
        title: "Science to Medicine® — accelerated by technology",
        body:
          "VelociSuite® brings together proprietary technologies that support targeted and efficient study of disease biology and the creation of new therapeutics.",
        visual: "VS"
      },
      {
        label: "Genetics & Models",
        title: "From precise gene alterations to disease models",
        body:
          "VelociGene® enables precise genetic alterations. VelociMouse® supports accelerated generation of genetically modified mice for disease models, target validation, and candidate testing.",
        visual: "DNA",
        cards: ["VelociGene®", "VelociMouse®"]
      },
      {
        label: "Human Antibodies",
        title: "Human antibodies and bispecific formats",
        body:
          "VelocImmune® supports fully human antibody development. Veloci-Bi® enables full-length human bispecific antibodies. VelociMab® supports candidate selection and production cell-line generation.",
        visual: "AB",
        cards: ["VelocImmune®", "Veloci-Bi®", "VelociMab®"]
      },
      {
        label: "Advanced Platforms",
        title: "Extending discovery into new therapeutic directions",
        body:
          "VelociHum®, VelociT®, VelociNator™ and VelociVax™ support testing of human therapeutics, TCR generation, target-pairing optimization and mRNA-based therapeutic exploration.",
        visual: "RX",
        cards: ["VelociHum®", "VelociT®", "VelociNator™", "VelociVax™"]
      },
      {
        label: "Download",
        title: "Original material",
        body:
          "Download the source PDF or return to the main menu to explore additional Regeneron materials.",
        visual: "PDF",
        download: {
          label: "Download VelociSuite® Flyer",
          href: pdfs.velocisuite
        }
      }
    ]
  },
  {
    id: "rgc",
    eyebrow: "Human Genetics",
    title: "Regeneron Genetics Center®",
    subtitle:
      "Early gene discovery and functional genomics to advance genetics-informed therapeutics.",
    theme: "rgc",
    screens: [
      {
        label: "Overview",
        title: "Genetics to therapeutics, designed for all",
        body:
          "The Regeneron Genetics Center focuses on early gene discovery and functional genomics to identify novel drug targets, clinical indications, and genomic biomarkers.",
        visual: "RGC"
      },
      {
        label: "Key Metrics",
        title: "A global genetics engine",
        body:
          "Selected metrics from the RGC factsheet, prepared for a concise mobile overview.",
        visual: "2.7M+",
        metrics: [
          ["2.7M+", "exomes sequenced"],
          ["650K+", "underrepresented individuals sequenced"],
          ["150+", "collaborations"],
          ["250+", "publications authored"],
          ["6", "genetic medicine programs in clinic"],
          ["~30", "therapeutic programs started"]
        ]
      },
      {
        label: "Milestones",
        title: "RGC milestones",
        body:
          "A condensed timeline of selected milestones from the original RGC factsheet.",
        visual: "2013",
        timeline: [
          ["2013", "RGC founded; foundational Geisinger initiative launched."],
          ["2020", "1,000,000th exome sequenced."],
          ["2023", "10-year anniversary."],
          ["2024", "Whole-exome sequencing approach validated."],
          [
            "2025",
            "Truveta collaboration and large-scale protein study initiated."
          ]
        ]
      },
      {
        label: "Therapeutic Areas",
        title: "Therapeutic areas of interest",
        body:
          "The RGC factsheet highlights a broad set of therapeutic areas spanning oncology, cardiovascular, metabolic, immune, respiratory and neurological diseases.",
        visual: "TA",
        areas: [
          "Oncology",
          "Cardiovascular",
          "Metabolic",
          "Musculoskeletal",
          "Ophthalmology",
          "Infectious Diseases",
          "Respiratory Diseases",
          "Immune Diseases",
          "Founder & Special Populations",
          "Neurology"
        ]
      },
      {
        label: "Download",
        title: "Original material",
        body:
          "Download the source PDF or return to the main menu to explore additional Regeneron materials.",
        visual: "PDF",
        download: {
          label: "Download RGC Factsheet",
          href: pdfs.rgc
        }
      }
    ]
  }
];

function Header({
  inModule,
  onHome
}: {
  inModule?: boolean;
  onHome: () => void;
}) {
  return (
    <header className="app-header">
      <button className="icon-button" onClick={onHome}>
        {inModule ? "←" : "☰"}
      </button>

      <div className="regeneron-logo">
        <div className="regeneron-main">REGENERON</div>
        <div className="regeneron-sub">SCIENCE TO MEDICINE®</div>
      </div>
    </header>
  );
}

function HomeScreen({ openModule }: { openModule: (id: string) => void }) {
  return (
    <div className="page-shell">
      <div className="phone">
        <Header onHome={() => {}} />

        <main className="home-screen">
          <div className="badge">16th EPCM Hamburg</div>

          <h1>WHO WE ARE</h1>

          <p className="intro">
          Regeneron is a global biotechnology company that invents life-transforming medicines for people with serious diseases
          </p>

          <section className="module-list">
            {modules.map((mod) => (
              <button
                key={mod.id}
                className={`module-card ${mod.theme}`}
                onClick={() => {
                  trackEvent("module_open", {
                    module_id: mod.id,
                    module_title: mod.title
                  });
                  openModule(mod.id);
                }}
              >
                <div className="module-card-top">
                  <div className="round-icon">{mod.theme === "rgc" ? "RGC" : "VS"}</div>
                  <div className="arrow">›</div>
                </div>

                <div className="eyebrow">{mod.eyebrow}</div>
                <h2>{mod.title}</h2>
                <p>{mod.subtitle}</p>
              </button>
            ))}

            <div className="coming-soon">
              <div className="plus">＋</div>
              <div>
                <strong>More content coming soon</strong>
                <p>
                  New PDF or PPT materials can be added as additional tiles.
                </p>
              </div>
            </div>
          </section>

          <div className="hint-box">
            Tip: You can return to the home screen at any time using the navigation bar at the bottom.
          </div>
          <footer className="legal-footer">
  <a href="/impressum.html">Legal Notice</a>
  <span>·</span>
  <a href="/datenschutz.html">Privacy Policy</a>
</footer>
        </main>
      </div>
    </div>
  );
}

function Visual({ label, theme }: { label: string; theme: "veloci" | "rgc" }) {
  return (
    <div className={`visual-circle ${theme}`}>
      <span>{label}</span>
    </div>
  );
}

function ScreenContent({ screen }: { screen: Screen }) {
  return (
    <>
      {screen.cards && (
        <div className="content-grid one">
          {screen.cards.map((card) => (
            <div className="content-card large" key={card}>
              {card}
            </div>
          ))}
        </div>
      )}

      {screen.metrics && (
        <div className="content-grid two">
          {screen.metrics.map(([number, label]) => (
            <div className="metric-card" key={label}>
              <div className="metric-number">{number}</div>
              <div className="metric-label">{label}</div>
            </div>
          ))}
        </div>
      )}

      {screen.timeline && (
        <div className="timeline">
          {screen.timeline.map(([year, text]) => (
            <div className="timeline-item" key={year}>
              <div className="timeline-year">{year}</div>
              <div className="timeline-text">{text}</div>
            </div>
          ))}
        </div>
      )}

      {screen.areas && (
        <div className="content-grid two">
          {screen.areas.map((area) => (
            <div className="area-card" key={area}>
              <div className="area-icon">✦</div>
              <div>{area}</div>
            </div>
          ))}
        </div>
      )}

      {screen.download && (
        <a
        className="download-button"
        href={screen.download.href}
        download
        onClick={() =>
          trackEvent("pdf_download", {
            label: screen.download!.label,
            href: screen.download!.href
          })
        }
      >
        ↓ {screen.download.label}
      </a>
    )}
    </>
  );
}

function ModuleScreen({
  module,
  onHome
}: {
  module: Module;
  onHome: () => void;
}) {
  const [index, setIndex] = useState(0);
  const screen = module.screens[index];
  const progress = ((index + 1) / module.screens.length) * 100;

  const goBack = () => {
    if (index === 0) {
      trackEvent("module_back_to_menu", {
        module_id: module.id,
        module_title: module.title
      });
      onHome();
    } else {
      trackEvent("screen_back", {
        module_id: module.id,
        from_screen: screen.label,
        to_screen: module.screens[index - 1].label
      });
      setIndex(index - 1);
    }
  };

  const goNext = () => {
    if (index === module.screens.length - 1) {
      trackEvent("module_complete", {
        module_id: module.id,
        module_title: module.title
      });
      onHome();
    } else {
      trackEvent("screen_next", {
        module_id: module.id,
        from_screen: screen.label,
        to_screen: module.screens[index + 1].label
      });
      setIndex(index + 1);
    }
  };

  return (
    <div className="page-shell">
      <div className="phone">
        <Header inModule onHome={onHome} />

        <main className={`module-screen ${module.theme}`}>
          <div className="module-progress-row">
            <span>{module.eyebrow}</span>
            <span>
              {index + 1}/{module.screens.length}
            </span>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <Visual label={screen.visual} theme={module.theme} />

          <section className="screen-card">
            <div className="screen-label">{screen.label}</div>
            <h1>{screen.title}</h1>
            <p>{screen.body}</p>

            <ScreenContent screen={screen} />
          </section>

          <nav className="bottom-nav">
            <button onClick={goBack}>{index === 0 ? "Menu" : "Back"}</button>
            <button onClick={onHome}>⌂</button>
            <button className="primary" onClick={goNext}>
              {index === module.screens.length - 1 ? "Done" : "Next"}
            </button>
          </nav>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const activeModule = modules.find((m) => m.id === activeModuleId);

  if (activeModule) {
    return (
      <ModuleScreen
        module={activeModule}
        onHome={() => setActiveModuleId(null)}
      />
    );
  }

  return <HomeScreen openModule={setActiveModuleId} />;
}

<footer className="legal-footer">
  <a href="/impressum.html">Legal Notice</a>
  <span>·</span>
  <a href="/datenschutz.html">Privacy Policy</a>
</footer>