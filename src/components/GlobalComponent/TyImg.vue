<template>
  <div @click="handleClick" class="ty-img" :style="{width:width, height: height}">
    <img v-if="lazy" v-lazy="imgSrc" :alt="alt" :style="{'object-fit':fit}">
    <img v-else :src="imgSrc" :alt="alt" :style="{'object-fit':fit}">
  </div>
</template>

<script>
export default {
  
  data() {
    let imgSrc = this.src 
    if(this.needJoin && imgSrc && imgSrc.indexOf('http') == -1){
      imgSrc = this.http + imgSrc.replace("/amzs", '')
    }
    return {
      imgSrc: imgSrc
    }
  },
  props: {
    http: {
      type: String,
      default: 'https://amzs.esells.cn/kz'
    },
    needJoin: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    fit: {
      type: String,
      default: 'contain'
    },
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    lazy: {
      type: Boolean,
      default: true
    }
  },
  watch:{
  	src: function(val){
  		let imgSrc = val 
	    if(this.needJoin && imgSrc && imgSrc.indexOf('http') == -1){
	      imgSrc = this.http + imgSrc.replace("/amzs", '')
	    }
	    this.imgSrc = imgSrc
  	}
  },
  methods: {
    handleClick(){
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
  .ty-img{
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>

