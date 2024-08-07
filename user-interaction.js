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

$$("myaddnew").attachEvent("onItemClick", function() {
	const titleInput = $$("myform").elements.title;
	const yearInput = $$("myform").elements.year;
	const ratingInput = $$("myform").elements.rating;
	const votesInput = $$("myform").elements.votes;

    const validation_check = $$("myform").validate();
    if (validation_check) {
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
   
	// titleInput.setValue("");
    // yearInput.setValue("");
    // ratingInput.setValue("");
    // votesInput.setValue("");
});