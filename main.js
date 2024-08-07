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
    autoConfig: true,
    data: SMALL_FILM_SET,
    gravity: 3, 
    scroll: "y"
}

const editFilmsForm = {
    view:"form",
    autoheight: false,
    minWidth: 200,
    elements:[
        { rows:[ 
            { template:"EDIT FILMS", type:"section" },
            { view:"text", label:"Title", value:"" },
            { view:"text", label:"Year", value:"" },
            { view:"text", label:"Rating", value:"" },
            { view:"text", label:"Votes", value:"" }
        ]},
        { cols:[
            { view:"button", label:"Add new" , css: "webix_primary" },
            { view:"button", label:"Clear" }
        ],
            margin: 15
        }
    ]
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
