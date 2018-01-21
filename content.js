chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

    console.log("something happening from the extension");
    //var data = request.data || {};

    /* GET DOM ELEMENTS */
    var linksList = document.getElementsByTagName('a');
    var classView = document.getElementsByClassName('dijitTitlePane classView');
    var classInfo = document.getElementsByClassName('classInfoContent');

    // TODO: add support for teachers contact information
    // var classInstructors = document.getElementsByClassName('instructorContainer');

    /* PARSE DOM ELEMENTS */ 
    var classes = [];  // array of Class objects
    for(i=0; i<classView.length; i++){
      const info = classView[i].innerText.split("\n")
      if (info.length <= 5) {
        if (info.length == 5){
          info.splice(2, 1);  // remove PolyLearn
        }
        const name = info[0];						        // class name
        const desc = info[1];							// class description
        const date = info[2].substr(0, info[2].indexOf(' '));			// class data ("MTWRF")
        const time = info[2].substr(info[2].indexOf(' ') +1);			// class time ("07:00 AM to 08:00 AM") 
        const loc = classInfo[i].getElementsByTagName('div')[5].innerText;	// class location ("14-303 (Frank E. Pilling)")
        classes.push(new Class(name, desc, date, time, loc));
      }
    } 
    console.log(classes);
    
    var events = [];
    classes.forEach(function(c) {
      events.push(c.name + " at " + c.loc + " from " + c.time + " every " + c.getDays() + " until March 16");
    });
    console.log(events);
    /*[].forEach.call(linksList, function(header) {
        header.innerHTML = request.data;
    });*/
    sendResponse({data: null, success: true});
});


class Class{
  constructor(name, description, days, time, loc){
    this.name = name; 
    this.description = description; 
    this.days = days;
    this.time = time; 
    this.loc = loc;
  }
  
  getDays() { 
      var str = "";
      for(var i=0; i<this.days.length; i++){
        switch(this.days.charAt(i)) {
          case 'M':
            str += "Monday"; 
            break;
          case 'T':
            str += "Tuesday";
            break;
          case 'W':
            str += "Wednesday";
            break;
          case 'R':
            str += "Thursday"; 
            break;
          case 'F':
            str += "Friday"; 
            break;
        }
        if (i != this.days.length - 1) {
          str += " and ";
        }
      }
      return str;
  } 
}

