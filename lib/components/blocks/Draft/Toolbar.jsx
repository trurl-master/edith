import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import bemFactory from '../../../tools/bem';

const RC = 'edith-block-text-toolbar';
const bem = bemFactory(RC);


class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    getDimensions() {
        return {
            width: this.node.clientWidth,
            height: this.node.clientHeight
        }
    }

    render() {

        const { editorState, onToggle, position, visible, styles } = this.props;

        const currentStyle = editorState.getCurrentInlineStyle();

        const cls = {}

        cls[bem(false, 'visible')] = visible;

        return (
            <div className={classNames(RC, cls)} style={position} ref={node => { this.node = node }}>
                <ul className={bem('items')}>
                    {styles.map(type =>
                        <li
                            key={type.label}
                            className={`${bem('item')} ${type.style.toLowerCase()} ${currentStyle.has(type.style) ? 'active' : ''}`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onToggle(type.style);
                            }}
                        >
                            {type.label}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export const getSelectionRange = () => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) {
        return null;
    }

    return selection.getRangeAt(0);
};

export const getSelectionCoords = (editorRef, toolbarRef, selectionRange) => {

    const editorBounds = editorRef.editor.getBoundingClientRect();
    const rangeBounds = selectionRange.getBoundingClientRect();
    const rangeWidth = rangeBounds.right - rangeBounds.left;
    const toolbarDimensions = toolbarRef.getDimensions();
    const offsetLeft = (rangeBounds.left - editorBounds.left) + (rangeWidth / 2) - (toolbarDimensions.width / 2);
    const offsetTop = rangeBounds.top - editorBounds.top - toolbarDimensions.height - 10;

    return { offsetLeft, offsetTop };
};

Toolbar.propTypes = {
    editorState: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    position: PropTypes.object,
    styles: PropTypes.array
};

export default Toolbar;