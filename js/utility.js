/* Various page processing stuff for CFG.tf
http://cfg.tf */

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);



function switch_style() {
	if (readCookie("style") == "night"){
		setActiveStyleSheet("day");
		var title = getActiveStyleSheet();
		createCookie("style", title, 365);
	} else {
		setActiveStyleSheet("night");
		var title = getActiveStyleSheet();
		createCookie("style", title, 365);		
	}
}

function updateConnect() {
    var srvaddr = document.getElementById("ip").value;;
    var srvpass = document.getElementById("sv_password").value;;
    if (srvpass.length !== 0) {
        document.getElementById('loptions').value = 'connect ' + srvaddr + "; password " + srvpass;
    } else {
        document.getElementById('loptions').value = 'connect ' + srvaddr;
    }

}

function pad (str, max) { // http://stackoverflow.com/a/6466243
	str = str.toString();
	return str.length < max ? pad("0" + str, max) : str;
}

var room = 40; //dynamic bind fields
function education_fields() {
    room++;
    var objTo = document.getElementById('education_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + room);
    var rdiv = 'removeclass' + room;
    divtest.innerHTML = '<div class="col-sm-3 nopadding"> <div class="form-group"> <input type="text" class="form-control" id="key' + room + '" name="Keys[]" value="" placeholder="Key" required> </div></div><div class="col-sm-3 nopadding"> <div class="form-group"> <div class="input-group"><input type="text" class="form-control" id="command' + room + '" name="Commands[]" value="" placeholder="Command" required> <div class="input-group-btn"> <button class="btn btn-danger" type="button" onclick="remove_education_fields(' + room + ');"> <span class="glyphicon glyphicon-minus" aria-hidden="true"></span> </button> </div></div></div></div><div class="clear"></div>';
    objTo.appendChild(divtest)
}

function remove_education_fields(rid) {
		if (rid == "all") {
			$('#education_fields .form-group').remove();
			console.log('all binds removed')
		} else {
			$('#education_fields .removeclass' + rid).remove();
			console.log('bind ' + rid + ' removed')
		}
}


function installPackage(file) {
    // todo
    var request = new XMLHttpRequest();
    request.open('GET', '/test.pack', true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }

}


function autoFillGood() { //automatically fill network settings
    document.getElementById('cmdrate').value = "66";
    document.getElementById('interp').value = "0";
    document.getElementById('intratio').value = "1";
    document.getElementById('uprate').value = "66";
    document.getElementById('rate').value = "196608";
    document.getElementById('cl_smooth').value = "1";
}

function autoFillBad() {
    document.getElementById('cmdrate').value = "40";
    document.getElementById('interp').value = "0";
    document.getElementById('intratio').value = "2";
    document.getElementById('uprate').value = "40";
    document.getElementById('rate').value = "51520";
    document.getElementById('cl_smooth').value = "1";	
}

function autoFillComp() {
    document.getElementById('cmdrate').value = "133";
    document.getElementById('interp').value = "0";
    document.getElementById('intratio').value = "1";
    document.getElementById('uprate').value = "133";
    document.getElementById('rate').value = "214130";
    document.getElementById('cl_smooth').value = "1";	
}

function updateInput(ish) { //updating FOV on user default change
    document.getElementById("v_fov").value = ish;
}




function isNumberKey(evt) //allowing numbers and decimal points
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}
var dxlevel = "95"; //updating dxlevel below
function updatedxlevel() {
    switch ($("#gfx_selector").val()) {
        case "comanglia_toaster":
        case "comanglia_stability":
        case "mastercomfig-maxperformance":
        case "mastercomfig-igpu":
        case "mastercomfig-stripped":
        case "rhapsody_dx8":
            dxlevel = "81";
            break;
        case "comanglia_hq":
        case "mastercomfig-default":
        case "mastercomfig-comp":
        case "mastercomfig-compquality":
        case "mastercomfig-midquality":
        case "rhapsody_dx9":
        case "myown":
            dxlevel = "95";
            break;
        case "comanglia_cinema":
        case "mastercomfig-maxquality":
            dxlevel = "98";
    }
		printcommandline();

}
var screenmod = "-fullscreen";
var aspectratio;
var resolutionsel;
var resolutionx = screen.width;
var resolutiony = screen.height;
var fullres;
var launch_novid = " -novid";
var launch_console = " -console";
var launch_high = "";

