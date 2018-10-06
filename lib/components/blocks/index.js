import EdithBlockH1 from './EdithBlockH1';
import EdithBlockText from './EdithBlockText';
import EdithBlockInlineImage from './EdithBlockInlineImage';
import EdithBlockQuote from './EdithBlockQuote';

const blocks = {
    H1: EdithBlockH1,
    Text: EdithBlockText,
    InlineImage: EdithBlockInlineImage,
    Quote: EdithBlockQuote
}

function EdithAddBlock(name, block) {
    blocks[name] = block;
}

export { blocks, EdithAddBlock };