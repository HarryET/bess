export type BessConfig = {
    pure: boolean, // Add extra features?!
    input?: string, // Input file
    output?: string, // Output file
};

export type Token = {
    value: string,
    line: number,
    line_pos: number,
    pos: number,
    type: TokenType
};

export enum TokenType {
    Dot,
    Hash,
    OpenBrace,
    CloseBrace,
    Colon,
    Literal
};