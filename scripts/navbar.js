var projecten = [];
var documentatie = [];
var logging = [];
var qandA = [];
var tools = [];
var qrc = [];

var tabs = [
  {name: 'Projecten', active: false, projects: projecten},
  {name: 'Documentatie', active: false, projects: documentatie},
  {name: 'Tools', active: false, projects: tools},
  {name: 'Logging', active: false, projects: logging},
  {name: 'Q&A', active: false, projects: qandA},
  {name: 'QRC', active: false, projects: qrc},
  {name: 'Kalender', active: false}
];

// vul de tabs
projects.forEach(function(proj){
  projecten.push(proj);
  if(proj.file != null)
    documentatie.push(proj);
  logging.push(proj);
  qandA.push(proj);
})

// vul meer tabs
sources.forEach(function(source){
  if(source.cat == "tool")
    tools.push(source);
  if(source.cat == "qrc")
    qrc.push(source);
})

Vue.component("nav-bar", {
  template:
  `<nav class="navbar has-bg-custom-grey" role="navigation" aria-label="main navigation">
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
        <div class="navbar-item" v-bind:class="{'has-dropdown is-hoverable': tab.projects != null}" v-for="tab in tabs">
          <a class="has-text-white" v-bind:class="{'navbar-link': tab.projects != null}" @click="select(tab.name)"> {{ tab.name }} </a>
          <div class="navbar-dropdown" v-if="tab.projects != null">
            <a class="navbar-item" v-for="proj in tab.projects" @click="open(tab.name, proj)"> {{proj.name}} </a>
          </div>
        </div>
      <div class="navbar-end"></div>
    </div>
  </nav>`,
  data: function(){
    return {tabs: tabs}
  },
  methods:{
    open: function(tab, proj){
      if(tab == "Documentatie"){
        openPage(proj.name + "Pdf", proj, "pdf")
      }
      else if(tab == "Projecten"){
        openPage(proj.name + "Proj", proj, "home")
      }
      else if(tab == "Logging"){
        openPage("Logging", proj, "logging")
      }
      else if(tab == "Q&A"){
        openPage("Q&A", proj, "qandA")
      }
      else if(tab == "Tools"){
        openPage(proj.name + "Tool", proj, "tool");
      }
      else if(tab == "QRC"){
        openPage(proj.name + "QRC", proj, "qrc");
      }
    },
    select: function(tab){
      if(tab == "Projecten"){
        openPage("home", null, "home");
      }
      else if(tab == "Documentatie"){
        openPage("Documentatie", null, "home")
      }
      else if(tab == "Logging"){
        openPage("Logging", null, "logging")
      }
      else if(tab == "Q&A"){
        openPage("Q&A", null, "qandA")
      }
    }
  }
});

var navBar = new Vue({
  el: "#NavBar"
})
