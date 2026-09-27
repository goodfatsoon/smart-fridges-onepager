# Smart Fridges Onepager

Static test onepager for Smart Fridges.

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
