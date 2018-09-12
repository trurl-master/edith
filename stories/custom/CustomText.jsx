import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

class EdithBlockCustomText extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    onChange(editorState) {

        let state = this.state;

        this.setState(update(state, { editorState: { $set: editorState } }));
        this.props.block.setDirty(this.state.editorState !== editorState);
    }

    toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    style(contentBlock) {
        // console.log(
        //     contentBlock,
        //     contentBlock.getType(),
        //     contentBlock.getText()
        // )
        // const type = contentBlock.getType();

        // console.log(type, contentBlock.getKey())

        return 'edith-block-text__paragraph';

        // if (type === 'p') {
        //     return 'edith-';
        // }
    }

    getContent(format) {
        switch (format) {
            case 'html':
                return stateToHTML(this.state.editorState.getCurrentContent());
            default:
                break;
        }
    }

    setContent(format, data) {
        switch (format) {
            case 'html':
                this.setState({
                    editorState: EditorState.createWithContent(stateFromHTML(data))
                })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="edith-block-text">
                <strong>&lt;CustomText&gt;</strong>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    blockStyleFn={this.style}
                    ref={(c) => { this.editor = c }}
                />
                <strong>&lt;/CustomText&gt;</strong>
            </div>
        );
    }
}



EdithBlockCustomText.propTypes = {
    block: PropTypes.object,
    config: PropTypes.object.isRequired
};

EdithBlockCustomText.config = {
    clonable: true
}

export default EdithBlockCustomText;