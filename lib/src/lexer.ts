import { Token, TokenType } from "./types";

export const bessLexer = (code: string): Token[] => {
    const tokens: Token[] = [];

    let pos: number = 0;

    let line: number = 0;
    let linePos: number = 0;
    let inComment: boolean = false;

    let maxPos: number = code.length;
    const currentChar = (): string => code[pos];

    const getLiteral = (): string => {
        let literal = currentChar();
        while(pos < maxPos && /[^\R|(\-\-)]/.test(currentChar())) {
            literal = literal + currentChar();
            pos++;
        }
        pos--;
        return literal;
    }

    while (pos < maxPos) {
        pos++;
        linePos++;
        const char = currentChar();
        switch (char) {
            case char.match(/\R/)?.input:
                line++;
                linePos = 0;
                if(inComment) {
                    inComment = false;
                }
                break;
            case char.match(/[A-Za-z\#]/)?.input:
                tokens.push({
                    type: TokenType.Literal,
                    value: getLiteral(),
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case ".":
                tokens.push({
                    type: TokenType.Dot,
                    value: char,
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case ":":
                tokens.push({
                    type: TokenType.Colon,
                    value: char,
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case "{":
                tokens.push({
                    type: TokenType.OpenBrace,
                    value: char,
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case "}":
                tokens.push({
                    type: TokenType.CloseBrace,
                    value: char,
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case "#":
                tokens.push({
                    type: TokenType.Hash,
                    value: char,
                    line,
                    line_pos: linePos,
                    pos
                });
                break;
            case "-":
                pos++;
                const nextChar = currentChar();
                if(nextChar == "-") {
                    inComment = true;
                }
                break;
            default:
                console.log(`[BESS] LEXICAL ERROR: Invalid character \`${char}\` at ${line}:${linePos}`);
                pos = maxPos;
                break;
        }
    }

    return tokens;
}