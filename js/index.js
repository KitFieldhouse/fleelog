




function getData(logs)
{
	
	for(a in logs)
	{
		var link = "https://www-bd.fnal.gov/Elog/?orLogName=" + logs[a];
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