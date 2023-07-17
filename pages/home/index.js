$(document).ready(myHome);

function myHome() {
  changeTitle();

  var articleList = "";

  $.get(app.apiBaseURL + "articles").done((data) => {
    if (data.length > 0) {
      data.forEach((art) => {
        articleList += `
                    <div class="art-item" data-id="${art.id}">
                        <img src="${art.thumbnail}" alt="${art.title}">
                        <div>
                            <h3>${art.title}</h3>
                            <p>${art.resume}</p>
                        </div>
                    </div>                    
                `;
      });
      $(".post-main").html(articleList);
      getMostViewed(5);
      getLastComments(5);
    } else {
      $(".post-main").html("nenhum artigo publicado.");
    }
  });
}

function getMostViewed(limit) {
  var htmlOut = "";

  $.get(app.apiBaseURL + "articles/views/" + limit).done((data) => {
    if (data.length > 0) {
      htmlOut = "<ul>";
      data.forEach((item) => {
        htmlOut += `<li class="article" data-id="${item.id}">${item.title}</li>`;
      });
      htmlOut += "</ul>";
    } else {
      htmlOut = '<p class="center">Nenhum artigo encontrado.</p>';
    }

    $(".aside-card").html(htmlOut);
  });
}

function getLastComments(limit) {
  var htmlOut = "";

  $.get(app.apiBaseURL + "comments/last/" + limit).done((data) => {
    if (data.length > 0) {
      htmlOut = "<ul>";
      data.forEach((item) => {
        htmlOut += `<li class="article" data-id="${item.article}">${item.comment}</li>`;
      });
      htmlOut += "</ul>";
    } else {
      htmlOut = '<p class="center">Nenhum comentário ainda.</p>';
    }
    $(".card").html(htmlOut);
  });
  "use strict";

  const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  };

  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");

  const toggleNav = () => {
    navbar.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  addEventOnElements(navTogglers, "click", toggleNav);

  /**
   * HEADER ANIMACAO
   *
   */

  const header = document.querySelector("[data-header]");
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("active");
      //backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      //backTopBtn.classList.remove("active");
    }
  });

  /*
   * SLIDER
   */

  const slider = document.querySelector("[data-slider]");
  const sliderContainer = document.querySelector("[data-slider-container]");
  const sliderPrevBtn = document.querySelector("[data-slider-prev]");
  const sliderNextBtn = document.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(
    getComputedStyle(slider).getPropertyValue("--slider-items")
  );
  let totalSlidableItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidableItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidableItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(
      getComputedStyle(slider).getPropertyValue("--slider-items")
    );
    totalSlidableItems =
      sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
}
