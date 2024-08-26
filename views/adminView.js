/**
 * Adds category to categoryCollection
 */
const onAddCategoryButtonClick = () => {
    categoryCollection.add({ 
        value: "Thriller"
    });
}

/**
 * Deletes selected in table category from categoryCollection
 */
const onDeleteCategoryButtonClick = () => {
    const categoryId = $$("categoriesTable").getSelectedId();
    if (categoryId) categoryCollection.remove(categoryId);
}

const categoriesToolbar = {
    view:"toolbar", 
    cols:[
        getPrimaryButton("Add category", onAddCategoryButtonClick),
        getPrimaryButton("Delete category", onDeleteCategoryButtonClick),
    ]
};

const categoriesTable = {
    view: "datatable",
    id: "categoriesTable",
    columns: [
        { id: "value", editor:"text", header: "Category",  width: 200 }
    ],
    select:"row", editable:true, editaction:"dblclick"
}

webix.ready(() => {
    $$("categoriesTable").sync(categoryCollection);
})