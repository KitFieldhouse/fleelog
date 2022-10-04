
var threeDays = 3*86400000; // number of milliseconds in three days



function getData(logs)
{

	var sDate = new Date();
	var sYear = string(sDate.getFullYear());
	var sMonth = string(int(sDate.getMonth()) + 1);
	var sDay = string(sDate.getDate());
	var sHour = string(sDate.getHours());
	var sMin = string(sDate.getMinutes());

	var eDate = new Date(sDate.getTime() - threeDays);
	var eYear = string(sDate.getFullYear());
	var eMonth = string(int(sDate.getMonth()) + 1);
	var eDay = string(sDate.getDate());

	var root = "https://www-bd.fnal.gov/Elog/?";
	var logQueryString = "orLogName=";
	var dateQueryString = "startDate=" + sYear + "-" + sMonth + "-" + sDay + "+" + sHour + "%3A" + sMin + "%3A00" +
						+ "&endDate=" +  eYear + "-" + eMonth + "-" + eDay + "+00%3A00%3A00";
	
	for(a in logs)
	{
		var link = root + logQueryString + logs[a] + "&" + dateQueryString;
		console.log(link);
		
		const req = new XMLHttpRequest();
		req.addEventListener("load", gotData);
		req.addEventListener("error", gotError);
		req.open("GET", link);
		req.send();
	}
	
}

function gotData()
{
	var data = this.responseText;
	console.log(data);
	console.log("This has been fired");
}

function gotError()
{
	console.log("Looks like we got an error from the ELog! The error code is: ");
	console.log(this.status);
}


getData(["Operations"]);