Vue.component("check-list")

Vue.component("sub-list", {
  template: `
  <div class="field">
    <p class="menu-label has-text-black is-size-5">
      {{ project.name }}
    </p>
    <ul class="menu-list">
      <li v-for="check in project.checks">
        <label class="checkbox">
          <input type="checkbox">
          {{ check }}
        </label>
      </li>
    </ul>
  </div>
  `,
  props: ['project']
})

var checkListTemplate = `
  <div id="CheckList" v-bind:class="{'is-collapsed': isCollapsed, 'has-bg-custom-grey': isCollapsed, 'is-one-fifth': !isCollapsed}"
   @mouseenter="open" @mouseleave="close" class="column add-border">
    <aside class="menu scrollbar-warning menu-content" v-bind:class="{'is-hidden' : isCollapsed}">
      <sub-list v-for="project in projects" v-bind:project="project" v-bind:key="project.name">
      </sub-list>
    </aside>
  </div>
`

var checkList = new Vue({
  el: "#SideRight",
  data: {projects: projects, isCollapsed: false},
  template: checkListTemplate,
  methods: {
    open: function(){
      // function that opens the sidebar (like on hover-over, or an open button)
      console.log('would open')
      this.isCollapsed = false;
    },
    close: function(){
      // function that closes the sidebar (like on hover-leave, or a close button)
      console.log('would close')
      this.isCollapsed =  true;
    }
  }
})
