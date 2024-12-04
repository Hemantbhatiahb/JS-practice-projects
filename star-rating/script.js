const stars = document.querySelectorAll("span");
const selectedRating = document.getElementById("selected-rating");

const state = {
  rating: 0,
  updateRating: function (value) {
    this.rating = value;
    handleRerender(value);
    selectedRating.innerText = value;
  },
};

const handleRerender = (rValue) => {
  for (let i = 0; i < stars.length; i++) {
    if (i < rValue) {
      stars[i].classList.add("highlight");
    } else {
      stars[i].classList.remove("highlight");
    }
  }
};

stars.forEach((star) => {
  star.addEventListener("click", function (e) {
    const value = star.getAttribute("data-index");
    state.updateRating(value);
  });

  star.addEventListener("mouseover", function (e) {
    const value = star.getAttribute("data-index");
    handleRerender(value);
  });

  star.addEventListener("mouseleave", function (e) {
    handleRerender(state.rating);
  });
});
