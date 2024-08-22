const filmsYearTabbar = {
    view:"tabbar",
    id: "filmsTabbar",
    options: tabbarOptions,
    on: {
        onAfterTabClick() {
            $$("filmsTable").filterByAll();
        }
    }
};

let maxRank = 0;
const filmLibraryTable = {
    view:"datatable", 
    id: "filmsTable",
    columns:[
        { id: "rank", header: "#", width: 50 , css: "film_rank_color", sort: "int" },
        { id: "title", header: ["Film Title", {content: "textFilter"}], sort: "string", fillspace: true, css: "left_align_text" },
        { id: "category", header: ["Category", {content: "selectFilter"}], collection: "data/categories.js", sort: "text" },
        { id: "year", header: "Released", sort: "int" },
        { id: "votes", header: ["Votes", {content: "numberFilter"}], sort: "int" },
        { id: "rating", header:["Rating", {content: "numberFilter"}], sort: "int" },
        { template:"<span class='webix_icon wxi-trash delete_film'></span>", css: "icon_color_hover" }
    ],
    url: "data/films.js",
    scheme: {
        $init(obj) {
            if (!obj.rank) obj.rank = ++maxRank;
            else if (!Number.isInteger(obj.rank)) obj.rank = +obj.rank;
            if (obj.rank > maxRank) maxRank = obj.rank;
            if(!Number.isInteger(obj.year)) obj.year = +obj.year;
            if (!webix.rules.isNumber(obj.votes)) {
                obj.votes = parseInt(obj.votes.replace(",", "")); 
            }
            if(!webix.rules.isNumber(obj.rating)) {
                obj.rating = parseFloat(obj.rating.replace(",", "."));
            }
            obj.category = Math.floor(Math.random() * 4) + 1;
        }
    },
    onClick: {
        "delete_film"(e, id) {
            this.remove(id);
            return false;
        }
    },
    on: {
        onAfterFilter() {
            this.sort("rank", "asc", "int");
        }
    },
    select: true,
    css: "centered_text",
    hover: "film_hover",
    scroll: "y"
}

const filmsLibrary = {
    rows: [
        filmsYearTabbar, 
        filmLibraryTable
    ],
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
                view:"text", label:"Title", name: "title",
                format: { parse: parseEditTitle, edit: parseEditTitle },
                invalidMessage: "Title must not be empty", 
                validate: webix.rules.isNotEmpty 
            },
            { 
                view:"text", label:"Year", name: "year", id: "year", 
                format: { parse: parseEditYear, edit: parseEditYear },
                validate(value) {
                    const startYear = 1921;
                    const currentYear = new Date().getFullYear();
                    return validateFormElements(value, "int", startYear, currentYear, "year");
                }
            },
            { 
                view:"text", label:"Rating", name: "rating", id: "rating",
                format: { parse: parseEditRating, edit: parseEditRating }, 
                validate: value => validateFormElements(value, "float", 0, 10, "rating")
            },
            { 
                view:"text", label:"Votes", name: "votes", id: "votes",
                format: { parse: parseEditVotes, edit: parseEditVotes }, 
                validate: value => validateFormElements(value, "int", 1, 999999, "votes")
            }
        ]},
        { cols:[
            { 
                view:"button", label:"Add new", css: "webix_primary", 
                click() {
                    const form = $$("filmsForm");
                    if (form.validate()) {
                        let messageText = "";
                        const filmId = form.getValues().id; 
                        if (filmId) messageText = "Your changes are successfully saved!";
                        else messageText = "Your film is successfully added to the list!";
                        form.save();
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
                click() {
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
    },
    on: {
        onBindApply() {
            const isFormEmpty = Object.values(this.getValues()).every(v => !v);
            if (isFormEmpty) this.clearValidation();
        }
    }
}

webix.ready(() => {
    const table = $$("filmsTable");
    $$("filmsForm").bind(table);

    table.registerFilter(
        $$("filmsTabbar"),
        { 
            columnId: "year",
            compare(cellValue, tabViewId) {
                switch(tabViewId) {
                    case FILMS_TAB_IDS.ALL: return cellValue;
                    case FILMS_TAB_IDS.OLD: return cellValue < 1970;
                    case FILMS_TAB_IDS.MODERN: return cellValue >= 1970 && cellValue < 2000;
                    case FILMS_TAB_IDS.NEW: return cellValue >= 2000;
                }
            }
        },
        { getValue: (tabView) => tabView.getValue() }
    );
})