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
    console.log(titleInput.getValue());
    console.log(yearInput.getValue());
    console.log(ratingInput.getValue());
    console.log(votesInput.getValue());

    const film = {
        title: titleInput.getValue(),
        year: yearInput.getValue(),
        rating: ratingInput.getValue(), 
        votes: votesInput.getValue()
    }

    $$('mytable').add(film);
    
	// titleInput.setValue("");
    // yearInput.setValue("");
    // ratingInput.setValue("");
    // votesInput.setValue("");
});