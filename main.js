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

titleParseEdit = input => input.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()
yearParseEdit = input => { 
    if(!input) return null;
    return parseInt(input.toString().match(/[0-9]+/));
}
ratingParseEdit = input => { 
    if (!input) return null;
    const value = parseFloat(input.toString().match(/[0-9]+.?[0-9]*/));
    return parseFloat(value.toFixed(2)); 
}
votesParseEdit = input => { 
    if (!input) return null;
    return parseInt(input.toString().match(/[0-9]+/));
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
                format: {
                    parse: titleParseEdit,
                    edit: titleParseEdit
                },
                invalidMessage: "Title must not be empty", 
                validate: webix.rules.isNotEmpty 
            },
            { view:"text", label:"Year", name: "year", id: "year", value:"", 
                format: {
                    parse: yearParseEdit,
                    edit: yearParseEdit
                },
                validate(value) {
                    let invalidMeassage = "Year must be a whole number";
                    let noInvalidMessage = false;
                    const startYear = "1970";
                    const currentYear = new Date().getFullYear();
                    if (parseInt(value) == value) {
                        if ((value >= startYear) && (value <= currentYear)) {
                            noInvalidMessage = true;
                        }
                        invalidMeassage = `Enter year between ${startYear} and ${currentYear}`;
                    } 
                    $$("year").define("invalidMessage", invalidMeassage);
                    return noInvalidMessage;
                }
            },
            { 
                view:"text", label:"Rating", name: "rating", id: "rating", value:"", 
                format: {
                    parse: ratingParseEdit,
                    edit: ratingParseEdit
                }, 
                validate(value) {
                    let invalidMessage = "Rating can not be empty";
                    let noInvalidMessage = false;
                    if (webix.rules.isNumber(value)) {
                        if (value > 0 && value <= 10) {
                            noInvalidMessage = true;
                        }
                        invalidMessage = "Enter rating between 0 and 10";
                    }
                    $$("rating").define("invalidMessage", invalidMessage);
                    return  noInvalidMessage;
                }
            },
            { 
                view:"text", label:"Votes", name: "votes", id: "votes", value:"", 
                format: {
                    parse: votesParseEdit,
                    edit: votesParseEdit
                }, 
                validate(value) {
                    let invalidMessage = "Votes must be a whole number";
                    let noInvalidMessage = false;
                    if (parseInt(value) == value) {
                        if ((value > 0) && (value < 100000)) {
                            noInvalidMessage = true;
                        }
                        invalidMessage = "Enter votes between 1 and 100000 exclusively";
                    } 
                    $$("votes").define("invalidMessage", invalidMessage);
                    return noInvalidMessage;
                }
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
