var tabs = [
  {name: 'Projecten', active: false},
  {name: 'Documentatie', active: false},
  {name: 'Logging', active: false},
  {name: 'Q&A', active: false},
  {name: 'Kalender', active: false},
  {name: 'tab6', active: false}
];

Vue.component("nav-bar")

var navTemplate = `<nav class="navbar has-bg-custom-grey" role="navigation" aria-label="main navigation">
                    <div class="navbar-brand">
                      <button name="BurgerButton" class="button is-medium has-bg-custom-grey is-text light-padding is-hidden" onclick="SidebarToggle(false)">
                        <span class=""><i class="fas fa-bars"></i></span>
                      </button>
                      <a class="navbar-item is-white light-padding" href="">
                        <img src="Images/logo_map.svg">
                      </a>
                    </div>
                    <div name="navMenu" class="navbar-menu">
                      <div class="navbar-start"></div>
                        <div class="navbar-item" v-for="tab in tabs">
                          <a class="has-text-white"> {{ tab.name }} </a>
                        </div>
                      <div class="navbar-end"></div>
                    </div>
                  </nav>`

var navBar = new Vue({
  el: "#NavBar",
  data: {tabs},
  template: navTemplate
})
