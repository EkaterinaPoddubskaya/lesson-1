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
            id: "myprofile",
            type: "icon", 
            icon: "wxi-user",
            autowidth: true,
            css: "webix_transparent header_button"
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
    id: "mytable",
    autoConfig: true,
    data: SMALL_FILM_SET,
    gravity: 3, 
    scroll: "y"
}

const editFilmsForm = {
    view:"form",
    id: "myform",
    autoheight: false,
    minWidth: 200,
    elements:[
        { rows:[ 
            { template:"EDIT FILMS", type:"section" },
            { view:"text", label:"Title", name: "title", value:"", invalidMessage: "Title must not be empty" },
            { view:"text", label:"Year", name: "year", value:"", invalidMessage: "Enter year between 1970 and " + new Date().getFullYear() },
            { view:"text", label:"Rating", name: "rating", value:"", invalidMessage: "Rating can not be empty or equal to 0" },
            { view:"text", label:"Votes", name: "votes", value:"", invalidMessage: "Enter votes between 1 and 100000 exclusively" }
        ]},
        { cols:[
            { view:"button", label:"Add new" , id:"myaddnew", css: "webix_primary" },
            { view:"button", label:"Clear" , id:"myclear" }
        ],
            margin: 15
        }
    ],
    rules:{
        title: webix.rules.isNotEmpty,
        year: function(value) {
            return (value >= 1970) && (value <= new Date().getFullYear());
        },
        rating: function(value) {
            return value != 0;
        },
        votes: function(value) {
            return (value > 0) && (value < 100000);
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
