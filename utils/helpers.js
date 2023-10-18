function formatDate(date) {
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth() + 1; 
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";

    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }
  
    return `${shortMonthNames[monthIndex - 1]} ${day}, ${year} ${hours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
};

module.exports = {formatDate}