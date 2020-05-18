
  //close icon
  function postLikes() {
    var detail = document.getElementById("detailDiv");
    var close = document.getElementById("closeIcon");
    if (detail.style.display === "none") {
        detail.style.display = "block";
        close.style.display = "block";
    } else {
        detail.style.display = "none";
        close.style.display = "none";
    }
  }
// read more 
function readMore() {
    var text = document.getElementById("text");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (text.style.display === "none") {
      text.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      text.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
  
var slideIndex = 1;
showSlides(slideIndex);
      
function plusSlides(n) {
  showSlides(slideIndex += n);
}
      
function currentSlide(n) {
    showSlides(slideIndex = n);
}
      
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}