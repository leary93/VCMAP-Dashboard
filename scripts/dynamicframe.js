Vue.component('dynamic-frame', {
  template:
  `<div v-bind:id="frame.name" v-bind:class="{'column is-one-third is-centered': home}">
    <a>
      <div class="add-border box">
        <figure class="is-16by9 image">
          <img v-bind:src="frame.image" v-bind:alt="frame.name"></img>
        </figure>
        <div class="field has-addons">
          <p class="control">
            <button class="infobutton button is-transparent"><i class="fas fa-tasks"></i></button>
          </p>
          <p class="control" v-if="frame.href != null">
            <button class="infobutton button is-transparent" @click="openNew"><i class="fas fa-globe-europe"></i></button>
          </p>
          <p class="control is-expanded">
            <button class="is-fullwidth button has-text-centered has-text-weight-semibold is-radiusless is-paddingless"> {{ frame.name }} </button>
          </p>
          <p class="control" v-if="frame.file != null">
            <button class="infobutton button is-transparent"><i class="fas fa-info-circle"></i></button>
          </p>
          <p class="control">
            <button class="infobutton button is-transparent"><i class="fas fa-edit"></i></button>
          </p>
        </div>
      </div>
    </a>
  </div>
  `,
  props: {
    frame: Object,
    home: false
  },
  methods:{
    openNew: function(){
      window.open(this.frame.href, '_blank');
    }
  }
})
