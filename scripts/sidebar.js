Vue.component('dynamic-frame',{
  template: `
  <div>
    <a v-bind:href="frame.link">
      <div v-bind:class="{'add-border': !isActive, 'box': !isActive}">
        <figure v-bind:class="{'is-hidden': isActive, 'is-16by9': !isActive, 'image': !isFrame}">
          <img v-bind:src="frame.image" v-bind:alt="frame.name" v-bind:class="{'is-hidden': isFrame}"></img>
          <iframe v-bind:src="frame.href" class="scrollbar-warning" v-bind:class="{'is-hidden': !isFrame}" v-bind:allowfullscreen="isActive">
          </iframe>
        </figure>
        <button v-bind:class="{'is-hidden': isActive}" class="button has-text-centered has-text-weight-semibold is-fullwidth is-radiusless is-paddingless">
          {{ frame.name }}
        </button>

      </div>
    </a>
  </div>
  `,
  props: {
    frame: Object
  },
  data: function(){
    return {isActive: false, isFrame: false}
  }
});

Vue.component("side-bar");

var sideBarTemplate = `
<div id="SideBar" v-bind:key="id" v-bind:class="{'is-collapsed': isCollapsed, 'has-bg-custom-grey': isCollapsed, 'is-one-fifth': !isCollapsed}"
  class="column add-border fullheight" @mouseenter="open" @mouseleave="close">
  <aside class="menu" style="height: inherit, width: inherit">
    <div name="Menulist" v-bind:class="{'is-hidden' : isCollapsed}" class="menu-content scrollbar-warning">
      <div id="siteList" class="field">
        <p class="menu-label has-text-black is-size-5">
          Project sites
        </p>
        <ul class="menu-list">
          <li is="dynamic-frame" v-for="frame in siteFrames" v-bind:key="frame.name" v-bind:frame="frame"></li>
        </ul>
      </div>
      <div id="docList" class="field">
        <p class="menu-label has-text-black is-size-5">
          Documentation
        </p>
        <ul class="menu-list">
          <li is="dynamic-frame" v-for="frame in docFrames" v-bind:key="frame.name" v-bind:frame="frame"></li>
        </ul>
      </div>
    </div>
  </aside>
</div>
`

var siteFrames = [];
var docFrames = [];

projects.forEach(function(obj){
  if(obj.href != null){
    siteFrames.push(obj);
  }
  if(obj.file != null){
    docFrames.push(obj);
  }
})

var sideBar = new Vue({
  data: { siteFrames: siteFrames, docFrames: docFrames, id: 'projectBar', isCollapsed: false},
  el: '#SideLeft',
  template: sideBarTemplate,
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
