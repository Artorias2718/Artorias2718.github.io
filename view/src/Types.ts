export interface IFAQGroupRead {
    category: string;
    questions: IFAQRead[];
}

export interface IFAQRead {
    question: string;
    answer: string;
}

export interface IGlossaryRead {
    term: string;
    definition: string;
}

export interface IParcelRead {
    id: number;
    rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
    odds: number;
    rate: number;
}

export interface IRegionTierTableRead {
    /** Stable key, e.g. "us". */
    key: string;
    /** Tab label, e.g. "United States". */
    label: string;
    /** Currency the chart is denominated in. */
    currency: string;
    /** Which countries this table applies to (rendered as flag icons). */
    countries: IRegionCountryRead[];
    /**
     * True when the rent-outcome dollar columns are derived rather than
     * published by Atlas Reality. (All tables are currently official.)
     */
    derived?: boolean;
    tiers: IBoostTierRowRead[];
}

export interface IBoostTierRowRead {
    id: number;
    /** Display label, e.g. "1-150" or "6000". */
    parcelsLabel: string;
    /** Minimum number of parcels for tier. Used for sorting". */
    minParcels: number;
    /** Ad boost multiplier for this range, e.g. 30 for "30x". */
    boost: number;
    /** Virtual rent accrued (no ads) per month, USD. */
    noAdsMonth?: number;
    /** Virtual rent accrued (with ads) per month, USD. */
    withAdsMonth?: number;
    /** Virtual rent accrued (with ads) per year, USD. */
    withAdsYear?: number;
    /** All accrued + Super Rent Boosts per year, USD. */
    srbYear?: number;
}

export interface IRegionCountryRead {
    /** ISO 3166-1 alpha-2 code, matching country-flag-icons exports. */
    code: string;
    /** Display name shown in the flag tooltip. */
    name: string;
}

export interface IResourceGroupRead {
    category: string;
    description: string;
    items: IResource[];
}

export interface IResource {
    name: string;
    url: string;
    icon: string;
    iconColor: string;
    iconBackground: string;
    description: string;
    badge: string;
}

export interface IAboutDetailRead {
    icon?: string;
    title: string;
    description: string;
}

export interface ICommunityLinkRead {
    href: string;
    icon: string;
    alt: string;
}