# Smart Fridges Onepager

Marketingwebsite voor Smart Fridges. De metamorfose van 12 oktober 2026 volgt de aangeleverde Square-stijl; zie `docs/square.md` en `docs/design-decisions.md`.

## Inhoud en techniek

- Bestaande inhoud behouden, met locatievoorbeelden, assortiment, FAQ en aanvraaghulp toegevoegd.
- Buildless HTML/CSS/JavaScript; geen package-installatie nodig voor publicatie.
- Drie nieuwe fotografische conceptvisuals, geoptimaliseerd als WebP. Afbeeldingen zijn geen bewijs van bestaande klantlocaties.
- Lettertypen lokaal gehost: Inter Tight, Inter en DM Sans, met OFL-licenties in `assets/`.
- De locatiecheck maakt een `mailto:` naar `info@smartfridges.nl`. De bezoeker verstuurt de e-mail zelf. De site slaat geen formuliergegevens op en toont geen onbewezen verzendbevestiging.
- Geen analytics, tracking, cookies, testimonials of onbevestigde verkoopcijfers toegevoegd.

## Verificatie, 12 oktober 2026

Originele content, interne links, assets, labels, JavaScript-syntax en de aanvraaglogica zijn gecontroleerd. De DOM-test controleerde ook ongeldige invoer, voorselectie van locaties, aanpassen, veilige tekstweergave, mailto-encoding en de handmatige kopieerroute op HTTP. Er is geen e-mail verzonden.

Visuele browser-QA was niet beschikbaar in de uitvoeromgeving. Desktop- en mobiele weergave zijn daarom nog niet met een browser geverifieerd. Het HTTP-adres was bereikbaar; HTTPS gaf vanuit de uitvoeromgeving een 502-fout. Hosting/DNS is niet aangepast.

## Preview
Configured for GitHub Pages from the repository root.

## Branded URL

Intended URL: https://ontdek.smartfridges.nl/

The root-level `CNAME` file on `main` contains exactly:

```text
ontdek.smartfridges.nl
```

### Manual activation still required

The GitHub connector can edit repository files but cannot manage Pages settings. Adding the CNAME file alone does not configure the Pages custom domain.

1. Open https://github.com/goodfatsoon/smart-fridges-onepager/settings/pages
2. Confirm Source = Deploy from a branch, branch = main, folder = /(root). The README previously described root publishing; a successful dynamic Pages build from main was observed on 2026-09-27. The live settings could not be read through the connector.
3. Set Custom domain to `ontdek.smartfridges.nl` and Save BEFORE adding DNS.
4. At the DNS provider managing the zxcs nameservers, add:

| Type | Name/host | Target | TTL |
| --- | --- | --- | --- |
| CNAME | ontdek | goodfatsoon.github.io. | 600 seconds |

If the provider requires a full hostname, use `ontdek.smartfridges.nl`. Do not include https:// or the repository path in the target. Do not add A or AAAA records at `ontdek` alongside this CNAME.

5. After DNS validation and certificate provisioning complete, enable Enforce HTTPS in Pages settings.
6. Verify https://ontdek.smartfridges.nl/ loads the onepager and retains the branded hostname in the address bar.

### DNS check: 2026-09-27

Public DNS-over-HTTPS queries returned:

| Host | Existing records | Decision |
| --- | --- | --- |
| smartfridges.nl | A: 185.104.29.174, 185.158.133.1; AAAA: 2a06:2ec0:1::170 | Preserve |
| www.smartfridges.nl | A: 185.104.29.174; AAAA: 2a06:2ec0:1::170 | Preserve |
| app.smartfridges.nl | A: 149.202.79.3 | Preserve |
| ontdek.smartfridges.nl | NXDOMAIN for A, AAAA, CNAME, TXT and CAA | Available in public DNS at check time |

Nameservers: ns.zxcs.nl, ns.zxcs.eu, ns.zxcs.be. No CAA restriction was returned at smartfridges.nl. A random sibling hostname also returned NXDOMAIN, so that test found no wildcard address response. These are public DNS observations, not a complete private DNS-zone export. No DNS records were modified during this setup.

Reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
