	var i, themeName, theme_file;
	themeName = new Array(); 
	theme_file = new Array();
	// themes 1
	themeName[0] = "Rosa"; //nombre
	theme_file[0] = "theme_2"; //nombre archivo
	// themes 2
	themeName[1] = "Pokémon";
	theme_file[1] = "theme_3";
	// themes 3
	themeName[2] = "Black Clover";
	theme_file[2] = "theme_4";
	// themes 4
	themeName[3] = "DragonBall Z";
	theme_file[3] = "theme_5";
	// themes 5
	themeName[4] = "Slam Dunk";
	theme_file[4] = "theme_6";
	// themes 6
	themeName[5] = "Hello Kitty";
	theme_file[5] = "theme_7";
	// themes 7
	themeName[6] = "Inuyasha";
	theme_file[6] = "theme_8";
	// subiendo al html
	for (i = 0; i < themeName.length; i++) {
		document.getElementById("Select2").innerHTML += '<option value="'+theme_file[i]+'">'+themeName[i]+'</option>';
	}