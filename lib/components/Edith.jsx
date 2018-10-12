import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import update from 'immutability-helper';

import { blocks } from '../components/blocks';
import EdithBlock from '../components/EdithBlock';
import EdithBlockPanel from '../components/EdithBlockPanel';

import classNames from 'classnames';


class Edith extends React.Component {


    constructor(props) {
        super(props);
        autoBind(this);

        this.defaultBlockState = {
            grabbed: false,
            dirty: false
        }

        this.id = 0;
        this.blocks = {};
        this.initialContent = {};

        this.state = {
            blocks: props.import.map(block => {

                const id = this.generateId();

                this.initialContent[id] = block.content;

                return {
                    name: block.name,
                    id: id,
                    state: Object.assign({}, this.defaultBlockState),
                    config: this.findConfigByName(block.name)
                };
            }),
            grabbedBlock: false
        };
    }

    componentDidMount() {

        for (const id in this.initialContent) {
            if (this.initialContent.hasOwnProperty(id)) {
                const content = this.initialContent[id];

                this.blocks[id].setContent('html', content, false)
            }
        }

    }

    generateId() {
        return this.id++;
    }

    setBlockRef(id, c) {
        if (c === null) {
            return;
        }

        this.blocks[id] = c;
    }

    deleteBlockRef(id) {
        delete this.blocks[id];
    }

    setDirty(id, dirty) {

        const index = this.findIndexById(id);

        this.setState(update(this.state, {
            blocks: { [index]: { dirty: { $set: dirty } } }
        }));
    }

    clickCtrl() {
        this.ungrabBlock();
    }

    addBlock(block, toIndex) {

        this.setState(update(this.state, {
            blocks: {
                $splice: [[
                    toIndex,
                    0,
                    {
                        id: this.generateId(),
                        name: block.name,
                        state: Object.assign({}, this.defaultBlockState),
                        config: this.findConfigByName(block.name)
                    }
                ]]
            }
        }));
    }

    removeBlock(id) {

        const index = this.findIndexById(id);

        this.setState(update(this.state, {
            blocks: { $splice: [[index, 1]] }
        }));

        this.deleteBlockRef(index);
    }

    cloneBlock(id) {

        const index = this.findIndexById(id);

        const nextId = this.generateId();

        this.setState(update(this.state, {
            blocks: {
                $splice: [[
                    index + 1,
                    0,
                    update(this.state.blocks[index], {
                        id: { $set: nextId },
                        state: {
                            dirty: { $set: true }
                        }
                    })
                ]]
            }
        }), () => {
            this.blocks[nextId].setContent('html', this.blocks[id].getContent('html'));
        });
    }

    grabBlock(id) {

        const index = this.findIndexById(id);

        this.setState(update(this.state, {
            blocks: { [index]: { state: { grabbed: { $set: true } } } },
            grabbedBlock: { $set: index }
        }));
    }

    ungrabBlock() {
        if (this.state.grabbedBlock) {
            this.setState(update(this.state, {
                blocks: { [this.state.grabbedBlock]: { state: { grabbed: { $set: false } } } },
                grabbedBlock: { $set: false }
            }));
        }
    }

    putBlock(toIndex) {

        const
            index = this.state.grabbedBlock,
            blocks = this.state.blocks;

        const block = blocks.splice(index, 1)[0];
        block.state.grabbed = false;
        if (toIndex > index) {
            blocks.splice(toIndex - 1, 0, block)
        } else {
            blocks.splice(toIndex, 0, block)
        }

        this.setState(update(this.state, {
            blocks: { $set: blocks },
            grabbedBlock: { $set: false }
        }));

    }

    findIndexById(id) {
        return this.state.blocks.findIndex(function (item) {
            return item.id == id;
        });
    }

    findConfigByName(name) {
        const index = this.props.blocks.findIndex(function (item) {
            return item.name == name;
        });

        if (index !== -1) {
            return this.props.blocks[index].config
        } else {
            return {}
        }

    }

    clickSave() {

        let content = '';

        this.state.blocks.map(block => {

            content +=
                '<div class="edith-block" data-edith="' + block.name + '">' +
                this.blocks[block.id].getContent('html') +
                '</div>';

        })

        // for (let bIndex = 0; bIndex < this.state.blocks.length; bIndex++) {
        //     content += this.blocks[bIndex].getContent('html');
        // }

        this.props.onSave(content);

    }

    render() {

        const userBlocks = this.props.blocks;

        const cls = {
            edithControl: {
                save: false
            }
        }

        const somethingIsDirty = this.state.blocks.reduce((acc, block) => {
            return acc || block.dirty
        }, false);

        return (
            <div className="edith">
                <div className="edith__controls">
                    <button
                        className={classNames('edith__controls-button', cls.edithCtrl)}
                        disabled={!somethingIsDirty || this.state.grabbedBlock !== false}
                        onClick={this.clickSave}>{this.props.strings.controls.save}</button>
                </div>
                <div className="edith__blocks">
                    <EdithBlockPanel
                        index={0}
                        addBlock={this.addBlock}
                        putBlock={this.putBlock}
                        blocks={userBlocks}
                        strings={this.props.strings}
                        putting={this.state.grabbedBlock !== false}
                        avoidPutting={false} />
                    {this.state.blocks.map((item, index) => {

                        const BlockComponent = blocks[item.name];

                        if (typeof BlockComponent === 'undefined') {
                            return false;
                        }

                        return (
                            <React.Fragment key={item.id}>
                                <EdithBlock
                                    id={item.id}
                                    strings={this.props.strings}
                                    state={item.state}
                                    putting={this.state.grabbedBlock !== false}
                                    config={BlockComponent.config}

                                    setDirty={this.setDirty}
                                    clickCtrl={this.clickCtrl}
                                    grabBlock={this.grabBlock}
                                    removeBlock={this.removeBlock}
                                    cloneBlock={this.cloneBlock}
                                >
                                    {(b) => (
                                        <BlockComponent
                                            block={b}
                                            ref={c => this.setBlockRef(item.id, c)}
                                            config={item.config}
                                        />
                                    )}
                                </EdithBlock>
                                <EdithBlockPanel
                                    index={index + 1}
                                    addBlock={this.addBlock}
                                    putBlock={this.putBlock}
                                    blocks={userBlocks}
                                    strings={this.props.strings}
                                    putting={this.state.grabbedBlock !== false && this.state.grabbedBlock !== index}
                                    avoidPutting={this.state.grabbedBlock !== false && this.state.grabbedBlock === index} />
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        );
    }
}

Edith.propTypes = {
    children: PropTypes.array,
    import: PropTypes.array,
    blocks: PropTypes.array,
    strings: PropTypes.object,

    onSave: PropTypes.func
};

export default Edith;
