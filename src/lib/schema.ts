/**
 * Schema.org JSON-LD builders
 *
 * Reusable helpers for generating structured data. Pass the output(s) to
 * <PageLayout schema={...}> on any page that needs additional schema beyond
 * the global business schema (which is included automatically on every page).
 *
 * Update BUSINESS_INFO below with the canonical business details. ABN and
 * builder licence number are optional - leave empty and they'll be omitted
 * from the output.
 */

// ============================================================
// CONFIGURE ALYK BUILDING DETAILS HERE
// ============================================================

const BUSINESS_INFO = {
  name: 'ALYK Building',
  legalName: 'ALYK Building',
  description:
    'Custom architectural builders on the Tweed Coast, working closely with architects from initial detailing through to handover.',
  email: 'alykbuilding@gmail.com',
  // Primary phone (in international E.164 format for schema)
  telephone: '+61401023458',
  // Additional contact points (Aaron + Yarran)
  contactPoints: [
    { name: 'Aaron Lee', telephone: '+61401023458' },
    { name: 'Yarran Kerr', telephone: '+61432363124' },
  ],
  founders: ['Aaron Lee', 'Yarran Kerr'],
  // Locality only - no street address (home-based, by-appointment business)
  address: {
    locality: 'Cabarita Beach',
    region: 'NSW',
    postalCode: '2488',
    country: 'AU',
  },
  // Suburbs ALYK services along the Tweed/Byron coast (north to south)
  areaServed: [
    'Fingal Head',
    'Kingscliff',
    'Casuarina',
    'Cabarita Beach',
    'Hastings Point',
    'Pottsville',
    'Wooyung',
    'Ocean Shores',
    'New Brighton',
  ],
  sameAs: ['https://instagram.com/alykbuilding'],
  // Optional - fill in when available
  abn: '', // e.g. '12 345 678 901'
  builderLicence: '', // NSW builder licence number, e.g. '123456C'
  foundingDate: '', // e.g. '2018'
};

// ============================================================
// SCHEMA BUILDERS
// ============================================================

/**
 * Global business schema. Included on every page via BaseLayout.
 * Uses GeneralContractor (a LocalBusiness sub-type) - the closest fit for
 * a custom home builder. Omits street address; uses areaServed for the
 * coastal strip ALYK works in.
 */
export function getBusinessSchema(site: URL | string) {
  const siteUrl = typeof site === 'string' ? site : site.href.replace(/\/$/, '');

  const identifiers: Array<Record<string, string>> = [];
  if (BUSINESS_INFO.abn) {
    identifiers.push({
      '@type': 'PropertyValue',
      propertyID: 'ABN',
      value: BUSINESS_INFO.abn,
    });
  }
  if (BUSINESS_INFO.builderLicence) {
    identifiers.push({
      '@type': 'PropertyValue',
      propertyID: 'NSW Builder Licence',
      value: BUSINESS_INFO.builderLicence,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${siteUrl}/#business`,
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    description: BUSINESS_INFO.description,
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_INFO.address.locality,
      addressRegion: BUSINESS_INFO.address.region,
      postalCode: BUSINESS_INFO.address.postalCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    areaServed: BUSINESS_INFO.areaServed.map((name) => ({
      '@type': 'City',
      name,
    })),
    founder: BUSINESS_INFO.founders.map((name) => ({
      '@type': 'Person',
      name,
    })),
    contactPoint: BUSINESS_INFO.contactPoints.map((cp) => ({
      '@type': 'ContactPoint',
      contactType: 'sales',
      name: cp.name,
      telephone: cp.telephone,
      areaServed: 'AU',
      availableLanguage: 'English',
    })),
    sameAs: BUSINESS_INFO.sameAs,
    ...(BUSINESS_INFO.foundingDate && { foundingDate: BUSINESS_INFO.foundingDate }),
    ...(identifiers.length > 0 && { identifier: identifiers }),
  };
}

/**
 * BreadcrumbList schema for inner pages.
 * Pass items in the same shape used by the Breadcrumbs component.
 */
export function getBreadcrumbSchema(
  site: URL | string,
  items: Array<{ label: string; href?: string }>
) {
  const siteUrl = typeof site === 'string' ? site : site.href.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href && { item: new URL(item.href, siteUrl + '/').href }),
    })),
  };
}

/**
 * Service schema for individual service offerings.
 */
export function getServiceSchema(
  site: URL | string,
  {
    name,
    description,
    path,
    serviceType,
  }: { name: string; description: string; path: string; serviceType: string }
) {
  const siteUrl = typeof site === 'string' ? site : site.href.replace(/\/$/, '');

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: new URL(path, siteUrl + '/').href,
    serviceType,
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: BUSINESS_INFO.areaServed.map((suburb) => ({
      '@type': 'City',
      name: suburb,
    })),
  };
}
