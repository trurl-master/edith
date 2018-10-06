# Edith - block text editor

This is an attempt to build clean, simple yet powerfull React.js based block text editor

## Installation:

`npm install --save edith`


## Usage example:

```

import { Edith, EdithImport, EdithAddBlock } from 'edith';
import CustomBlock from 'path/to/CustomBlock';

EdithAddBlock('Custom Block', CustomBlock);

render() {
    return (
        <Edith

            import={EdithImport.fromHTML('<div data-edith="Text"><p>HTML string</p></div>')}

            strings={{
                controls: {
                    save: 'Save'
                },
                block: {
                    ctrl: {
                        grab: 'Grab',
                        clone: 'Clone',
                        remove: 'Remove'
                    }
                },
                block_panel: {
                    expand: '+',
                    put: 'Put'
                }
            }}

            blocks={[
                {
                    name: 'H1',
                    label: 'Title',
                    config: {
                        toolbar: [
                            { label: 'I', style: 'ITALIC' },
                            { label: 'U', style: 'UNDERLINE' },
                        ]
                    }
                },
                {
                    name: 'Text',
                    label: 'Text',
                    config: {
                        toolbar: [
                            { label: 'B', style: 'BOLD' },
                            { label: 'I', style: 'ITALIC' },
                            { label: 'U', style: 'UNDERLINE' },
                        ]
                    }
                },
                {
                    name: 'InlineImage',
                    label: 'Image',
                    config: {
                        accept: 'image/*',
                        placeholder: 'Drop your image here'
                    }
                },
                {
                    name: 'Quote',
                    label: 'Quote',
                    config: {
                        toolbar: [
                            { label: 'B', style: 'BOLD' },
                            { label: 'I', style: 'ITALIC' },
                            { label: 'U', style: 'UNDERLINE' },
                        ]
                    }
                },
                {
                    name: 'Custom Block',
                    label: 'Custom Block'
                }
            ]}

            onSave={content => {
                // ...
            }}

            />
    );
}

```

## Properties:

### import

A list of blocks recognized by EdithImport


### strings

Object containing UI translation strings, divided in three sections:

#### Global controls

```
controls: {
    save: 'Save'
}
```

#### Block controls

```
block: {
    ctrl: {
        grab: 'Grab',
        clone: 'Clone',
        remove: 'Remove'
    }
}
```

#### Block Panel 

```
block_panel: {
    expand: '+',
    put: 'Put'
}
```

### blocks

Array of blocks, where each block is an object:

```
{
    name: 'Block Name',
    label: 'Block Title', // How it will be presented in the Block Panel
    config: {
        // Optional
        // Block configuration
    }
}
```

Order of blocks determines their position in the Block Panel.


### onSave

A callback that fires when Save button is clicked
