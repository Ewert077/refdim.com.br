// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("mainNavbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// ===================================
// Active Nav Link on Scroll
// ===================================
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

window.addEventListener("scroll", () => {
  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = target.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show")
      }
    }
  })
})

// ===================================
// Typing Effect for Hero Section
// ===================================
const typedTextElement = document.getElementById("typedText")
const textArray = ["Autoconhecimento", "Desenvolvimento Pessoal", "Consciência Financeira", "Transformação Interior"]
let textArrayIndex = 0
let charIndex = 0
let isDeleting = false
let typingDelay = 100
const erasingDelay = 50
const newTextDelay = 2000

function type() {
  if (!typedTextElement) return

  const currentText = textArray[textArrayIndex]

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
    typingDelay = erasingDelay
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
    typingDelay = 100
  }

  if (!isDeleting && charIndex === currentText.length) {
    typingDelay = newTextDelay
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textArrayIndex++
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0
    }
    typingDelay = 500
  }

  setTimeout(type, typingDelay)
}

// Start typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (typedTextElement) {
    setTimeout(type, 500)
  }
})

// ===================================
// Initialize Swiper for Testimonials
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.Swiper !== "undefined") {
    const Swiper = window.Swiper // Declare Swiper variable
    const swiper = new Swiper(".testimonials-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    })
  }
})

// ===================================
// Initialize AOS (Animate On Scroll)
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.AOS !== "undefined") {
    const AOS = window.AOS // Declare AOS variable
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    })
  }
})

// ===================================
// Form Validation (if you add a contact form)
// ===================================
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Add your form validation and submission logic here
    const formData = new FormData(contactForm)

    // Example: Send to server or show success message
    console.log("Form submitted:", Object.fromEntries(formData))

    // Show success message
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    contactForm.reset()
  })
}

// ===================================
// Lazy Loading Images
// ===================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  const images = document.querySelectorAll("img[data-src]")
  images.forEach((img) => imageObserver.observe(img))
}

// ===================================
// Counter Animation for Statistics
// ===================================
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start)
    }
  }, 16)
}

// Trigger counter animation when element is in view
const counterElements = document.querySelectorAll("[data-counter]")
if (counterElements.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.dataset.counter)
        animateCounter(entry.target, target)
        counterObserver.unobserve(entry.target)
      }
    })
  })

  counterElements.forEach((el) => counterObserver.observe(el))
}

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// ===================================
// Mobile Menu Close on Outside Click
// ===================================
document.addEventListener("click", (e) => {
  const navbar = document.querySelector(".navbar")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (navbarCollapse.classList.contains("show") && !navbar.contains(e.target)) {
    navbarCollapse.classList.remove("show")
  }
})
