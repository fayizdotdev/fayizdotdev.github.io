// Navigation scroll effect
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

// GitHub account issue notification
document.addEventListener("DOMContentLoaded", () => {
  const githubLink = document.querySelector(
    'a[href="https://github.com/fayisdotdev"]'
  );
  if (githubLink) {
    githubLink.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification(
        "I apologize, but my GitHub account is temporarily unavailable due to a flagging issue. I'm working to resolve this. Please check back later.",
        "info"
      );
    });
  }
});

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener("click", (e) => {
    navLinks.classList.toggle("active");
    // toggle icon between hamburger and close
    mobileMenuToggle.textContent = navLinks.classList.contains("active")
      ? "✕"
      : "☰";
    e.stopPropagation();
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("nav")) {
      navLinks.classList.remove("active");
      mobileMenuToggle.textContent = "☰";
    }
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenuToggle.textContent = "☰";
    });
  });
}

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 300) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(current)) {
      item.classList.add("active");
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (target) {
      navLinks.classList.remove("active");
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll animations
const fadeElements = document.querySelectorAll(".fade-in");
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach((element) => {
  scrollObserver.observe(element);
});

// Skills progress animation
const skillBars = document.querySelectorAll(".skill-progress");
const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const targetWidth = progressBar.getAttribute("data-progress") + "%";
      progressBar.style.width = targetWidth;
      observer.unobserve(progressBar);
    }
  });
}, observerOptions);

skillBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Projects filter functionality
let currentFilter = "all";
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(filter) {
  currentFilter = filter;
  projectCards.forEach((card) => {
    const technologies = card.getAttribute("data-technologies").split(",");
    if (filter === "all" || technologies.includes(filter)) {
      card.style.display = "flex";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 10);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.display = "none";
      }, 300);
    }
  });
}

// Handle form submission
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        showNotification("Message sent successfully!", "success");
        contactForm.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      showNotification("Failed to send message. Please try again.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// Notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Theme toggle functionality
const themeToggle = document.querySelector("#theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLightTheme = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLightTheme ? "light" : "dark");
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }
}

// Lazy loading images
const lazyImages = document.querySelectorAll("img[data-src]");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.getAttribute("data-src");
      img.removeAttribute("data-src");
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => {
  imageObserver.observe(img);
});

// Initialize typed.js if element exists
const typedElement = document.querySelector(".typed-text");
if (typedElement && window.Typed) {
  new Typed(typedElement, {
    strings: [
      "Software Engineer",
      "Frontend Developer",
      "UI/UX Enthusiast",
      "Problem Solver",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
  });
}

// Initialize AOS if available
if (window.AOS) {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
}

// Initial GitHub account notification
window.addEventListener("DOMContentLoaded", () => {
  // Create modal styles if they don't exist
  if (!document.querySelector("#modal-styles")) {
    const style = document.createElement("style");
    style.id = "modal-styles";
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      .modal-content {
        background: var(--color-bg-card);
        padding: 2rem;
        border-radius: var(--radius-md);
        max-width: 90%;
        width: 400px;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        border: 1px solid var(--color-accent);
      }
      .modal-overlay.show {
        opacity: 1;
        visibility: visible;
      }
      .modal-overlay.show .modal-content {
        transform: translateY(0);
      }
      .modal-title {
        color: var(--color-accent);
        margin-bottom: 1rem;
        font-size: 1.25rem;
        font-weight: 600;
      }
      .modal-text {
        color: var(--color-text-primary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }
      .modal-close {
        background: var(--color-accent);
        color: var(--color-bg-dark);
        border: none;
        padding: 0.5rem 1.5rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
      }
      .modal-close:hover {
        background: var(--color-accent-hover);
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  }

  // Create and show modal
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <h3 class="modal-title">⚠️ GitHub Account Notice</h3>
      <p class="modal-text">I apologize for the inconvenience, but my GitHub account is currently flagged and temporarily unavailable. I'm actively working to resolve this issue. Thank you for your understanding.</p>
      <button class="modal-close">Got it</button>
    </div>
  `;
  document.body.appendChild(modal);

  // Show modal with slight delay for smooth transition
  setTimeout(() => {
    modal.classList.add("show");
  }, 1000);

  // Close modal on button click
  const closeButton = modal.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
});

// Preloader
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});
