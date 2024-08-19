const productsTable = {
    view: "treetable",
    url: "data/products.js",
    columns:[
        { id:"id", header:"", width:50 },
        { id:"title", header:"Title", template:"{common.treetable()} #title#", fillspace: true, minWidth: 200, maxWidth: 400 },
        { id:"price", header:"Price", data: (obj) => obj.price ?? "" , minWidth: 70 }
    ],
    on: {
        onAfterLoad() {
            this.openAll();
        }
    },
    select: "cell",
    scroll: "y"
}