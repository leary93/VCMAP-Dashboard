// Assigning a vue component that manages the main open page dynamically

Vue.component("dynamic-page", {
  template:
  `
  <div class="is-fullwidth add-border fullheight scrollbar-warning" v-bind:class="{'iframe-container': (type == 'pdf' || type == 'site')}" v-show="name == current">
    <iframe v-bind:src="project.file" v-if="type == 'pdf'" type="application/pdf" allowfullscreen></iframe>
    <iframe class="scrollbar-warning" v-bind:src="project.href" v-if="type == 'site'" allowfullscreen></iframe>
    <div v-if="type == 'qandA'">
      HERE IS PLANNED TO BE Q & A
    </div>
    <div v-if="type == 'logging'">
      HERE IS PLANNED TO BE LOGGING
    </div>
    <div id="homeList" class="columns is-centered is-multiline light-padding is-fullwidth" v-if="type == 'home'">
      <dynamic-frame v-for="project in projectframes" v-bind:frame="project" v-bind:key="project.name" v-bind:home='true'></dynamic-frame>
      <button class="button is-link overlay-generate" @click="openAll">Generate sites </button>
    </div>
  </div>
  `,
  props: {
    name: null,
    project: Object,
    type: null,
  },
  data: function(){
    return {projectframes: projectFrames, current: currentPage}
  },
  created: function(){
    pageList.$on('change-page', this.update);
  },
  methods: {
    update: function(){
      console.log("updating");
      this.current = currentPage;
    },
    openAll: function(){
      projects.forEach(function(proj){
        if(proj.href != null){
          setTimeout(function(){   window.open(proj.href) }, 200);
          console.log("opening" + proj.href);
        }
      })
    }
  }
});

var currentPage = "home";
var projectFrames = [];
var dynamicPages = [];

var pageList = new Vue({
  el: '#Center',
  data: {dynamicPages, current: currentPage},
  methods:{
    change: function(){
      this.$emit("change-page")
    }
  }
})

projects.forEach(function(proj){
  if(proj.name != "algemeen")
  {
    // Might need some changing still for projects, but basically.
    projectFrames.push(proj);
  }
})

function openPage(pageName, project, type){
  // When opening a page (for example, by clicking on one of the frames)
  // We launch this function, which checks if the page needs to be newly Created

  if(!LoadedPages.includes(pageName)){
    // If the page doesn't exist yet, we need to create it
    LoadedPages.push(pageName);

    var page = {
      name: pageName,
      project: project,
      type: type,
    }
    dynamicPages.push(page);
  }

  currentPage = pageName;
  pageList.current = currentPage;
  pageList.change();
}

openPage("home", null, "home")
