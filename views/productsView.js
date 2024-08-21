const productsTable = {
    view: "treetable",
    url: "data/products.js",
    columns:[
        { id:"id", header:"", width:50 },
        { id:"title", editor:"text", header:"Title", template:"{common.treetable()} #!title#", fillspace: true, minWidth: 200, maxWidth: 400 },
        { id:"price", editor:"text", header:"Price", data: (obj) => obj.price ?? "" , minWidth: 70 }
    ],
    on: {
        onBeforeEditStart(id) {
            return !this.isBranch(id.row);
        },
        onAfterLoad() {
            this.openAll();
        }
    },
    scheme: {
        $update: (obj) => {
            obj.price = parseFloat(parseFloat(obj.price).toFixed(2)); 
        }
    },
    select: "cell",
    scroll: "y",
    editable: true,
    editaction: "dblclick",
    rules: {
        title: webix.rules.isNotEmpty,
        price: value => value > 0
    }
}