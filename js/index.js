window.onresize=function(){
    adjustPadding(0);
}
adjustPadding(1);
function adjustPadding(flag) {
    var width = document.documentElement.clientWidth;
    var paddingLeft;
    var w1 = 975, w2 = 1183;
    if (flag == 1) {
      w1 += 17;
      w2 += 17;
    }
    if (width <= w1) {
      paddingLeft = 50;
    } else if (width > w1 && width <= w2) {
      paddingLeft = 280;
    } else {
      paddingLeft = 470;
    }
    document.getElementById("login_span").style.paddingLeft = paddingLeft + 'px';
}
