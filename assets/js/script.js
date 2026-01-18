document.addEventListener("DOMContentLoaded", () => {
  // --- 1. TYPEWRITER EFFECT ---
  const roles = ["Web Developer", "Content Writer", "Administrator"];
  const typeText = document.getElementById("typewriter");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typeText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typeText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 500);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, speed);
    }
  }
  type();

  // --- 2. MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("active");
    });
  });

  // --- 3. 3D TILT EFFECT ---
  const tiltCard = document.getElementById("tiltCard");

  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      const cardRect = tiltCard.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      const rotateX = -mouseY / 20;
      const rotateY = mouseX / 20;
      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    document.addEventListener("mouseleave", () => {
      tiltCard.style.transform = `rotateX(0) rotateY(0)`;
    });
  }

  // --- 4. SPOTLIGHT HOVER EFFECT ---
  const portfolioCards = document.querySelectorAll(".portfolio-card");
  portfolioCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
    });
  });

  // --- 5. SCROLL REVEAL ANIMATION (KODE BARU DISINI) ---
  // Kode ini membuat elemen muncul saat di-scroll dan hilang saat keluar layar
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Muncul saat masuk layar
          entry.target.classList.add("active");
        } else {
          // Hilang saat keluar layar (supaya bisa animasi lagi)
          entry.target.classList.remove("active");
        }
      });
    },
    { threshold: 0.15 }
  ); // Muncul ketika 15% elemen terlihat

  revealElements.forEach((el) => revealObserver.observe(el));
});

// --- 6. ACTIVE LINK SCROLL SPY (Penanda Menu Otomatis) ---
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

const navObserverOptions = {
  threshold: 0.5, // Section dianggap aktif jika 50% terlihat di layar
};

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Ambil ID dari section yang sedang tampil
      const id = entry.target.getAttribute("id");

      // Loop semua link menu
      navItems.forEach((link) => {
        // Bersihkan class active dari semua link
        link.classList.remove("active");

        // Jika href link cocok dengan ID section, tambahkan active
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, navObserverOptions);

sections.forEach((section) => {
  navObserver.observe(section);
});

// Tambahan: Saat link diklik, langsung set aktif (biar instan)
navItems.forEach((link) => {
  link.addEventListener("click", function () {
    navItems.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});
