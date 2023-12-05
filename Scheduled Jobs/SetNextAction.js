// schedule job condition code
var result = true;
var gdt = new GlideDateTime();

// Get the day of the week (1=Monday, 7=Sunday)
var day = gdt.getDayOfWeekLocalTime();

// Check if today is Saturday (6) or Sunday (7)
if (day == 6 || day == 7) {
  // Calculate days to add (1 day if Sunday, 2 days if Saturday)
  var daysToAdd = day == 7 ? 1 : 2;

  // Add the days to the current date
  gdt.addDaysLocalTime(daysToAdd);

  // Schedule the job for the next weekday
  var schedule = new GlideRecord("sys_trigger");
  schedule.addEncodedQuery("name=Test script schedule");
  schedule.orderByDesc("next_action");
  schedule.query();
  if (schedule.next()) {
    // we pass the event name, glide record, and a value of our choice in the parameters
    gs.eventQueue("schedule_weekend_execution", schedule, gdt.getValue());
  }
  result = false;
}
result;

// Event: schedule_weekend_execution

// Script Action Code:
// Schedule the job for the next weekday
var schedule = new GlideRecord("sys_trigger");
schedule.addEncodedQuery("name=Test script schedule");
schedule.orderByDesc('next_action');
schedule.query();
if (schedule.next()) {
    schedule.setValue('next_action', event.parm1);
    schedule.update();
}

