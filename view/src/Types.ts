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
