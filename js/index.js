
var threeDays = 3*86400000; // number of milliseconds in three days, for how far back it should scrape data for each log.



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
		var link = root + logQueryString + logs[a] + "&" + dateQueryString; // build link to grab data from Elog
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

getData(["Operations", "Booster", "Linac", "Controls", "Muon", "PreAcc"]);