import EdithBlockH1 from './EdithBlockH1.jsx';
import EdithBlockText from './EdithBlockText.jsx';
import EdithBlockInlineImage from './EdithBlockInlineImage.jsx';
import EdithBlockQuote from './EdithBlockQuote.jsx';

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