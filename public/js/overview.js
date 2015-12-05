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
	var list = document.getElementsByName("universityDeadline");
	//var list = document.getElementsByName("123");
	len = list.length;
	for (i=0;i<len;i++){
		var	myDate = new Date();
		var mytime=myDate.toLocaleDateString();
		var deadline = list[i].innerHTML;
		var strArray = deadline.split("/");
		//The format of Date is yyyy/mm/dd, but the format we use is mm/dd/yyyy, so we did this convertion
		var deadlineDate = new Date(strArray[2],strArray[0]-1,strArray[1]);

		dMillionSeconds = deadlineDate - myDate;
		dDay = dMillionSeconds/1000/3600/24;

		
		if (deadlineDate.getFullYear() != strArray[2] || deadlineDate.getMonth() != strArray[0]-1 || deadlineDate.getDate() != strArray[1]){
			list[i].innerHTML = "(invalid time)";
			list[i].style.cssText = "color: #FF0000!important;font-weight:bold";
		}
		else{
			if(dDay > 7 && dDay < 30)
				list[i].style.cssText = "color: #CC0000!important";
			else if(dDay > 0 && dDay <= 7 )
			    list[i].style.cssText = "color: #FF0000!important;font-weight:bold";
			else
			   	list[i].style.cssText = "color: #000000!important";
		}
	}
}    

function strDateTime(str) 
{ 
var r = str.match(/^(\d{1,2})(-|\/)(\d{1,2})\2(\d{1,4})$/); 
if(r==null)return false; 
var d= new Date(r[4], r[3]-1, r[1]); 
return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]); 
} 

deadlineRed();
doneGreen();


