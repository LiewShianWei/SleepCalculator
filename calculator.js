function displayCalcForm() {
    document.getElementById('calc-form').style.display = 'block';
    document.getElementById('calc-results').style.display = 'none';
}

function calculateTime() {
    //DEFINE ALL VARIABLES
    var timeToFallAsleep = 15;
    var interval = 50;
    var startTime;
    var min,max;

    if (document.getElementById("toggle-wakeup").checked) {
        var type = "wakeup";
    } else if (document.getElementById("toggle-gotobed").checked) {
        var type = "gotobed";
    }

    var hour = parseFloat(document.getElementById("hour").value);
    var minute = parseFloat(document.getElementById("minute").value);
    var AMPM = document.getElementById("AMPM").value;

    //CONVERT TO 24-HOUR SYSTEM
    if (AMPM == "PM" && hour < 12) {
        hour += 12;
        
    } 
    
    if (hour == 12 && AMPM == "AM") {
        hour = 0;
    }

    var age = document.getElementById("age").value;


    //FIND START TIME AND INTERVAL OF SLEEP NEEDED BY AGE
    if(age == "1-2")
    {
        startTime = 800;
        min = 11;
        max = 14;
    }
    else if(age == "3-5")
    {
        startTime = 750;
        min = 10;
        max = 13;
    }
    else if(age == "6-13")
    {
        startTime = 650;
        min = 9;
        max = 11;
    }
    else if(age == "14-17")
    {
        startTime = 600;
        min = 8;
        max = 10;
    }
    else if(age == "18-64")
    {
        startTime = 540;
        interval = 90;
        min = 7;
        max = 9;
    }
    else if(age == "65+")
    {
        startTime = 540;
        interval = 90;
        min = 7;
        max = 8;
    }

    var result = [];
    var sleepNeeded;
    var bedtime;

    //SUGGEST 4 TIME SLOTS TO SLEEP OR WAKE UP TO
    for (var i = 1; i <= 4; i++) {
        time = hour + minute/60;
        sleepNeeded = (startTime + timeToFallAsleep)/60;
    
        if (type == "wakeup") {
            bedtime = time - sleepNeeded;

        } else if (type == "gotobed") {
            bedtime = time + sleepNeeded;
        }

        hoursOnly = Math.floor(bedtime);


        if (hoursOnly >= 24) {
            bedtime -= 24;

        } else if (hoursOnly < 0) {
            bedtime += 24;
        }

        if (0 <= bedtime && bedtime < 12) {
            AMPM = "AM";

        } else {
            AMPM = "PM";
        }

        hoursOnly = Math.floor(bedtime);

        //CONVERT TO BACK TO 12-HOUR SYSTEM
        if (AMPM == "PM" && hoursOnly > 12) {  
            bedtime -= 12; 

        } else if (hoursOnly == 0) {
            bedtime += 12;
        }

        convertHour = Math.floor(bedtime);
        convertMin = Math.round((bedtime - Math.floor(bedtime)) * 60);

        if (convertMin == 60) {
            convertMin = 0;
            convertHour += 1;
        }

        if (convertMin.toString().length == 1) {
            convertMin = "0" + String(convertMin);
        }

        
        finalTime = String(convertHour) + ":" + String(convertMin) + " " + AMPM;
        sleepCycles = String(startTime/interval) + " " + "Sleep Cycles";

        slpNeededHr = Math.floor(sleepNeeded);
        slpNeededMin = sleepNeeded - slpNeededHr;

        console.log(sleepNeeded, slpNeededHr, slpNeededMin);

        if (slpNeededMin >= 0.5) {
            slpNeededMin = 0.5;

        } else {
            slpNeededMin = 0;
        }

        sleepNeeded = String(slpNeededHr + slpNeededMin) + " " + "Hours of Sleep";

        finalResult = "<p class='calc-results-item'>" + "<span class='calc-results-time'>" + finalTime + "</span>" + "<br>" + sleepNeeded + " & " + sleepCycles + "</p>";
        result.push([finalResult]);

        startTime -= interval;
    }

    inputTime = document.getElementById("hour").value + ":" + document.getElementById("minute").value + " " + document.getElementById("AMPM").value;
    if (type == "wakeup") {
        resultHead = "To wake up at " + inputTime + ", you should sleep at:";
            
    } else {
        resultHead = "To sleep at " + inputTime + ", you should wake up at:";
    }


    document.getElementById('calc-form').style.display = 'none';
    document.getElementById('calc-results').style.display = 'block';
    document.getElementById('resultHeader').innerHTML = resultHead;
    document.getElementById('result1').innerHTML = result[0];
    document.getElementById('result2').innerHTML = result[1];
    document.getElementById('result3').innerHTML = result[2];
    document.getElementById('result4').innerHTML = result[3];
}