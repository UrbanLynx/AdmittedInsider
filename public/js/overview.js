function doneGreen(){
	var list = document.getElementsByName("card");
	len = list.length;
	for (i=0;i<len;i++){
		/*The id will look like this:
		{done: true
		.....
		}
		So if the 8th char is 't', it means done=true
		*/
		if(list[i].id[8] == 't'){
			//list[i].style.background = "#bcffb3";
			list[i].style.backgroundImage = "url(/image/card_done.jpg)";
			list[i].style.opacity = "0.7";
		}
	}
}

function deadlineRed(){
	var list = document.getElementsByName("deadlineDate");
	var card = document.getElementsByName("card");
	len = list.length;
	for (i=0;i<len;i++){
		var	myDate = new Date();
		var mytime=myDate.toLocaleDateString();
		var deadline = list[i].value;
		var strArray = deadline.split("-");

		var deadlineDate = new Date(strArray[0],strArray[1]-1,strArray[2]);
		dMillionSeconds = deadlineDate - myDate;
		dDay = dMillionSeconds/1000/3600/24;

		reddest = parseInt('88',16).toString(10);
		whitest = parseInt('FF',16).toString(10);

		percent = dDay/30;
		if (percent>1)
			percent = 1;

		t = (whitest - reddest)*percent + reddest*1.0;
		t = parseInt(t,10).toString(16);

		card[i].style.backgroundColor = "#FF"+t+t;
	}
}    

deadlineRed();
doneGreen();

$('.datepicker').bootstrapMaterialDatePicker({ weekStart : 0, time: false });
$('#datetimepicker4').datetimepicker();


