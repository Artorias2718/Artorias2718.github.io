export interface IFAQGroupRead {
    category: string;
    questions: IFAQRead[];
}

export interface IFAQRead {
    question: string;
    answer: string;
}