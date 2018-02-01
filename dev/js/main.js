import { Events } from "./modules/PubSub";

(function() {
  const Menu = {
    elements: {
      root: document.documentElement,
      menu: document.querySelector(".menu"),
      button: document.querySelector(".menu-button"),
      exit: document.querySelector(".menu .exit"),
      menuModules: [...document.querySelectorAll(".menu-module")],
      menuGrid: document.querySelector(".menu-grid"),
      menuProperties: [...document.querySelectorAll(".menu-grid__property")],
      SVG: {
        button: document.querySelector(".dark-mode-toggle"),
        toggle: document.querySelector(".toggle-button")
      }
    },
    bindEvents() {
      Events.add("ToggleMenu", this.toggleMenu.bind(Menu));
      Events.add("ChangeTheme", this.changeTheme.bind(Menu));
      Events.add("ToggleDarkMode", this.toggleDarkMode.bind(Menu));
      Events.add("MaterialClick", this.materialClick.bind(Menu));

      this.elements.menuGrid.addEventListener("click", function(e) {
        Events.emit("ChangeTheme", e);
      });
      this.elements.exit.addEventListener("click", function() {
        Events.emit("ToggleMenu");
      });
      this.elements.button.addEventListener("click", function() {
        Events.emit("ToggleMenu");
      });
      this.elements.SVG.button.addEventListener("click", function() {
        Events.emit("ToggleDarkMode");
      });

      this.elements.menuProperties.forEach(property => {
        property.addEventListener("click", function(e) {
          Events.emit("MaterialClick", e);
        });
      });
    },

    init() {
      this.bindEvents();
    },

    toggleMenu() {
      this.elements.menu.classList.toggle("active");
      this.elements.menuModules.forEach(function(module) {
        module.classList.toggle("slide-in");
      });
    },

    changeTheme(e) {
      let item = e.target;
      let color = item.classList[1];
      if (color === undefined) {
        return;
      } else {
        this.elements.menuProperties.forEach(property => {
          if (property.classList.contains("default")) {
            property.classList.remove("default");
          }
        });
        if (!item.classList.contains("default")) {
          item.classList.add("default");
        }
        this.elements.root.style.setProperty(
          "--linear-gradient",
          `linear-gradient(to bottom, var(--color-one), var(--${color}))`
        );
      }
    },

    toggleDarkMode() {
      // If DarkMode Enabled
      if (this.elements.SVG.toggle.classList.contains("dark-active")) {
        this.elements.SVG.toggle.classList.remove("dark-active");

        //Activate Light Active
        this.elements.SVG.toggle.classList.add("light-active");
        if (this.elements.SVG.toggle.classList.contains("light-active")) {
          this.elements.root.style.setProperty("--menu-color", "rgba(247, 247, 247, 1)");
          this.elements.root.style.setProperty("--font-color", "rgba(37, 41, 46, 0.98)");
        }
      } else if (this.elements.SVG.toggle.classList.contains("light-active")) {
        this.elements.SVG.toggle.classList.remove("light-active");
        this.elements.SVG.toggle.classList.add("dark-active");

        if (this.elements.SVG.toggle.classList.contains("dark-active")) {
          this.elements.root.style.setProperty("--menu-color", "rgba(37, 41, 46, 0.98)");
          this.elements.root.style.setProperty("--font-color", "rgba(247, 247, 247, 0.98)");
        }
      }
    },

    materialClick(e) {
      // console.log(e.target.getBoundingClientRect());
      let top = e.clientY - e.target.getBoundingClientRect().top;
      let left = e.clientX - e.target.getBoundingClientRect().left;
      let target = e.target;
      let counter = 1;
      let materialCircle = document.createElement("div");
      materialCircle.addEventListener('animationend', removeMaterial);

      function insertCoordinates() {
        materialCircle.style.top = `${top}px`;
        materialCircle.style.left = `${left}px`;
      }

      function removeMaterial() {
        if (target.contains(materialCircle)) {
          materialCircle.remove();
        }
        console.log("Material Removed");
      }

      function expand() {
        materialCircle.classList.add("material-circle");
        target.appendChild(materialCircle);
        insertCoordinates();
        materialCircle.classList.add("expand");
      }
      expand();
    }
  };

  Menu.init();
})();
