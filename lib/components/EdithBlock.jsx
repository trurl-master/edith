import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import classNames from 'classnames';


class EdithBlock extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        const { config } = props;

        this.config = {
            clonable: typeof config.clonable !== 'undefined' ? config.clonable : true
        }
    }

    setDirty(dirty) {
        this.props.setDirty(this.props.id, dirty)
    }

    clickCtrl() {
        this.props.clickCtrl();
    }

    clickCtrlGrab() {
        this.clickCtrl();
        this.props.grabBlock(this.props.id);
    }

    clickCtrlClone() {
        this.clickCtrl();
        this.props.cloneBlock(this.props.id)
    }

    clickCtrlRemove() {
        this.clickCtrl();
        this.props.removeBlock(this.props.id)
    }

    render() {

        const { state, putting, strings } = this.props;

        let cls = {
            'edith-block_dirty': state.dirty,
            'edith-block_putting': state.grabbed
        }

        return (
            <div className={classNames('edith-block', cls)}>
                <div className="edith-block__content">{this.props.children(this)}</div>
                <div className="edith-block__controls">
                    <button className="edith-block__ctrl edith-block__ctrl_grab" onClick={this.clickCtrlGrab} disabled={state.grabbed || putting}>{strings.block.ctrl.grab}</button>
                    {(() => {

                        if (this.config.clonable) {
                            return (<button className="edith-block__ctrl edith-block__ctrl_clone" onClick={this.clickCtrlClone} disabled={state.grabbed || putting}>{strings.block.ctrl.clone}</button>);
                        } else {
                            return false;
                        }

                    })()}
                    <button className="edith-block__ctrl edith-block__ctrl_remove" onClick={this.clickCtrlRemove} disabled={state.grabbe || putting}>{strings.block.ctrl.remove}</button>
                </div>
            </div>
        );
    }
}

EdithBlock.propTypes = {
    children: PropTypes.func,

    id: PropTypes.number,
    strings: PropTypes.object,
    state: PropTypes.object,
    config: PropTypes.object,
    putting: PropTypes.bool,

    clickCtrl: PropTypes.func,
    setDirty: PropTypes.func,
    removeBlock: PropTypes.func,
    cloneBlock: PropTypes.func,
    grabBlock: PropTypes.func
};

export default EdithBlock;
