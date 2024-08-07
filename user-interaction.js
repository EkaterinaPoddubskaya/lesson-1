webix.ui({
    view:"popup",
    id: "mypopup",
    body: {
        view:"list", 
        data:[ "Settings", "Log out" ],
        autoheight: true
    }
});

$$("myprofile").attachEvent("onItemClick", function() {
    const profileNode = $$("myprofile").getNode();
    $$("mypopup").show(profileNode);
});

const titleInput = $$("myform").elements.title;
const yearInput = $$("myform").elements.year;
const ratingInput = $$("myform").elements.rating;
const votesInput = $$("myform").elements.votes;

$$("myaddnew").attachEvent("onItemClick", function() {
    if ($$("myform").validate()) {
        const film = {
            title: titleInput.getValue(),
            year: yearInput.getValue(),
            rating: ratingInput.getValue(), 
            votes: votesInput.getValue()
        }
        $$('mytable').add(film);
        webix.message({
            text: "Your film is successfully added to the list!",
            type: "success"
        });
    }
});

$$("myclear").attachEvent("onItemClick", function() {
    webix.confirm({
        title: "Form is about to be cleared",
        text: "Do you want to clear the form?"
    })
    .then(
        function(){
            titleInput.setValue("");
            yearInput.setValue("");
            ratingInput.setValue("");
            votesInput.setValue("");
        
            $$("myform").clearValidation();
        }
    );
});