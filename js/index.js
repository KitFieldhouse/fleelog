
var threeDays = 3*86400000; // number of milliseconds in three days, for how far back it should scrape data for each log.

logNames = [ "Operations",
	"Accelerator-Projects",
	"Booster",
	"Controls",
	"Cryogenics",
	"External-Beamlines",
	"FAST",
	"Instrumentation",
	"Interlocks",
	"Linac",
	"Main-Injector",
	"Muon",
	"PreAcc",
	"Proton-Improvement-Plan",
	"Recycler",
	"RF",
	"Run-Coordinator",
	"Safety",
	"Testing"];

function getData(logs)  // this function runs at the opening of the webpage and gets data from the Elog via a XMLHttpRequest.
{
	var eDate = new Date(); // end date of date range where I will grab logs
	var eYear = String(eDate.getFullYear());
	var eMonth = String(eDate.getMonth() + 1);
	var eDay = String(eDate.getDate());
	var eHour = String(eDate.getHours());
	var eMin = String(eDate.getMinutes());

	var sDate = new Date(eDate.getTime() - threeDays); // start date of date range where I will grab logs.
	var sYear = String(sDate.getFullYear());
	var sMonth = String(sDate.getMonth() + 1);
	var sDay = String(sDate.getDate());

	var elog = "https://www-bd.fnal.gov/Elog/"; // base elog url
	var root = "https://www-bd.fnal.gov/Elog/?"; // base elog url for query params
	var logQueryString = "orLogName="; // query param for grabbing different logs
	var dateQueryString = "startDate=" +  sYear + "-" + sMonth + "-" + sDay + "+00%3A00%3A00"
						+ "&endDate=" + eYear + "-" + eMonth + "-" + eDay + "+" + eHour + "%3A" + eMin + "%3A00"; // query params for grabbing a data range
	
	for(a in logs)
	{
		var link = root + logQueryString + logs[a].replaceAll("-", "+") + "&" + dateQueryString; // build link to grab data from Elog
		console.log(link);
		
		const req = new XMLHttpRequest(); // start new request
		const index = a;

		//req.addEventListener("load", gotData);
		//req.addEventListener("error", gotError);

		req.onload = (e) => { // on load isolate entry data and place in proper div

			console.log(req.responseType);
			console.log(logs[a]);
			var dataHTML = req.responseXML;

			var entries = dataHTML.getElementById("entries");

			console.log("below is type");
			console.log(typeof(entriesHTML));

			const collection = entries.getElementsByTagName("img");

			for (let i = 0; i < collection.length; i++) {
  				collection[i].setAttribute("src", elog + collection[i].getAttribute("src"));
			}

			const imageLinks = entries.getElementsByTagName("a");

			for(let i = 0; i<imageLinks.length; i++)
			{
				if(imageLinks[i].classList.contains("fancybox-image"))
				{
					imageLinks[i].setAttribute("href", elog + imageLinks[i].getAttribute("href"));
					imageLinks[i].setAttribute("target", "_blank");
				}
			}

			var entriesHTML = entries.innerHTML;
			console.log(entriesHTML);
			document.getElementById(logs[index]).innerHTML = entriesHTML;

		}

		req.open("GET", link); // configure and send request
		req.overrideMimeType('text/html');
		req.responseType = "document";
		req.send();
	}
	
}

function gotError() // this is thrown from the xmlhttpsrequest object if we get an error response from the elog
{
	console.log("Looks like we got an error from the ELog! The error code is: ");
	console.log(this.status);
}

function displayOrHideLog(log, el) // this is called from the button element in the html and will toggle display of a given elog log
{
	if(el.checked == false)
	{
		document.getElementById(log + "-Container").style.display = "none";
	}
	else {
		document.getElementById(log + "-Container").style.display = "block";
	}
}


// below will run on page load.



let sidebarHTML = "";

for (let i = 0; i < logNames.length; i++) // build sidebar options
{
	if(i == 0) // that is, if log is operations
	{
		sidebarHTML += "<div>" +
					"<input type='checkbox' id='" + logNames[i] + "-button' name='" + logNames[i] + "-button' onclick=\"displayOrHideLog('" + logNames[i] + "', this)\" checked>" +
					"<label for='" + logNames[i] + "-button'>" + logNames[i] + "</label>" +
					"</div>";

	}
	else {
		sidebarHTML += "<div>" +
					"<input type='checkbox' id='" + logNames[i] + "-button' name='" + logNames[i] + "-button' onclick=\"displayOrHideLog('" + logNames[i] + "', this)\">" +
					"<label for='" + logNames[i] + "-button'>" + logNames[i] + "</label>" +
					"</div>";

	}
}

sidebarHTML = "<div id='sidebar'>" + sidebarHTML + "</div>";


let logDivsHTML = "";


for (let i = 0; i < logNames.length; i++) // build sidebar options
{
	logDivsHTML +=  "<div id='" + logNames[i] + "-Container'>" +
					"<div class='label'> - " + logNames[i].replaceAll("-"," ") + " - </div>" +
					"<div id='" + logNames[i] + "'>" +
							"CONTENT LOADING!!!!!!!!" +
					"</div>" +
					"</div>";
}

page = document.getElementById("page");
page.innerHTML = sidebarHTML + logDivsHTML;

getData(logNames);