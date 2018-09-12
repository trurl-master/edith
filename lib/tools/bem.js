export default (rootClassname) => {
    return function (name, modifier) {

        let c = rootClassname;

        if (name) { c += '__' + name }
        if (modifier) { c += '_' + modifier }

        return c;
    }
} 