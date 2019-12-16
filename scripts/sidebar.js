Vue.component('dynamic-frame',{
  template: `
  <div v-bind:id="frame.name" v-bind:class="{'fullheight': isActive, 'is-fullwidth': isActive, 'iframe-container': isActive}" @click="openFrame">
    <a v-bind:class="{'is-hidden': isActive}">
      <div v-bind:class="{'add-border': !isActive, 'box': !isActive}">
        <figure name="smallFrame" v-bind:class="{'is-16by9': !isActive, 'image': !isFrame}">
          <img v-bind:src="frame.image" v-bind:alt="frame.name" v-bind:class="{'is-hidden': isFrame}"></img>
          <iframe class="scrollbar-warning" v-bind:class="{'is-hidden': !isFrame}" allowfullscreen>
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
    frame: Object,
    parent: null
  },
  data: function(){
    return {isActive: false, isFrame: false}
  },
  methods: {
    openFrame: function(){
      // Element can be accessed with this.$el
      // With openFrame we move this element to the center div
      el = this.$el;
      document.getElementById('Center').append(el);
      iframe = el.getElementsByTagName('iframe')[0];
      if(!this.isFrame){
        console.log("checking parent", this.parent);
        if (this.parent == "#siteList")
          iframe.src = this.frame.href;
        else if (this.parent == "#docList") {
          iframe.src = this.frame.file;
        }
      }
      this.isActive = true;
      this.isFrame = true;
      el.append(iframe);
    },
    closeFrame: function(){
      // return element to the sideBar
      document.getElementById(this.parent).append(this.$el);
      iframe = this.$el.getElementsByTagName('iframe')[0];

      this.$el.getElementsByTagName('smallFrame')[0].append(iframe);

    }
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
          <li is="dynamic-frame" v-for="frame in siteFrames" v-bind:key="frame.name" v-bind:frame="frame" v-bind:parent="'#siteList'"></li>
        </ul>
      </div>
      <div id="docList" class="field">
        <p class="menu-label has-text-black is-size-5">
          Documentation
        </p>
        <ul class="menu-list">
          <li is="dynamic-frame" v-for="frame in docFrames" v-bind:key="frame.name" v-bind:frame="frame" v-bind:parent="'#docList'"></li>
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
