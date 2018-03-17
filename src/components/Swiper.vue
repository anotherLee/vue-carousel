<style>
.r-swiper{
    position:relative;
    overflow:hidden;
}
.indicator{
   position:absolute;
   right:3vw;
   bottom:3vw;
   width:10vw;
   height:10vw;
   line-height:10vw;
   border-radius:5vw;
   text-align:center;
   background-color:rgba(0,0,0,.5);
   color:#fff;
   font-size:14px;
}
</style>

<template>
  <div class="r-swiper" ref="swiper" :style="{height: _height}"
  @touchstart="moveStart"
  @touchmove="moving"
  @touchend="moveEnd">
      <slot></slot>
      <slot name="indicator">
          <div class="indicator">{{ (active + 1) + '/' + items.length }}</div>
      </slot>
  </div>
</template>

<script>
const each = function(arr, callback) {
    for (let i=0; i<arr.length; i++) {
        if (callback(arr[i], i) === false) break
    }        
}
export default {
    props: {
        height:{
            type: [Number, String],
            default: 'auto'
        }
    },
    data() {
        return {
            isInit: false,
            _width: 0,
            duration: 300,
            container: null,
            items: [],
            active: 0,
            start: {
                x: 0,
                y: 0
            },
            move: {
                x: 0,
                y: 0 
            }
        }
    },
    computed: {
        _height() {
            if (typeof this.height === 'number') {
                return this.height + 'px'
            } else {
                return this.height
            }
        }
    },
    methods: {
        init() {
            if (this.isInit) return
            this.isInit = true
            this.container = this.$refs.swiper
            this.items = this.container.querySelectorAll('.r-swiper-item')
            this.updateItemWidth()
            this.setTransform()
            this.setTransition('none')
        },
        updateItemWidth() {
            this._width = this.container.offsetWidth || document.documentElement.offsetWidth
        },
        setTransform(offset) {
            offset = offset || 0
            each(this.items, (item, i) => {
                let distance = (i - this.active) * this._width  + offset 
                let transform = `translate3d(${distance}px, 0, 0)`
                item.style.webkitTransform = transform
                item.style.transform = transform
            })
        },
        setTransition(duration) {
            duration = duration || this.duration
            duration = typeof duration === 'number' ? (duration + 'ms') : duration
            each(this.items, item => {
                item.style.webkitTransition = duration
                item.style.transition = duration
            })
        },
        moveStart(e) {},
        moving(e) {},
        moveEnd(e) {},
        destroy () {
            this.removeEvent()
        }
    }
}
</script>


