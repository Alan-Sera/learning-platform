import type { ReactNode } from "react";
import { Accessibility, BarChart3, Bell, Bookmark, ChevronRight, CirclePlay, Clock3, Eye, FileText, Grid2X2, Search, Target, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { ProgressBar } from "@/components/ui/progress-bar";
import { SearchInput } from "@/components/ui/search-input";
import { Select } from "@/components/ui/select";
import { CourseCard } from "@/components/cards/course-card";
import { LessonVideoCard } from "@/components/cards/lesson-video-card";
import { LessonCard } from "@/components/cards/lesson-card";
import { ResourceCard } from "@/components/cards/resource-card";
import { Navbar } from "@/components/nav/navbar";
import { Breadcrumbs } from "@/components/nav/breadcrumbs";
import { PaginationDemo } from "./pagination-demo";
import "./showcase.css";

function Section({ number, title, children, className = "" }: { number: string; title: string; children: ReactNode; className?: string }) {
  return <section className={`ds-panel ${className}`} aria-labelledby={`section-${number}`}><h2 id={`section-${number}`} className="ds-section-heading"><span>{number}</span>{title}</h2>{children}</section>;
}

const primaryColors = [
  ["Primary 500", "#F97316", "bg-primary-500"], ["Primary 400", "#FB923C", "bg-primary-400"],
  ["Primary 300", "#FDBA74", "bg-primary-300"], ["Primary 200", "#FED7AA", "bg-primary-200"],
  ["Primary 100", "#FFEEE5", "bg-primary-100"],
] as const;
const neutralColors = [
  ["Neutral 900", "#0F172A", "bg-neutral-900"], ["Neutral 700", "#334155", "bg-neutral-700"],
  ["Neutral 500", "#64748B", "bg-neutral-500"], ["Neutral 300", "#CBD5E1", "bg-neutral-300"],
  ["Neutral 200", "#E2E8F0", "bg-neutral-200"], ["Neutral 100", "#F1F5F9", "bg-neutral-100"],
  ["Neutral 50", "#FAFAFC", "bg-neutral-50"], ["White", "#FFFFFF", "bg-white"],
] as const;
const typeRows = [
  ["Display 1", "Playfair Display", "48 / 56", "Bold", "Page titles", "text-display-1"],
  ["Display 2", "Playfair Display", "36 / 44", "Bold", "Section titles", "text-display-2"],
  ["Heading 1", "Inter", "28 / 36", "Semi Bold", "Card titles", "text-heading-1"],
  ["Heading 2", "Inter", "22 / 30", "Semi Bold", "Sub section", "text-heading-2"],
  ["Heading 3", "Inter", "18 / 26", "Medium", "Small titles", "text-heading-3"],
  ["Body Large", "Inter", "16 / 24", "Regular", "Body copy", "text-body-large"],
  ["Body", "Inter", "14 / 20", "Regular", "Supporting text", "text-body"],
  ["Small", "Inter", "12 / 16", "Regular", "Captions, meta", "text-small"],
] as const;
const spacing = [4, 8, 12, 16, 24, 32, 40, 48, 64];
const radii = [["4px", "xs", "rounded-xs"], ["8px", "sm", "rounded-sm"], ["12px", "md", "rounded-md"], ["16px", "lg", "rounded-lg"], ["24px", "xl", "rounded-xl"], ["Full", "circle", "rounded-full"]] as const;
const shadows = [["Sm", "0 1px 2px 0 rgba(15, 23, 42, 0.05)", "shadow-sm"], ["Md", "0 4px 12px -2px rgba(15, 23, 42, 0.08)", "shadow-md"], ["Lg", "0 12px 24px -4px rgba(15, 23, 42, 0.10)", "shadow-lg"], ["Xl", "0 20px 40px -8px rgba(15, 23, 42, 0.12)", "shadow-xl"]] as const;
const icons = [Bell, Search, CirclePlay, FileText, Bookmark, BarChart3, Clock3, UserRound, ChevronRight];
const buttonVariants = ["primary", "secondary", "tertiary", "text"] as const;
const buttonLabels = ["Get Started", "Explore Courses", "View Lesson ↗", "Watch Video ⊙"];

export default function DesignSystemPage() {
  return <main className="ds-sheet">
    <div className="ds-hero ds-panel">
      <div className="ds-intro"><Logo /><h1 className="text-display-1">Design System</h1><p>A unified design language for Vertex learning platform. Clean, modern and focused on clarity, consistency and intuitive learning experiences.</p><div className="ds-version">VERSION 1.0 <span>·</span> MAY 2025</div></div>
      <div className="ds-colors"><h2 id="section-01" className="ds-section-heading"><span>01</span>COLORS</h2><p className="ds-subhead">Primary</p><div className="ds-swatches ds-swatches-primary">{primaryColors.map(([name, hex, color]) => <div key={name}><div className={`ds-swatch ${color}`} /><p>{name}</p><small>{hex}</small></div>)}</div><p className="ds-subhead">Neutral</p><div className="ds-swatches ds-swatches-neutral">{neutralColors.map(([name, hex, color]) => <div key={name}><div className={`ds-swatch ${color}`} /><p>{name}</p><small>{hex}</small></div>)}</div></div>
    </div>

    <div className="ds-grid ds-grid-half"><Section number="02" title="TYPOGRAPHY"><div className="ds-font-samples"><div><span className="ds-ag font-display">Ag</span><div><h3 className="font-display text-[22px]">Playfair Display</h3><p>Elegant <i>·</i> Readable <i>·</i> Timeless</p></div></div><div><span className="ds-ag font-sans">Ag</span><div><h3 className="text-[22px]">Inter</h3><p>Clean <i>·</i> Modern <i>·</i> Highly legible</p></div></div></div></Section>
      <Section number="03" title="TYPE SCALE"><div className="ds-table-wrap"><table className="ds-type-table"><thead><tr>{["Style", "Font", "Size / Line Height", "Weight", "Use"].map(item => <th key={item}>{item}</th>)}</tr></thead><tbody>{typeRows.map(([style, font, size, weight, use]) => <tr key={style}><td className={font === "Playfair Display" ? "font-display" : ""}>{style}</td><td>{font}</td><td>{size}</td><td>{weight}</td><td>{use}</td></tr>)}</tbody></table></div></Section></div>

    <div className="ds-grid ds-grid-spacing"><Section number="04" title="SPACING SYSTEM"><p className="ds-subhead">Base unit: 4px</p><div className="ds-spacing-list">{spacing.map(px => <div key={px}><span className="ds-spacing-bar" style={{ width: Math.max(6, px * .72), height: Math.max(6, px * .72) }} /><strong>{px}</strong><small>({px / 16}rem)</small></div>)}</div></Section><Section number="05" title="RADIUS & SHADOWS"><p className="ds-subhead">Radius</p><div className="ds-radius-list">{radii.map(([value, label, radius]) => <div key={label}><span className={`ds-radius-box ${radius}`} /><strong>{value}</strong><small>({label})</small></div>)}</div><p className="ds-subhead ds-shadow-title">Shadows</p><div className="ds-shadow-list">{shadows.map(([name, css, shadow]) => <div className={shadow} key={name}><strong>{name}</strong><small>{css}</small></div>)}</div></Section></div>

    <div className="ds-grid ds-grid-components"><Section number="06" title="ICONS"><p className="ds-subhead">Outline Style</p><div className="ds-icons">{icons.map((Icon, i) => <Icon key={i} size={22} strokeWidth={2} aria-hidden="true" />)}</div><p className="ds-subhead">Filled Style</p><div className="ds-icons">{icons.map((Icon, i) => i === 2 ? <svg key={i} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" /><path d="m10 7 7 5-7 5V7Z" fill="white" /></svg> : <Icon key={i} size={22} fill={i === 0 || i === 4 || i === 7 ? "currentColor" : "none"} strokeWidth={i === 0 || i === 4 || i === 7 ? 1.5 : 3} aria-hidden="true" />)}</div><p className="ds-subhead ds-icon-spec-title">Icon Specs</p><ul className="ds-specs"><li>24×24px grid</li><li>2px stroke width (outline)</li><li>Rounded line caps</li><li>Consistent optical balance</li></ul></Section>
      <Section number="07" title="BUTTONS"><div className="ds-button-table"><span />{buttonVariants.map(v => <span className="ds-button-column-label" key={v}>{v}</span>)}{["Default", "Hover", "Disabled"].map(state => <div className="ds-button-row" key={state}><span>{state}</span>{buttonVariants.map((variant, index) => <Button key={variant} variant={variant} size="md" disabled={state === "Disabled"} className={state === "Hover" && variant === "primary" ? "bg-primary-600" : state === "Hover" && variant === "secondary" ? "bg-primary-100" : state === "Hover" && variant === "tertiary" ? "bg-neutral-50" : ""}>{buttonLabels[index]}</Button>)}</div>)}</div><p className="ds-subhead ds-button-spec-title">Button Specs</p><ul className="ds-specs"><li>Height: 44px (default)</li><li>Padding: 0 16px (lg), 0 12px (md)</li><li>Radius: 12px</li><li>Font: Inter Medium (14–16px)</li></ul></Section>
      <Section number="08" title="INPUTS"><div className="ds-field"><label htmlFor="ds-search">Search / Text Input</label><SearchInput id="ds-search" placeholder="Search anything..." /></div><div className="ds-field"><label htmlFor="ds-select">Select</label><Select id="ds-select" defaultValue="most-relevant"><option value="most-relevant">Most Relevant</option><option value="newest">Newest</option><option value="oldest">Oldest</option></Select></div><p className="ds-subhead ds-input-spec-title">Field Specs</p><ul className="ds-specs"><li>Height: 44px</li><li>Radius: 12px</li><li>Border: 1px solid #E2E8F0</li><li>Padding: 0 16px</li><li>Focus: Border color #FB923C</li></ul></Section></div>

    <div className="ds-grid ds-grid-three"><Section number="09" title="BADGES / TAGS"><div className="ds-badges">{(["video", "lesson", "popular"] as const).map(variant => <div key={variant}><p>{variant}</p><Badge variant={variant} /></div>)}</div></Section><Section number="10" title="STATUS / INDICATORS"><div className="ds-statuses">{(["in-progress", "completed", "now-playing", "locked"] as const).map(status => <StatusIndicator key={status} status={status} />)}</div></Section><Section number="11" title="PROGRESS BAR"><div className="ds-progress"><ProgressBar value={35} label="Course completion" /></div></Section></div>

    <Section number="12" title="CARDS" className="ds-cards-panel"><div className="ds-cards-grid"><div><p className="ds-example-title">Course Card</p><CourseCard title="Next.js for Production" description="Build scalable, high-performance web applications with Next.js." level="Intermediate" duration="18h 24m" modules="12 modules" /></div><div><p className="ds-example-title">Lesson Card (Video)</p><LessonVideoCard title="Data Fetching in Server Components" description="Learn how to fetch data on the server using async/await and Next.js best practices." lesson="Lesson 5.1" duration="12:45" actionLabel="Watch from 12:45" /></div><div><p className="ds-example-title">Lesson Card (Lesson)</p><LessonCard title="Data Fetching & Caching" description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance." module="Module 5" actionLabel="View lesson" /></div><div><p className="ds-example-title">Resource Card</p><ResourceCard title="Caching and Revalidation Guide" description="Deep dive into Next.js caching strategies." type="PDF" size="1.2 MB" /></div></div></Section>

    <Section number="13" title="NAVIGATION" className="ds-navigation-panel"><div className="ds-navigation-examples"><div><Navbar items={[{ label: "Courses", href: "/design-system", active: true }, { label: "My Learning" }]} /></div><div><p className="ds-example-title">Breadcrumbs</p><Breadcrumbs items={[{ label: "All Courses" }, { label: "Next.js for Production" }, { label: "Data Fetching & Caching" }]} /></div><div><p className="ds-example-title">Pagination</p><PaginationDemo /></div></div></Section>

    <Section number="14" title="PRINCIPLES" className="ds-principles-panel"><div className="ds-principles"><div><Eye aria-hidden="true" /><p><strong>Clarity First</strong><span>Every element should communicate clearly.</span></p></div><div><Grid2X2 aria-hidden="true" /><p><strong>Consistency</strong><span>Use components and patterns consistently across the platform.</span></p></div><div><Target aria-hidden="true" /><p><strong>Focus & Calm</strong><span>Remove noise and help learners focus on what matters.</span></p></div><div><Accessibility aria-hidden="true" /><p><strong>Accessible</strong><span>Design with accessibility and inclusivity in mind.</span></p></div></div></Section>
  </main>;
}
