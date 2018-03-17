<style scoped>
  *{
    box-sizing: border-box;
    padding:0;
    margin:0;
  }
  ol, ul{
    list-style: none;
  }
  #window{
    position:relative;
    width:600px;
    height:400px;
    margin:0 auto;
    overflow:hidden;
  }
  .box{
    display:flex;
    position:absolute;
    top:0;
    left:0;
    transform-style:preserve-3d;
    -webkit-transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
  .test{
    transition:transform 0s;
  }
  .box li{
    width:600px;
    height:400px;
    background-color:#ddd;
  }
  .arrows{
  }
  .arrowWrapper{
    display:flex;
    justify-content: center;
    align-items:center;
    position:absolute;
    top:50%;
    width:38px;
    height:38px;
    background-color:rgba(0,0,0,.2);
    border-radius:50%;
    cursor:pointer;
  }
  .arrow-left{
    left:2%;
    transform:translateY(-50%);
  }
  .arrow-right{
    right:2%;
    transform:translateY(-50%);
  }
  .dots{
    position:absolute;
    bottom:10px;
    left:50%;
    transform:translateX(-50%);
  }
  .dots li{
    display:inline-block;
    width:15px;
    height:15px;
    margin:0 3px;
    border:1px solid white;
    border-radius:50%;
    background-color:#333;
    cursor:pointer;
  }
  .dots .dotted{
    background-color:orange;
  }
</style>
<template>
<div>
<div id="window" @mouseover="stop" @mouseleave="goOnPlay">
  <ul class="box" :style="boxStyle">
    <li>
      <img :src="slides[slides.length - 1].img" alt="image">
    </li>
    <li v-for="(item, index) in slides" :key="index">
      <img :src="item.img" alt="image">
    </li>
    <li id="test">
      <img :src="slides[0].img" alt="image">
    </li>
  </ul>
  <ul class="arrows">
    <li class="arrowWrapper arrow-left" @click="move(600, 1)">
      <Icon type="arrow-left-c" size="18" color="white"></Icon>
    </li>
    <li class="arrowWrapper arrow-right" @click="move(-600, -1)">
      <Icon type="arrow-right-c" size="18" color="white"></Icon>    
    </li>
  </ul>
  <ul class="dots">
    <li v-for="(dot, i) in slides" :key="i" 
    :class="{dotted: i === (currentIndex-1)}"
    @click="jump(i+1)">
    </li>
  </ul>
</div>

</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      slides: [
        {
          img: '../../static/images/1.jpg'
        },
        {
          img: '../../static/images/2.jpg'
        },
        {
          img: '../../static/images/3.jpg'
        },
        {
          img: '../../static/images/4.jpg'
        },
        {
          img: '../../static/images/5.jpg'
        }
      ],
      transitionTime:0.5,
      currentIndex:1,
      width:600,
      distance:-600,
      transitionEnd:true
    }
  },
  computed:{
    boxStyle() {
      return {
        transform:`translate3d(${this.distance}px, 0, 0)`
      }
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
      this.autoPlay()
      window.onblur = this.stop
      window.onfocus = this.goOnPlay
    },
    move(n, direction) {
      if (!this.transitionEnd) return
      this.transitionEnd = false
      const willDistance = this.distance + n
      const animate = () =>  {
        if ((direction === -1 && this.distance > willDistance) || (direction === 1 && this.distance < willDistance) ){
          this.distance += 30 * direction          
          setTimeout(animate, 20)
        } else {
          this.transitionEnd = true
          this.distance = willDistance
          this.currentIndex++
          if (willDistance < -3000) {
            this.currentIndex = 1
            this.distance = -600
          }
          if (willDistance > -600) {
            this.currentIndex = 5
            this.distance = -3000
          }
        }
      }
      animate()     
    },
    autoPlay() {
      this.clock = setInterval(() => {
        this.move(-600, -1)
      }, 3000)
    },
    stop() {
      clearInterval(this.clock)
    },
    goOnPlay() {
      this.autoPlay()
    },
    jump(index) {
      console.log(index)
      const destination = index * -600
      console.log(destination)
      this.move(destination, -1)
      this.currentIndex = index
    },
    beforeDestroy() {
      clearInterval(this.clock)
    }
  }
}
</script>
     