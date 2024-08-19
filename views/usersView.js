const usersUrl = "data/users.js"

const getSortUsersButton = (direction) => { 
    return { 
        view:"button", value:`Sort ${direction}`, css: "webix_primary" , autowidth: true,
        click: () =>  {
            $$("usersList").sort("#name#", direction);
            $$("usersChart").sort("#name#", direction);
        }
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
                    const usersList = $$("usersList");
                    const usersChart = $$("usersChart");
                    usersList.filter("#name#", inputValue);
                    usersChart.filter("#name#", inputValue);
                }
            }
        },
        getSortUsersButton("asc"),
        getSortUsersButton("desc")
    ]
}

const usersList = {
    view:"list",
    id: "usersList",
    url: usersUrl,
    template(obj) {
        return `
        <div class='userslist_item'>
            <span>${highlightText(obj.name, $$("userInput").getValue())} from ${obj.country}</span>
            <span class='webix_icon wxi-close delete_user icon_color_hover'></span>
        </div>
        `;
    },
    onClick:{
        "delete_user"(e, id) {
            this.remove(id);
            $$("usersChart").remove(id);
            return false;
        }
    },
    on: {
        onAfterLoad () {
            for (let i = 0; i < 5; i++) { 
                this.addCss(this.getIdByIndex(i), "userlist_item_color", true);
            }
            this.refresh();
        }
    },
    select: true,
    css: "users_list"
}

const usersChart = {
    view: "chart",
    id: "usersChart",
    url: usersUrl,
    type:"bar",
    value:"#age#",
    xAxis: { title: "Age", template:"#age#" },
    label:"#name#",
    gravity: 2
}