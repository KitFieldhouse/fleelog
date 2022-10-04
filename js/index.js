




function getData(logs)
{
	
	for(a in logs)
	{
		var link = "https://www-bd.fnal.gov/Elog/?orLogName=" + logs[a];
		console.log(link);
		
		const req = new XMLHttpRequest();
		req.addEventListener("load", gotData);
		req.open("GET", link);
		req.send();
	}
	
}

function gotData()
{
	var data = this.responseText;
}



getData(["Operations"]);