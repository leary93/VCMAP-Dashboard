Vue.component("check-list")

Vue.component("sub-list", {
  template: `
  <div class="card">
    <header class="card-header has-text-justified has-background-grey" @click="toggle">
      <p class="card-header-title has-text-black is-size-5 has-text-justified">
        <b>{{ project.name }}</b>
      </p>
    </header>
    <section class="card-content">
    <ul class="" v-show="!isCollapsed">
      <li v-for="check in project.checks">
        <label class="checkbox">
          <input type="checkbox">
          {{ check }}
        </label>
      </li>
    </ul>
    </section>
    <footer class="card-footer">
    </footer>
  </div>
  `,
  props: ['project'],
  data: function(){
    return {isCollapsed: false}
  },
  methods:{
    toggle: function(){
      if(this.isCollapsed)
        this.isCollapsed = false;
      else
        this.isCollapsed = true;
    }
  }
})

var checkListTemplate = `
  <div id="CheckList" v-bind:class="{'is-collapsed': isCollapsed, 'has-bg-custom-grey': isCollapsed, 'is-one-quarter': !isCollapsed}"
   @click="open" @blur="close" class="column add-border" tabindex="0">
    <aside class="scrollbar-warning menu-content" v-bind:class="{'is-hidden' : isCollapsed}">
      <sub-list v-for="project in projects" v-bind:project="project" v-bind:key="project.name">
      </sub-list>
    </aside>
  </div>
`

var checkList = new Vue({
  el: "#SideRight",
  data: {projects: projects, isCollapsed: true},
  template: checkListTemplate,
  methods: {
    open: function(){
      // function that opens the sidebar (like on hover-over, or an open button)
      this.isCollapsed = false;
    },
    close: function(){
      // function that closes the sidebar (like on hover-leave, or a close button)
      this.isCollapsed =  true;
    }
  }
})
