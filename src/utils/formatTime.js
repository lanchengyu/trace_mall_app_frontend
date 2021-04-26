export function addZero(num) {
    return num < 10 ? "0" + num : num;
}
export function formatDateTime(date) {
    let time = new Date(Date.parse(date));
    time.setTime(time.setHours(time.getHours() + 8));
    let Y = time.getFullYear() + "-";
    //js中使用自己的方法不需要用this.
    let M = addZero(time.getMonth() + 1) + "-";
    let D = addZero(time.getDate()) + " ";
    let h = addZero(time.getHours()) + ":";
    let m = addZero(time.getMinutes()) + ":";
    let s = addZero(time.getSeconds());
    return Y + M + D;
  }
