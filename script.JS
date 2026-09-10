// =========================================================
// UN LUGAR PARA MERENDAR — INTERACTIVIDAD
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Año dinámico en el footer ---------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ---------- Header: cambia de estilo al hacer scroll ---------- */
    const header = document.getElementById("siteHeader");
    const onScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();


    /* ---------- Menú hamburguesa (móvil) ---------- */
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.getElementById("mainNav");
    const navOverlay = document.getElementById("navOverlay");

    function closeMenu() {
        hamburger.classList.remove("is-open");
        mainNav.classList.remove("is-open");
        navOverlay.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
        const isOpen = mainNav.classList.toggle("is-open");
        hamburger.classList.toggle("is-open", isOpen);
        navOverlay.classList.toggle("is-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    }

    hamburger.addEventListener("click", toggleMenu);
    navOverlay.addEventListener("click", closeMenu);
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));


    /* ---------- Animación de aparición al hacer scroll ---------- */
    const revealTargets = document.querySelectorAll(
        ".craving, .menu-preview, .spotlight, .occasions, .experience, .gallery, .site-footer"
    );
    revealTargets.forEach(el => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));


    /* ---------- Carrusel de productos ---------- */
    const carousel = document.getElementById("carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function scrollCarousel(direction) {
        const card = carousel.querySelector(".product-card:not(.is-hidden)");
        const step = card ? card.getBoundingClientRect().width + 22 : 280;
        carousel.scrollBy({ left: direction * step, behavior: "smooth" });
    }

    prevBtn.addEventListener("click", () => scrollCarousel(-1));
    nextBtn.addEventListener("click", () => scrollCarousel(1));


    /* ---------- Filtro por categoría (chips) ---------- */
    const chips = document.querySelectorAll(".chip");
    const productCards = document.querySelectorAll(".product-card");

    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(c => c.classList.remove("is-active"));
            chip.classList.add("is-active");

            const category = chip.dataset.category;

            productCards.forEach(card => {
                const show = category === "todos" || card.dataset.category === category;
                card.classList.toggle("is-hidden", !show);
            });

            carousel.scrollTo({ left: 0, behavior: "smooth" });
        });
    });


    /* ---------- Selector de ocasión ---------- */
    const occasionTiles = document.querySelectorAll(".occasion-tile");
    const occasionResponse = document.getElementById("occasionResponse");

    const occasionMessages = {
        "Cumpleaños": "¡Perfecto! Preparamos la mesa con una sorpresa dulce para el festejo.",
        "Merienda": "Buenísimo, te separamos un rincón tranquilo para la merienda.",
        "Familia": "Genial, te ubicamos en una mesa amplia para toda la familia.",
        "Amigos": "Dale, preparamos una mesa grande para la juntada.",
        "Cita": "Perfecto, te reservamos un lugar más íntimo y tranquilo.",
        "Celebración": "¡Qué lindo! Armamos algo especial para la celebración.",
        "Otra": "Contanos más detalles cuando reserves y lo preparamos a tu medida."
    };

    occasionTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            occasionTiles.forEach(t => t.classList.remove("is-selected"));
            tile.classList.add("is-selected");

            const occasion = tile.dataset.occasion;
            occasionResponse.textContent = occasionMessages[occasion] || "";
        });
    });


    /* ---------- Galería con lightbox ---------- */
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("is-open");
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightboxImg.src = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
    });

});
