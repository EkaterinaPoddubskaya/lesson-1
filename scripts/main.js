const header = {
    cols: [
        {
            view:"label", 
            label:"My App",
            css: "header_label"
        },
        {
            view:"button", 
            label:"Profile", 
            type: "icon", 
            icon: "wxi-user",
            autowidth: true,
            css: "webix_transparent header_button",
            popup: {
                view:"popup",
                body: {
                    view:"list", 
                    data:[ "Settings", "Log out" ],
                    autoheight: true
                }
            }
        }
    ],
    padding: 5,
    css: "header"
}

const sideMenuList = { 
    rows: [
        {
            view:"list",
            template:"#title#",
            scroll:false,
            select: true,
            autoheight: true,
            data:SIDE_OPTIONS,
            on: {
                onAfterSelect:(viewId) => { 
                  $$(viewId).show();
                }
            }
        }, 
        {},
        {
            template:"<span class='webix_icon wxi-check'></span>Connected",
            autoheight: true,
            css: "connection centered_text"
        }
    ],
    width: 200,
    css: "side_menu"
}

const filmLibraryTable = {
    view:"datatable", 
    id: "filmsTable",
    columns:[
        { id: "rank", header: "", width: 50 , css: "light_grey" },
        { id: "title", header: ["Film Title", {content: "textFilter"}], sort: "string", fillspace: true, css: "left_align_text" },
        { id: "year", header: ["Released", {content: "textFilter"}], sort: "int" },
        { id: "votes", header: ["Votes", {content: "textFilter"}], sort: "int" },
        { id: "rating", header:["Rating", {content: "textFilter"}], sort: "int" },
        { header: "", template:"{common.trashIcon()}", css: "orange_hover" }
    ],
    url: "data/films.js",
    scheme: {
        $init(obj) {   
            if (!webix.rules.isNumber(obj.votes)) {
                obj.rank = +obj.rank;
                obj.year = +obj.year;
                obj.votes = parseInt(obj.votes.replace(",", ""));
                obj.rating = parseFloat(obj.rating.replace(",", "."));
            } else {
                const newIdRank = $$("filmsTable").count() + 1;
                obj.id = newIdRank;
                obj.rank = newIdRank;
            }
        },
    },
    editable: true,
    form: "filmsForm",
    onClick:{
        "wxi-trash"(e, id) {
            this.remove(id);
            const form = $$("filmsForm");
            if (form.getValues().id == id) {
                form.clear();
            }
            return false;
        }
    }, 
    select: true,
    css: "centered_text",
    hover: "light_blue",
    scroll: "y",
    gravity: 3
}
    

const editFilmsForm = {
    view:"form",
    id: "filmsForm",
    autoheight: false,
    minWidth: 200,
    elements:[
        { rows:[ 
            { template:"Edit films", type:"section" },
            { 
                view:"text", label:"Title", name: "title", value:"", 
                format: { parse: parseEditTitle, edit: parseEditTitle },
                invalidMessage: "Title must not be empty", 
                validate: webix.rules.isNotEmpty 
            },
            { 
                view:"text", label:"Year", name: "year", id: "year", value:"", 
                format: { parse: parseEditYear, edit: parseEditYear },
                validate(value) {
                    const startYear = 1921;
                    const currentYear = new Date().getFullYear();
                    return validateFormElements(value, "int", startYear, currentYear, "year");
                }
            },
            { 
                view:"text", label:"Rating", name: "rating", id: "rating", value:"", 
                format: { parse: parseEditRating, edit: parseEditRating }, 
                validate: value => validateFormElements(value, "float", 0, 10, "rating")
            },
            { 
                view:"text", label:"Votes", name: "votes", id: "votes", value:"", 
                format: { parse: parseEditVotes, edit: parseEditVotes }, 
                validate: value => validateFormElements(value, "int", 1, 999999, "votes")
            }
        ]},
        { cols:[
            { 
                view:"button", label:"Add new", css: "webix_primary", 
                click: () => {
                    const form = $$("filmsForm");            
                    if (form.validate()) {
                        let messageText = "";
                        const table = $$("filmsTable");
                        const formId = form.getValues().id; 
                        if (formId) {
                            table.updateItem(formId, form.getValues());
                            messageText = "Your changes are successfully saved!";
                        } else {
                            table.add(form.getValues());
                            messageText = "Your film is successfully added to the list!";
                        }
                        form.clear();
                        webix.message({
                            text: messageText,
                            type: "success"
                        });
                    }
                }
            },
            { 
                view:"button", label:"Clear",
                click: () => {
                    webix.confirm({
                        title: "Form is about to be cleared",
                        text: "Do you want to clear the form?"
                    })
                    .then(
                        () => {
                            const form = $$("filmsForm");
                            form.clear();
                            form.clearValidation();
                        }
                    );
                }
            }
            ],
            margin: 15
        }
    ],
    elementsConfig:{
        on:{
           onTimedKeyPress() {
                this.validate();
            }
        }
    }
}

const footer = { 
    template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
    autoheight: true,
    css: "centered_text"
}

const multiview = {
    cells: [
        { id: "Dashboard", cols: [filmLibraryTable, editFilmsForm] },
        { id: "Users", template: "Users view" },
        { id: "Products", template: "Products view" },
        { id: "Locations", template: "" }
    ]
}

webix.ui({
    rows: [
        header,
        {cols: [
            sideMenuList,
            { view:"resizer" },
            multiview
        ]},
        footer
    ]
})