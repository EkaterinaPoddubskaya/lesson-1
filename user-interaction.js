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