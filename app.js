const container = document.querySelector(".container");
const header = document.querySelector(".header");
const cardsContainer = document.querySelector(".cards");
const images = [
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
  "https://images.pexels.com/photos/1477166/pexels-photo-1477166.jpeg",
  "https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg",
  "https://images.pexels.com/photos/53581/bald-eagles-bald-eagle-bird-of-prey-adler-53581.jpeg",
  "https://images.pexels.com/photos/2220336/pexels-photo-2220336.jpeg",
  "https://images.pexels.com/photos/20787/pexels-photo.jpg",
  "https://images.pexels.com/photos/40803/lion-animal-predator-big-cat-40803.jpeg",
  "https://images.pexels.com/photos/598966/pexels-photo-598966.jpeg",
  "https://images.pexels.com/photos/46178/teddy-bear-bear-children-toys-forest-46178.jpeg",
];

const initializeDOM = () => {
  const card = cardsContainer.firstElementChild;
  cardsContainer.innerHTML = "";
  images.forEach(image => {
    const clone = card.cloneNode(true);
    clone.querySelector("img").src = image;
    cardsContainer.appendChild(clone);
  });
};

const initializeLenis = () => {
  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
  });
  lenis.on("scroll", ScrollTrigger.update);
};

const getCardsAnimation = () => {
  const parallaxScale = 50;
  const cards = gsap.utils.toArray(".card");

  cards.forEach(card => {
    const fadeInTarget = card.querySelector('.card-scroll-wrapper');
    const image = card.querySelector("img");
    gsap.set(image, {
      height: `${100 + parallaxScale}%`,
    });

    // fade into view
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: "top 90%" } })
      .from(fadeInTarget, { yPercent: 50 });

    // parallax
    gsap
      .timeline({
        scrollTrigger: { trigger: card, scrub: 1 },
      })
      .to(image, { yPercent: parallaxScale, ease: "linear" });
  });
};

const getHeaderAnimation = () => {
  gsap
    .timeline({
      scrollTrigger: { trigger: header, start: "top top", scrub: 1 },
    })
    .to(header.children, { yPercent: -100, ease: "power1.out" });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeDOM();
  initializeLenis();
  getCardsAnimation();
  getHeaderAnimation();
});

// gsap.set(image, {
//   height: `${100 + parallaxScale}%`,
//   xPercent: -50,
//   left: '50%'
// });