const usersUrl = "data/users.js"

/**
 * Sorts usersList by name in order of direction
 * @param {string} direction -either "asc" or "desc"
 */
const onSortButtonClick = direction => $$("usersList").sort("#name#", direction)

/** Sorts usersList by name in ascending order */
const onSortAscButtonClick = () => onSortButtonClick("asc")

/** Sorts usersList by name in descending order */
const onSortDescButtonClick = () => onSortButtonClick("desc")

/**
 * Adds user to usersList with random age and country, selects and shows it in the view
 */
const onAddUserButtonClick = () => {
    const usersList = $$("usersList");
    const userId = usersList.add({ 
        name: "Peter Parker", 
        age: getRandomNumber(1, 100), 
        country: COUNTRIES[ getRandomNumber(0, COUNTRIES.length) ].value
    });
    usersList.select(userId);
    usersList.showItem(userId);
}

/**
 * Creates button 
 * @param {string} buttonName - the value(name) of the button
 * @param {function} onButtonClick - function which gets called when the button is clicked
 * @returns {object} config of a button 
 */
const getUsersButton = (buttonName, onButtonClick) => { 
    if (typeof buttonName !== 'string' || typeof onButtonClick !== 'function') return null;
    return { 
        view:"button", value: buttonName, css: "webix_primary" , autowidth: true,
        click: onButtonClick
    };
}

const usersToolbar = {
    view:"toolbar",
    cols:[
        { 
            view:"text", id:"userInput",
            on:{
                onTimedKeyPress() {
                    const inputValue = this.getValue();
                    $$("usersList").filter("#name#", inputValue);
                }
            }
        },
        getUsersButton("Sort asc", onSortAscButtonClick),
        getUsersButton("Sort desc", onSortDescButtonClick),
        getUsersButton("Add user", onAddUserButtonClick)
    ]
}

webix.protoUI({
    name:"editList"
}, webix.EditAbility, webix.ui.list);

const usersList = {
    view:"editList",
    id: "usersList",
    url: usersUrl,
    template(obj) {
        return `
        <div class='userslist_item'>
            <span>${highlightText(obj.name, $$("userInput").getValue())}, ${obj.age}, from ${obj.country}</span>
            <span class='webix_icon wxi-close delete_user icon_color_hover'></span>
        </div>
        `;
    },
    scheme: {
        $init(obj) {
            if (obj.age < 26) obj.$css = "userlist_item_color"
        }
    },
    onClick:{
        "delete_user"(e, id) {
            this.remove(id);
            return false;
        }
    },
    select: true,
    css: "users_list",
    editable:true,
    editor:"text",
    editValue:"name",
    editaction:"dblclick",
    rules: {
        name: webix.rules.isNotEmpty
    }
}

const usersChart = {
    view: "chart",
    id: "usersChart",
    type:"bar",
    value:"#name#",
    xAxis: { title: "Country", template:"#country#" },
    yAxis:{ start: 0, end: 10, step: 1 },
    gravity: 2
}

webix.ready(() => {
    const usersChart = $$("usersChart");
    usersChart.sync($$("usersList"), () => {
        usersChart.group({
            by:"country",
            map:{
                name:[ "name", "count" ]
            }
        })
    });
})