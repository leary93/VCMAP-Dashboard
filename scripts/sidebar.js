Vue.component("side-bar", {
  template:
  `
  <div id="SideBar" v-bind:class="{'is-collapsed': isCollapsed, 'has-bg-custom-grey': isCollapsed, 'is-one-quarter': !isCollapsed}"
    class="column add-border fullheight" @mouseenter="open" @mouseleave="close">
    <aside class="menu" style="height: inherit, width: inherit">
      <div name="Menulist" v-bind:class="{'is-hidden' : isCollapsed}" class="menu-content scrollbar-warning">
        <ul id="siteList" class="menu-list">
          <li is="dynamic-frame" v-for="frame in sideFrames" v-bind:key="frame.name" v-bind:frame="frame"></li>
        </ul>
      </div>
    </aside>
  </div>
  `,
  props: {},
  data: function(){
    return {sideFrames: sideFrames, isCollapsed: false}
  },
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
});

var sideFrames = [];

projects.forEach(function(proj){
  if(proj.name != "algemeen")
  {
    // Might need some changing still for projects, but basically.
    sideFrames.push(proj);
  }
})

var sideBar = new Vue({
  el: '#SideLeft'
});
