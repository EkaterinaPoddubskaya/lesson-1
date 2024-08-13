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
            select:"true",
            autoheight: true,
            data:SIDE_OPTIONS
        }, 
        {},
        {
            template:"<span class='webix_icon wxi-check'></span>Connected",
            autoheight: true,
            css: "connection centered-text"
        }
    ],
    width: 200,
    css: "side_menu"
}

const filmLibraryTable = {
    view:"datatable", 
    id: "filmsTable",
    autoConfig: true,
    data: SMALL_FILM_SET,
    gravity: 3, 
    scroll: "y"
}

const editFilmsForm = {
    view:"form",
    id: "filmsForm",
    autoheight: false,
    minWidth: 200,
    elements:[
        { rows:[ 
            { template:"EDIT FILMS", type:"section" },
            { 
                view:"text", label:"Title", name: "title", value:"", 
                format: { parse: parseEditTitle, edit: parseEditTitle },
                invalidMessage: "Title must not be empty", 
                validate: webix.rules.isNotEmpty 
            },
            { view:"text", label:"Year", name: "year", id: "year", value:"", 
                format: { parse: parseEditYear, edit: parseEditYear },
                validate(value) {
                    const startYear = 1970;
                    const currentYear = new Date().getFullYear();
                    const invalidMessage1 = `Enter year between ${startYear} and ${currentYear}`;
                    return validateFormElements(value, startYear, currentYear, invalidMessage1, "Year must be a number", "year");
                }
            },
            { 
                view:"text", label:"Rating", name: "rating", id: "rating", value:"", 
                format: { parse: parseEditRating, edit: parseEditRating }, 
                validate: value => validateFormElements(value, 0, 10, "Enter rating between 0 and 10", "Rating must be a number", "rating")
            },
            { 
                view:"text", label:"Votes", name: "votes", id: "votes", value:"", 
                format: { parse: parseEditVotes, edit: parseEditVotes }, 
                validate: value => validateFormElements(value, 1, 99999, "Enter votes between 1 and 99999", "Votes must be a number", "votes")
            }
        ]},
        { cols:[
            { view:"button", label:"Add new", css: "webix_primary", 
                click: () => {
                    const form = $$("filmsForm");
                    if (form.validate()) {
                        $$("filmsTable").add(form.getValues());
                        form.clear();
                        webix.message({
                            text: "Your film is successfully added to the list!",
                            type: "success"
                        });
                    }
                }
            },
            { view:"button", label:"Clear",
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
    css: "centered-text"
}

webix.ui({
    rows: [
        header,
        {cols: [
            sideMenuList,
            { view:"resizer" },
            filmLibraryTable,
            editFilmsForm
        ]},
        footer
    ]
});
