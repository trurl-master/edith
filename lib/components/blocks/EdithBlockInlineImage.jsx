import React from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = error => {
            reject(error)
        };
    })
}


class EdithBlockInlineImage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            data: null
        };
    }

    getContent(format) {
        switch (format) {
            case 'html':
                return this.image.outerHTML;
            default:
                break;
        }
    }

    setContent(format, data, dirty) {
        switch (format) {
            case 'html':

                const div = document.createElement('div');
                div.innerHTML = data;

                this.setState({
                    data: div.firstChild.src
                })

                if (dirty !== false) {
                    this.props.block.setDirty(true);
                }

                break;
            default:
                break;
        }
    }

    render() {

        const { config, block } = this.props;

        return (
            <div className="edith-block-inline-image">
                <Dropzone
                    accept={config.accept}
                    onDrop={(acceptedFiles, rejectedFiles) => {

                        if (acceptedFiles.length === 0) {

                            this.handleError('not accepted')

                            return false;
                        }

                        acceptedFiles.forEach(file => {
                            getBase64(file)
                                .then(fileData => {
                                    this.setState({
                                        data: fileData
                                    })

                                    block.setDirty(true);
                                })
                                .catch(error => {
                                    console.error(error)
                                })
                        });


                        {/* const req = request.post(`/${app.lang}/api/resource`);
                        req.field(this.props.fields)

                        acceptedFiles.forEach(file => {
                            req.attach(file.name, file);
                        });

                        req
                            .end((err, res) => {
                                if (typeof res !== 'undefined' && res.body.success) {
                                    this.props.success(res)
                                } else {
                                    this.handleError('failed', res);
                                }
                            }); */}
                    }}
                    className="edith-block-inline-image"
                    activeClassName="active"
                    acceptClassName="accept"
                    rejectClassName="reject"
                    disabledClassName="disabled"
                    style={null}
                    multiple={false}
                >
                    {(() => {

                        if (this.state.data === null) {
                            return config.placeholder;
                        } else {
                            return (
                                <img src={this.state.data} ref={c => { this.image = c }} />
                            );
                        }

                    })()}
                </Dropzone>
            </div>
        );
    }
}



EdithBlockInlineImage.propTypes = {
    block: PropTypes.object,
    config: PropTypes.object.isRequired
};

EdithBlockInlineImage.config = {
    clonable: true
}

export default EdithBlockInlineImage;