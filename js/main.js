//collapse

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

//animation

var scroll = window.requestAnimationFrame || function(callback){ window.setTimeout(callback,1000/60)};

var elementsToShowBottom = document.querySelectorAll('.show-on-scroll-bottom-top');
var elementsToShowRight = document.querySelectorAll('.show-on-scroll-right-left');
var elementsToShowLeft = document.querySelectorAll('.show-on-scroll-left-right');

function loopBottom() {
  elementsToShowBottom.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible-bottom-top');
    } else {
      element.classList.remove('is-visible-bottom-top');
    }
  });
  scroll(loopBottom);
}
loopBottom();

function loopRight() {
  elementsToShowRight.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible-right-left');
    } else {
      element.classList.remove('is-visible-right-left');
    }
  });
  scroll(loopRight);
}
loopRight();

function loopLeft() {
  elementsToShowLeft.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible-left-right');
    } else {
      element.classList.remove('is-visible-left-right');
    }
  });
  scroll(loopLeft);
}
loopLeft();

function isElementInViewport(el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}