function updatescreenmode() //updating screen mode
{
    switch ($("#display_mode").val()) {
			case "fullscreen":
				screenmod = "-fullscreen";
				break;
			case "borderless":
				screenmod = "-windowed -noborder";
				break;
			case "windowed":
				screenmod = "-windowed";
				break;
		}

		if ($('#resolution_detector_cb').is(':checked')) {
			$('#display_settings .display_option').prop('disabled', true);
			$('#display_settings').fadeTo('fast', '0.6');
			$('#display_settings .display_option button').addClass("disabled");
			resolutionx = screen.width;
			resolutiony = screen.height;
			printcommandline();
		} else {
			$('#display_settings .display_option').prop('disabled', false);
			$('#display_settings').fadeTo('fast', '1');
			$('#display_settings .display_option button').removeClass("disabled");
			updateresolution();
		}

		if ($('#launch_cmd_novid').is(':checked')) {
			launch_novid = " -novid"
		} else {
			launch_novid = ""
		}

		if ($('#launch_cmd_console').is(':checked')) {
			launch_console = " -console"
		} else {
			launch_console = ""
		}

		if ($('#launch_cmd_high').is(':checked')) {
			launch_high = " -high"
		} else {
			launch_high = ""
		}

    printcommandline();
}

function updateresolution() {
		aspectratio = $("#aspectratio_selector").val();
		resolutionsel = $('#resolution_' + aspectratio + '_selector').val();
		switch (aspectratio) {
				case "43":
					$('.resolution_selector').hide();
					$('.resolution_selector.aspect43').show();
					break;
				case "169":
					$('.resolution_selector').hide();
					$('.resolution_selector.aspect169').show();
					break;
				case "85":
					$('.resolution_selector').hide();
					$('.resolution_selector.aspect85').show();
					break;
		}

		resolutionsel = $('#resolution_' + aspectratio + '_selector').val();
		fullres = resolutionsel.split('-');
		resolutionx = fullres[0];
		resolutiony = fullres[1];
		printcommandline();

}

function printcommandline() {
	document.getElementById('loptions').value = "-dxlevel " + dxlevel + " " + screenmod + " -w " + resolutionx + " -h " + resolutiony + launch_console + launch_novid + launch_high;
}

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip(); //tooltips
		$( "#version" ).load( "./version.txt" );
		
	$("#toggle-light").click(function() { //daynight button
		  switch_style();return false;		  
	  });		

});

$(window).on('load', function(){
	// global smooth loader transition
	$('#overlay #loading_logo').addClass('fast'); // speed up spin when we've finished loading
	$('#overlay').fadeOut(600);
	setTimeout( function() {
		$('#overlay #loading_logo').removeClass('fast');// after its hidden, replace fast spin with really slow spin. this slow spin is what fades back in before we change nav pages
		$('#overlay #loading_logo').addClass('idle');  // the next page's regular spin makes it seem like the previous slow spinner speeds up when it starts loading, masking the jitteryness of page navigation a bit
	}, 1000);

	$("nav a").not( "nav .dropdown-toggle" ).click( function(){
		var href = $(this).attr('href');

		$('#overlay').fadeIn(200); // quick fade back in
		setTimeout(function() {window.location = href}, 250); // change location after a tiny delay so the fadein plays out
		setTimeout(function() {$('#overlay').fadeOut()}, 2500); // this is so the overlay isnt visible and blocking the screen when the user clicks back in their browser.
		return false; // unfortunately the overlay can fade back in if the user takes too long to get a response from the next page but they probably have bigger problems than janky loading animations
	});
	
		
	
});
