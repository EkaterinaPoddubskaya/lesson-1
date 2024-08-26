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
            id: "sideMenu",
            template:"#title#",
            scroll:false,
            select: true,
            autoheight: true,
            data:SIDE_OPTIONS,
            on: {
                onAfterSelect:(viewId) => { 
                    $$(viewId)?.show();
                }
            },
            ready() {
                this.select(this.getFirstId());
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

const multiview = {
    cells: [
        { id: MULTIVIEW_IDS.FILMS_VIEW_ID, cols: [ filmsLibrary, editFilmsForm ] },
        { id: MULTIVIEW_IDS.USERS_VIEW_ID, rows: [ usersToolbar, usersList, usersChart ] },
        { id: MULTIVIEW_IDS.PRODUCTS_VIEW_ID, rows: [ productsTable ] },
        { id: MULTIVIEW_IDS.ADMINS_VIEW_ID, rows: [ categoriesToolbar, categoriesTable ] }
    ]
}

const footer = { 
    template: "The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c)",
    autoheight: true,
    css: "centered_text"
}

webix.ui({
    rows: [
        header,
        { cols: [
            sideMenuList,
            { view:"resizer" },
            multiview
        ]},
        footer
    ]
});