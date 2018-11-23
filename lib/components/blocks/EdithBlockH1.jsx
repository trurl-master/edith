import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import Toolbar, { getSelectionRange, getSelectionCoords } from './Draft/Toolbar';


class EdithBlockH1 extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            editorState: EditorState.createEmpty(),
            inlineToolbar: {
                show: false,
                position: {
                    top: false,
                    left: false
                }
            }
        };
    }

    onChange(editorState) {

        let state = this.state;

        if (!editorState.getSelection().isCollapsed()) {
            const selectionRange = getSelectionRange();
            // console.log(selectionRange, selectionRange.startOffset === selectionRange.endOffset)
            if (!selectionRange || selectionRange.startOffset === selectionRange.endOffset) {
                state = update(state, {
                    inlineToolbar: {
                        show: { $set: false }
                    }
                });
            } else {
                const selectionCoords = getSelectionCoords(this.editor, this.toolbar, selectionRange);

                state = update(state, {
                    inlineToolbar: {
                        show: { $set: true },
                        position: {
                            top: { $set: selectionCoords.offsetTop },
                            left: { $set: selectionCoords.offsetLeft }
                        }
                    }
                });
            }

        } else {
            state = update(state, { inlineToolbar: { show: { $set: false } } });
        }


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
        return 'edith-block-h1__paragraph';
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

        const { config } = this.props;

        return (
            <h1 className="edith-block-h1">
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    blockStyleFn={this.style}
                    {...config.editor}
                    ref={(c) => { this.editor = c }}
                />
                <Toolbar
                    editorState={this.state.editorState}
                    onToggle={this.toggleInlineStyle}
                    visible={this.state.inlineToolbar.show}
                    position={this.state.inlineToolbar.position}
                    styles={config.toolbar}
                    ref={(c) => { this.toolbar = c }}
                />
            </h1>
        );
    }
}



EdithBlockH1.propTypes = {
    block: PropTypes.object,
    config: PropTypes.object.isRequired
};

EdithBlockH1.config = {
    clonable: true
}

export default EdithBlockH1;