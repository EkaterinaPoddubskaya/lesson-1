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
            id: "profileButton",
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
                view:"text", label:"Title", name: "title", id: "title", value:"", 
                format: {
                    parse: (input) => { 
                        return input.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
                    },
                    edit: (input) => { 
                        return input.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim();
                    }
                },
                invalidMessage: "Title must not be empty", 
                validate: webix.rules.isNotEmpty 
            },
            { view:"text", label:"Year", name: "year", id: "year", value:"", 
                format: {
                    parse: (input) => { 
                        let value = parseInt(input.toString().match(/[0-9]+/));
                        if (value > 9999) {
                            value = parseInt(value.toString().slice(0, 4));
                        }
                        if (value) {
                            return value;
                        }
                        return NaN; 
                    },
                    edit: (input) => { 
                        let value = parseInt(input.toString().match(/[0-9]+/));
                        if (value > 9999) {
                            value = parseInt(value.toString().slice(0, 4));
                        }
                        if (value) {
                            return value;
                        }
                        return ""; 
                    }
                }, 
                invalidMessage: "",
                validate(value) {
                    let invMessage = "Year must be a whole number";
                    if (parseInt(value) == value) {
                        if ((value >= 1970) && (value <= new Date().getFullYear())) {
                            return true;
                        }
                        invMessage = `Enter year between 1970 and ${new Date().getFullYear()}`;
                    } 
                    $$("year").define("invalidMessage", invMessage);
                    return false;
                }
            },
            { 
                view:"text", label:"Rating", name: "rating", id: "rating", value:"", 
                format: {
                    parse: (input) => { 
                        const value = parseFloat(input.toString().match(/[0-9]+.?[0-9]*/));
                        if (value) {
                            return parseFloat(value.toFixed(2));
                        }
                        return NaN; 
                    },
                    edit: (input) => { 
                        const value = parseFloat(input.toString().match(/[0-9]+.?[0-9]*/));
                        if (value) {
                            return parseFloat(value.toFixed(2));
                        }
                        return ""; 
                    }
                }, 
                invalidMessage: "", 
                validate(value) {
                    let invMessage = "Rating can not be empty";
                    if (webix.rules.isNumber(value)) {
                        if (value > 0 && value <= 10) {
                            return true;
                        }
                        invMessage = "Enter rating between 0 and 10";
                    }
                    $$("rating").define("invalidMessage", invMessage);
                    return  false;
                }
            },
            { 
                view:"text", label:"Votes", name: "votes", id: "votes", value:"", 
                format: {
                    parse: (input) => { 
                        let value = parseInt(input.toString().match(/[0-9]+/));
                        if (value) {
                            return value;
                        }
                        return NaN; 
                    },
                    edit: (input) => { 
                        let value = parseInt(input.toString().match(/[0-9]+/));
                        if (value) {
                            return value;
                        }
                        return ""; 
                    }
                }, 
                invalidMessage: "", 
                validate(value) {
                    let invMessage = "Votes must be a whole number";
                    if (parseInt(value) == value) {
                        if ((value > 0) && (value < 100000)) {
                            return true;
                        }
                        invMessage = "Enter votes between 1 and 100000 exclusively";
                    } 
                    $$("votes").define("invalidMessage", invMessage);
                    return false;
                }
            }
        ]},
        { cols:[
            { view:"button", label:"Add new" , id:"addNewButton", css: "webix_primary", 
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
            { view:"button", label:"Clear" , id:"clearButton",
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
           'onTimedKeyPress'() {
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
