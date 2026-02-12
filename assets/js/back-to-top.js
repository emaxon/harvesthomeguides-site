window.onscroll = function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrollPercentage = (scrollTop / scrollHeight) * 100;
  if (scrollTop > 500 || scrollPercentage > 5) {
    document.getElementById("myBtn").classList.add("show");
  } else {
    document.getElementById("myBtn").classList.remove("show");
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
