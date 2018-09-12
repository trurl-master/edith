export default html => {

    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, "text/html");

    const nodesList = htmlDoc.body.children;

    const list = [];

    for (var i = 0; i < nodesList.length; i++) {
        list.push({
            name: nodesList[i].dataset.edith,
            content: nodesList[i].innerHTML.trim()
        })
    }

    return list;

}