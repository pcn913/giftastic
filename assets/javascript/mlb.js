$(document).ready(function() {

	//initial team buttons (starting with AL central teams)
    var teams = ['chicago white sox', 'cleveland indians', 'detroit tigers', 'kansas city royals', 'minnesota twins'];

    //loop through and add the team from array
    for (i = 0; i < teams.length; i++) {
    	addMLBTeamButton(teams[i]);
    }


    //when team is added through textbox/button add them here. 
    $(".addMLBTeam").on("click", function() {
        event.preventDefault();
        var team = $("#mlb-team-input").val();

        //check to make sure that a team was actually entered so not to add empty button
        if (team) {
        	addMLBTeamButton(team);
        }

    });

    //function to add team button to not repeat things
    function addMLBTeamButton(team){
            var b = $("<button>");
            $(b).attr("button-data", team);
            $(b).attr("class", "mlbbutton btn btn-secondary");
            $(b).text(team);

            $("#mlbteams").append(b);
            $(b).after(" ");    	
    }

    //animate and/or make still teh gift based on state
    $('#gifs-appear-here').on('click', '.gifclick', function() {

        //first grab the state
        var state = $(this).attr("data-state");

        
        if (state == 'still') {
        	//if state is still, then animate it here
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", 'animate');
        } else {
        	//if state is animate, then make it still here
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", 'still');
        }
    });





    //call to the giphy api here when mlb team is clicked
    $('#mlbteams').on('click', '.mlbbutton', function() {

        var searchterm = $(this).attr("button-data");
        console.log(searchterm);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            searchterm + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                var results = response.data;
                console.log(results);
                $("#gifs-appear-here").empty();

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var teamImage = $("<img>");
                    teamImage.attr("src", results[i].images.fixed_height_still.url);
                    teamImage.attr("class", "gifclick");
                    teamImage.attr("data-animate", results[i].images.fixed_height.url);
                    teamImage.attr("data-still", results[i].images.fixed_height_still.url);
                    teamImage.attr("data-state", "still");


                    gifDiv.append(teamImage);
                    gifDiv.append(p);


                    $("#gifs-appear-here").append(gifDiv);
                }
            });
    });



});