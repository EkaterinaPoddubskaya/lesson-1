const usersUrl = "data/users.js"

const sortUsersButton = (direction) => { 
    return { 
        view:"button", value:`Sort ${direction}`, css: "webix_primary" , autowidth: true,
        click: () =>  {
            $$("usersList").sort("#name#", direction, "string");
            $$("usersChart").sort("#name#", direction, "string");
        }
    };
}

const usersToolbar = {
    view:"toolbar",
    cols:[
        { 
            view:"text", id:"userInput", value:"",
            on:{
                onTimedKeyPress() {
                    const inputValue = this.getValue();
                    const usersList = $$("usersList");
                    const usersChart = $$("usersChart");
                    usersList.filter("#name#", inputValue);
                    usersChart.filter("#name#", inputValue);
                    usersList.refresh();
                    usersChart.refresh();
                }
            }
        },
        sortUsersButton("asc"),
        sortUsersButton("desc")
    ]
}

const usersList = {
    view:"list",
    id: "usersList",
    url: usersUrl,
    template(obj) {
        return `
        <div class='users_list'>
            <span>${highlightText(obj.name, $$("userInput").getValue())} from ${obj.country}</span>
            <span class='webix_icon wxi-close orange_hover'></span>
        </div>
        `;
    },
    onClick:{
        "wxi-close"(e, id) {
            this.remove(id);
            $$("usersChart").remove(id);
            return false;
        }
    },
    on: {
        onAfterLoad () {
            for (let i = 1; i <= 5; i++) {
                this.addCss(i, "light_yellow");
            }              
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