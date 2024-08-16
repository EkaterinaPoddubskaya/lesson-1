const productsTable = {
    view: "treetable",
    url: "data/products.js",
    columns:[
        { id:"id", header:"", width:50 },
        { id:"title", header:"Title", template:"{common.treetable()} #title#", fillspace: true },
        { id:"price", header:"Price", template(obj) {return obj.price ? `${obj.price}` : "" }, width: 500 }
    ],
    on: {
        onAfterLoad() {
            this.openAll();
        }
    },
    select: true,
    scroll: "y"
}