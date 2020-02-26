<template>
  <div :class="[className]">
    <input class="ty-ipt" 
      type="text" 
      :disabled="disabled"
      :readonly="readonly"
      :value="currentValue"
      @focus="handleFocus"
      @blur="handleBlur"

      @input="handleInput"
      @change="handleChange" 
      @keydown="handleKeydown" 
    />
  </div>
</template>

<script>
export default {
  data() {
    let currentValue = 0 ;
    if(this.value > this.max){
      currentValue = this.max ;    
    } else if(this.value < this.min){
      currentValue = this.min ;    
    } else{
      currentValue = this.value;
    }

    return {
      currentValue :currentValue 
    }
  },
  props:{
    tyclass: {
      type:String,
      default: ''
    },
    disabled: Boolean,
    readonly: Boolean,
    max:{
      type:Number,
      default:Infinity
    },
    min:{
      type:Number,
      default:-Infinity
    },
    value:{
      default:0
    },
    step:{
      type:Number,
      default:1
    },
    precision:{
      type:Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      },
      default:2
    }
  },
  computed: {
    className(){
      return 'ty-numb-ipt ' + this.tyclass
    }
  },
  watch:{
    // 增加监听
    currentValue:function(val){
      this.$emit('input', val);
      this.$emit('change', val);
    },
    value:function(val){
      this.updateVal(val);
    }
  },
  methods:{
    handleInput:function(event){
      this.$emit('input', event.target.value);
    },
    handleFocus: function(event){
      this.$emit('focus', event);
    },
    handleBlur: function(event){
      this.$emit('blur', event);
    },
    handleChange:function(event){
      var val = event.target.value.trim();
      if(this.isValueNumber(val)){
        var max = this.max ;
        var min = this.min ;
        val = Number(val);
        this.currentValue = this.toPrecision(val, this.precision);
        if(val>max) this.currentValue = max ;
        if(val<min) this.currentValue = min ;
      }else{
        this.currentValue = '';
      }
    },
    // 绑定键盘事件
    handleKeydown:function(event){
      if(event.keyCode==38){
        this.handleAdd();
      }
      if(event.keyCode==40){
        this.handleReduce();
      }
    },    
    handleAdd:function(){
      if(this.currentValue>=this.max) return ;
      this.currentValue = Number(this.currentValue) + this.step ;
    },
    handleReduce:function(){
      if(this.currentValue<=this.min) return ;
      this.currentValue -= this.step;
    },
    updateVal:function(val){
      if(val>this.max) val = this.max ;
      if(val<this.min) val = this.min ;
      this.currentValue = val;
    },
    isValueNumber(value){
      return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value);
    },
    toPrecision(num, precision) {
      // if (precision === undefined) precision = this.numPrecision;
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision))
    }
  }
}
</script>

<style scoped lang="scss">
  .ty-numb-ipt{
    display: inline-block;
    width: 100%;
    .ty-ipt{
      display: inline-block;
      width: 100%;
      height: 32px;
      line-height: 32px;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      font-size: inherit;
      outline: 0;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      font-size: 13px;
      &:hover {
        border-color: #c0c4cc;
      }
      &:focus {
        border-color: #409EFF;
        outline: 0;
      }
    }
  }
</style>
