// script for sticky / scroll-shrink on header announcement
    const header = document.getElementById("site-header");

    if (header)
    {
        window.addEventListener("scroll", () => 
        {
            header.classList.toggle('header--scrolled', window.scrollY > 40);
        }, { passive: true });
    }

// script for footer year
    const yearEl = document.getElementById("year");
    if (yearEl)
    {
        yearEl.textContent = new Date().getFullYear();
    }

// mobile nav toggle
    const hamburger = document.getElementById("hamburger");
    const nav       = document.getElementById("main-nav");
    const overlay   = document.getElementById("nav-overlay");
    const navClose  = document.getElementById("nav-close");

    function toggleNav(open) 
    {
        if (!hamburger || !nav || !overlay) return;

        hamburger.setAttribute("aria-expanded", String(open));
        hamburger.classList.toggle("is-open", open);
        nav.classList.toggle("nav--open", open);
        overlay.classList.toggle("is-visible", open);
        document.body.classList.toggle("no-scroll", open);

        if (open) closeSearch();
    }

    if (hamburger && nav && overlay)
    {
        hamburger.addEventListener("click", () => 
        {
            toggleNav(hamburger.getAttribute("aria-expanded") !== "true");
        });

        overlay.addEventListener("click", () => toggleNav(false));
    }

    if (navClose)
    {
        navClose.addEventListener("click", () => toggleNav(false));
    }

// search toggle
    const searchToggle = document.getElementById("search-toggle");
    const searchBar    = document.getElementById("search-bar");
    const searchInput  = document.getElementById("search-input");
    const searchClose  = document.getElementById("search-close");
    const searchIcon   = document.getElementById("search-icon");

    function openSearch() 
    {
        if (!searchBar || !searchToggle || !searchIcon) return;

        searchBar.classList.add("search-bar--open");
        searchBar.setAttribute("aria-hidden", "false");
        searchToggle.setAttribute("aria-expanded", "true");
        searchToggle.setAttribute("aria-label", "Close search");
        searchIcon.className = "fas fa-times";
        setTimeout(() => searchInput.focus(), 50);

        /* close mobile nav if open */
        toggleNav(false);
    }

    function closeSearch() 
    {
        if (!searchBar || !searchToggle || !searchIcon) return;

        searchBar.classList.remove("search-bar--open");
        searchBar.setAttribute("aria-hidden", "true");
        searchToggle.setAttribute("aria-expanded", "false");
        searchToggle.setAttribute("aria-label", "Open search");
        searchIcon.className = "fas fa-search";
    }

    if (searchToggle && searchBar)
    {
        searchToggle.addEventListener("click", () => 
        {
            searchBar.classList.contains("search-bar--open") ? closeSearch() : openSearch();
        });
    }

    if (searchClose)
    {
        searchClose.addEventListener("click", closeSearch);
    }

    /* close on escape */
    document.addEventListener("keydown", (e) => 
    {
        if (e.key === "Escape") 
        { 
            closeSearch(); 
            toggleNav(false); 
        }
    });

// script for year in footer
    document.getElementById("year").textContent = new Date().getFullYear();

// script for back to top
    const backBtn = document.getElementById("backToTop");

    if (backBtn)
    {
        window.addEventListener("scroll", () => 
        {
            backBtn.classList.toggle("back-to-top--visible", window.scrollY > 400);
        }, { passive: true });

        backBtn.addEventListener("click", () => 
        {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

// script for payment tab switching on checkout page
    const tabs   = document.querySelectorAll(".co-pay-tab");
    const panels = document.querySelectorAll(".co-pay-panel");

    tabs.forEach(tab =>
    {
        tab.addEventListener("click", () =>
        {
            tabs.forEach(t =>
            {
                t.classList.remove("co-pay-tab--active");
                t.setAttribute("aria-selected", "false");
            });
            panels.forEach(p =>
            {
                p.classList.remove("co-pay-panel--active");
                p.hidden = true;
            });
            tab.classList.add("co-pay-tab--active");
            tab.setAttribute("aria-selected", "true");
            const panel = document.getElementById(tab.dataset.target);
            panel.classList.add("co-pay-panel--active");
            panel.hidden = false;
        });
    });

// script for card number auto-spacing on checkout page
    const cardInput = document.getElementById("co-card-number");
    if (cardInput) 
    {
        cardInput.addEventListener("input", e => 
        {
            let v = e.target.value.replace(/\D/g, '').substring(0,16);
            e.target.value = v.replace(/(.{4})/g, '$1  ').trim();
        });
    }

// script for Expiry MM / YY formatting on checkout page
    const expiryInput = document.getElementById("co-expiry");
    if (expiryInput) 
    {
        expiryInput.addEventListener("input", e => 
        {
            let v = e.target.value.replace(/\D/g, '').substring(0,4);
            if (v.length >= 3) v = v.substring(0,2) + ' / ' + v.substring(2);
            e.target.value = v;
        });
    }

// JS for search in header
    const searchForm = document.getElementById("search-input");

    if (searchForm)
    {
        searchForm.addEventListener("keydown", function (e)
        {
            if (e.key === "Enter" && searchForm.value.trim() !== "")
            {
                window.location.href = "search.html?q=" + encodeURIComponent(searchForm.value.trim());
            }
        });
    }