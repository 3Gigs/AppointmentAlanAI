const vDashboard = visual({screen: "Dashboard"});

let about = context(() => {
    intent('I want a $(app~ doctor appiontment~doctor|meeting~business meeting|due date ~ due date of|counseling~conversation|class~course)' , p => {
        p.play(`You have made an appiontment about ${p.app.label}`);
        p.play({ 
            command : `appointmentLabel(${p.app.label})`
        });
    });
});

intent(vDashboard, ("Make an appointment on $(DATE)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play({
        command : `schedules(${p.DATE})`
    });
    p.play('what you want to make an appointment for?');
    p.then(about);
});

//Only day and time, default 1 hout appointment.
intent(vDashboard, ("Make an appointment on $(DATE) at $(TIME)"), p => {
    p.play('make an appointment on ');
    p.play(p.DATE.value); 
    p.play(`at ${p.TIME.value}`);
    p.play({
        command : "schedules($(p.DATE),$(p.TIME))"
    });
    p.play('what you want to make an appointment for?');
    p.then(about);
});

//Given starting time and end time
intent(vDashboard, ("Make an appointment from $(fromDate DATE) $(fromTime TIME) to $(toDate DATE) $(toTime TIME)"), p => {
    p.play('make an appointment from ');
    p.play(p.fromDate.value); 
    p.play(p.fromTime.value);
    p.play("to");
    p.play(p.toDate.value); 
    p.play(p.toTime.value);
    p.play({
        command : `schedules(${p.fromDate},${p.fromTime},${p.toDate},${p.toTime})`
    });
    p.play('what you want to make an appointment for?');
    p.then(about);
});