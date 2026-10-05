import {
  Clock,
  Envelope,
  FacebookLogo,
  InstagramLogo,
  Phone,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

const socials = [
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookLogo },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramLogo },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterLogo },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeLogo },
];

export function TopBar() {
  return (
    <div className="hidden bg-primary text-white/85 lg:block">
      <div className="container-x flex h-10 items-center justify-between text-[13.5px]">
        <div className="flex items-center gap-6">
          <a
            href="tel:+442045771900"
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Phone size={15} weight="duotone" className="text-accent" />
            +44 20 4577 1900
          </a>
          <a
            href="mailto:hello@travle.travel"
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Envelope size={15} weight="duotone" className="text-accent" />
            hello@travle.travel
          </a>
          <span className="flex items-center gap-2">
            <Clock size={15} weight="duotone" className="text-accent" />
            Mon–Fri, 9:00–18:00 GMT
          </span>
        </div>
        <div className="flex items-center gap-1">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-accent"
            >
              <Icon size={16} weight="duotone" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
