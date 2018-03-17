// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button, ButtonGroup, Icon, Rate, Radio, Carousel, CarouselItem } from 'iview'

import 'iview/dist/styles/iview.css';


Vue.component('Button', Button)
Vue.component('Icon', Icon)
Vue.component('Rate', Rate)
Vue.component('ButtonGroup', ButtonGroup)
Vue.component('Radio', Radio)
Vue.component('Carousel', Carousel)
Vue.component('CarouselItem', CarouselItem)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
