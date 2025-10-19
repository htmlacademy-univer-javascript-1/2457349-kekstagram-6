function isMeetingInWorkTime(startWork, endWork, meetingStart, duration) {
  function toMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startWorkMinutes = toMinutes(startWork);
  const endWorkMinutes = toMinutes(endWork);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + duration;

  return meetingStartMinutes >= startWorkMinutes && meetingEndMinutes <= endWorkMinutes;
}

export {isMeetingInWorkTime};
