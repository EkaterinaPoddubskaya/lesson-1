const usersUrl = "data/users.js"

const sortButtonFunction = direction => $$("usersList").sort("#name#", direction)

const addButtonFunction = () => {
    $$("usersList").add({ 
        name: "Peter Parker", 
        age: Math.floor(Math.random() * 100) + 1, 
        country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].value
    });
}

const getUsersButton = (buttonName, buttonFunction, direction) => { 
    return { 
        view:"button", value: buttonName, css: "webix_primary" , autowidth: true,
        click() { buttonFunction(direction) }
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
        getUsersButton("Sort asc", sortButtonFunction, "asc"),
        getUsersButton("Sort desc", sortButtonFunction, "desc"),
        getUsersButton("Add user", addButtonFunction)
    ]
}

webix.protoUI({
    name:"editList"
}, webix.EditAbility, webix.ui.list);

let maxUsersId = 0;
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
            if (!obj.id) obj.id = ++maxUsersId;
            else if (obj.id > maxUsersId) maxUsersId = obj.id;
            if(obj.age < 26) $$(this.owner).addCss(obj.id, "userlist_item_color");
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
    $$("usersChart").sync($$("usersList"), () => {
        $$("usersChart").group({
            by:"country",
            map:{
                name:[ "name", "count" ]
            }
        })
    });
})