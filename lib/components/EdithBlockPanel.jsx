import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

class EdithBlockPanel extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            expanded: false
        };
    }

    clickExpand() {
        this.setState({
            expanded: true
        })
    }

    clickPicker() {
        this.setState({
            expanded: false
        })
    }

    clickAdd(block) {
        this.props.addBlock(block, this.props.index)

        this.setState({
            expanded: false
        })
    }

    clickPut() {
        this.props.putBlock(this.props.index);
    }

    render() {
        return (
            <div className="edith-block-panel">{(() => {

                if (this.props.putting) {
                    return (
                        <button className="edith-block-panel__put" onClick={this.clickPut}>{this.props.strings.block_panel.put}</button>
                    );
                } else if (this.props.avoidPutting) {
                    return false;
                } else if (this.state.expanded) {

                    if (typeof this.props.blocks === 'object') {
                        return (
                            <div className="edith-block-panel__picker" onClick={this.clickPicker}>{this.props.blocks.map((block, index) => {
                                return (<div key={index} className="edith-block-panel__picker-option" onClick={() => this.clickAdd(block)}>{block.label}</div>);
                            })}</div>
                        )
                    } else {

                        let block = this.props.blocks;

                        return (<div className="edith-block-panel__picker-option" onClick={() => this.clickAdd(block)}>{block.name}</div>);
                    }

                } else {
                    return (
                        <div className="edith-block-panel__expander">
                            <button className="edith-block-panel__expand" onClick={this.clickExpand}>{this.props.strings.block_panel.expand}</button>
                        </div>
                    )
                }


            })()}</div>
        );
    }
}

EdithBlockPanel.propTypes = {
    putting: PropTypes.bool.isRequired,
    avoidPutting: PropTypes.bool.isRequired,

    index: PropTypes.number.isRequired,

    blocks: PropTypes.array.isRequired,
    strings: PropTypes.object.isRequired,
    addBlock: PropTypes.func.isRequired,
    putBlock: PropTypes.func.isRequired
};

export default EdithBlockPanel;
