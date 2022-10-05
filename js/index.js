
var threeDays = 3*86400000; // number of milliseconds in three days



function getData(logs)
{
	var eDate = new Date();
	var eYear = String(eDate.getFullYear());
	var eMonth = String(eDate.getMonth() + 1);
	var eDay = String(eDate.getDate());
	var eHour = String(eDate.getHours());
	var eMin = String(eDate.getMinutes());

	var sDate = new Date(eDate.getTime() - threeDays);
	var sYear = String(sDate.getFullYear());
	var sMonth = String(sDate.getMonth() + 1);
	var sDay = String(sDate.getDate());

	var elog = "https://www-bd.fnal.gov/Elog/";
	var root = "https://www-bd.fnal.gov/Elog/?";
	var logQueryString = "orLogName=";
	var dateQueryString = "startDate=" +  sYear + "-" + sMonth + "-" + sDay + "+00%3A00%3A00"
						+ "&endDate=" + eYear + "-" + eMonth + "-" + eDay + "+" + eHour + "%3A" + eMin + "%3A00";
	
	for(a in logs)
	{
		var link = root + logQueryString + logs[a] + "&" + dateQueryString;
		console.log(link);
		
		const req = new XMLHttpRequest();
		const index = a;

		//req.addEventListener("load", gotData);
		//req.addEventListener("error", gotError);

		req.onload = (e) => { 

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

		req.open("GET", link);
		req.overrideMimeType('text/html');
		req.responseType = "document";
		req.send();
	}
	
}

// function gotData()
// {
// 	//var dataText = this.responseText;
// 	//console.log(dataText);
// 	console.log(this.responseType);
// 	var dataHTML = this.responseXML;
// 	var entries = dataHTML.getElementById("entries");
// 	var entriesText = entries.innerHTML;
// 	console.log(entriesText);
// 	document.getElementById("content").innerHTML = entriesText;

	
// }

function gotError()
{
	console.log("Looks like we got an error from the ELog! The error code is: ");
	console.log(this.status);
}


getData(["Operations", "Booster", "Linac"]);