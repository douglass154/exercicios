class MobileNavBar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = 'active';

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = '')
                : (link.style.animation = `navLinkFade 0.9s ease forwards ${
                      index / 7 + 0.2
                  }s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener('click', this.handleClick);
        this.navList.addEventListener('click', this.handleClick)
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
    }
}

const mobileNavBar = new MobileNavBar(
    '.mobile-menu',
    '.nav-list',
    '.nav-list li'
);

mobileNavBar.init();
