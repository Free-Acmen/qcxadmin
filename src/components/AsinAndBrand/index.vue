<template>
	<div class="asinandbradn">
		<span class="Asin" :title="Asin" @click.right.prevent="copyHandle(Asin)"  @click="Jumpamason(Asin,Location)">{{Asin}}</span>
		<span class="Brand" :title="Brand" @click.right.prevent="copyHandle(Brand)" @click="CheckBrand(Brand)">
			<i v-if="IsRegister == 1">®</i>
			{{Brand}}
		</span>
	</div>
</template>

<script>
//import Clipboard from 'vue-clipboard2';
import { mapGetters } from 'vuex'

let filterObj = {
  "&quot;": "\\",
  "&#34;": "\\",
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&nbsp;": " ",
  "&#160;": " ",
  "&iexcl;": "?",
  "&#161;": "?",
  "&cent;": "￠",
  "&#162;": "￠",
  "&pound;": "￡",
  "&#163;": "￡",
  "&curren;": "¤",
  "&#164;": "¤",
  "&yen;": "￥",
  "&#165;": "￥",
  "&brvbar;": "|",
  "&#166;": "|",
  "&sect;": "§",
  "&#167;": "§",
  "&uml;": "¨",
  "&#168;": "¨",
  "&copy;": "?",
  "&#169;": "?",
  "&ordf;": "a",
  "&#170;": "a",
  "&laquo;": "?",
  "&#171;": "?",
  "&not;": "?",
  "&#172;": "?",
  "&shy;": "\\x7f",
  "&#173;": "\\x7f",
  "&reg;": "?",
  "&#174;": "?",
  "&macr;": "ˉ",
  "&#175;": "ˉ",
  "&deg;": "°",
  "&#176;": "°",
  "&plusmn;": "±",
  "&#177;": "±",
  "&sup2;": "2",
  "&#178;": "2",
  "&sup3;": "3",
  "&#179;": "3",
  "&acute;": "′",
  "&#180;": "′",
  "&micro;": "μ",
  "&#181;": "μ",
  "&para;": "?",
  "&#182;": "?",
  "&middot;": "·",
  "&#183;": "·",
  "&cedil;": "?",
  "&#184;": "?",
  "&sup1;": "1",
  "&#185;": "1",
  "&ordm;": "o",
  "&#186;": "o",
  "&raquo;": "?",
  "&#187;": "?",
  "&frac14;": "?",
  "&#188;": "?",
  "&frac12;": "?",
  "&#189;": "?",
  "&frac34;": "?",
  "&#190;": "?",
  "&iquest;": "?",
  "&#191;": "?",
  "&Agrave;": "à",
  "&#192;": "à",
  "&Aacute;": "á",
  "&#193;": "á",
  "&circ;": "?",
  "&#194;": "?",
  "&Atilde;": "?",
  "&#195;": "?",
  "&Auml;": "?",
  "&#196;": "?",
  "&ring;": "?",
  "&#197;": "?",
  "&AElig;": "?",
  "&#198;": "?",
  "&Ccedil;": "?",
  "&#199;": "?",
  "&Egrave;": "è",
  "&#200;": "è",
  "&Eacute;": "é",
  "&#201;": "é",
  "&Ecirc;": "ê",
  "&#202;": "ê",
  "&Euml;": "?",
  "&#203;": "?",
  "&Igrave;": "ì",
  "&#204;": "ì",
  "&Iacute;": "í",
  "&#205;": "í",
  "&Icirc;": "?",
  "&#206;": "?",
  "&Iuml;": "?",
  "&#207;": "?",
  "&ETH;": "D",
  "&#208;": "D",
  "&Ntilde;": "?",
  "&#209;": "?",
  "&Ograve;": "ò",
  "&#210;": "ò",
  "&Oacute;": "ó",
  "&#211;": "ó",
  "&Ocirc;": "?",
  "&#212;": "?",
  "&Otilde;": "?",
  "&#213;": "?",
  "&Ouml;": "?",
  "&#214;": "?",
  "&times;": "×",
  "&#215;": "×",
  "&Oslash;": "?",
  "&#216;": "?",
  "&Ugrave;": "ù",
  "&#217;": "ù",
  "&Uacute;": "ú",
  "&#218;": "ú",
  "&Ucirc;": "?",
  "&#219;": "?",
  "&Uuml;": "ü",
  "&#220;": "ü",
  "&Yacute;": "Y",
  "&#221;": "Y",
  "&THORN;": "T",
  "&#222;": "T",
  "&szlig;": "?",
  "&#223;": "?",
  "&agrave;": "à",
  "&#224;": "à",
  "&aacute;": "á",
  "&#225;": "á",
  "&acirc;": "a",
  "&#226;": "a",
  "&atilde;": "?",
  "&#227;": "?",
  "&auml;": "?",
  "&#228;": "?",
  "&aring;": "?",
  "&#229;": "?",
  "&aelig;": "?",
  "&#230;": "?",
  "&ccedil;": "?",
  "&#231;": "?",
  "&egrave;": "è",
  "&#232;": "è",
  "&eacute;": "é",
  "&#233;": "é",
  "&ecirc;": "ê",
  "&#234;": "ê",
  "&euml;": "?",
  "&#235;": "?",
  "&igrave;": "ì",
  "&#236;": "ì",
  "&iacute;": "í",
  "&#237;": "í",
  "&icirc;": "?",
  "&#238;": "?",
  "&iuml;": "?",
  "&#239;": "?",
  "&ieth;": "e",
  "&#240;": "e",
  "&ntilde;": "?",
  "&#241;": "?",
  "&ograve;": "ò",
  "&#242;": "ò",
  "&oacute;": "ó",
  "&#243;": "ó",
  "&ocirc;": "?",
  "&#244;": "?",
  "&otilde;": "?",
  "&#245;": "?",
  "&ouml;": "?",
  "&#246;": "?",
  "&divide;": "÷",
  "&#247;": "÷",
  "&oslash;": "?",
  "&#248;": "?",
  "&ugrave;": "ù",
  "&#249;": "ù",
  "&uacute;": "ú",
  "&#250;": "ú",
  "&ucirc;": "?",
  "&#251;": "?",
  "&uuml;": "ü",
  "&#252;": "ü",
  "&yacute;": "y",
  "&#253;": "y",
  "&thorn;": "t",
  "&#254;": "t",
  "&yuml;": "?",
  "&#255;": "?",
}

export default {
  name: 'AsinAndBrand',
  data() {
    return {
    	// brandlist:{
    	// 	UK:'https://www.amazon.co.uk/',//英国
    	// 	US:'https://www.amazon.com/',//美国
    	// 	DE:'https://www.amazon.de/',//德国
    	// 	FR:'https://www.amazon.fr/',//法国
    	// 	IT:'https://www.amazon.it/',//意大利
    	// 	ES:'https://www.amazon.es/',//西班牙
    	// 	JP:'https://www.amazon.co.jp/',//日本
    	// 	CA:'https://www.amazon.ca/',//加拿大
    	// 	MX:'https://www.amazon.com.mx/',//墨西哥
    	// }
    }
  },
  computed: {
    ...mapGetters(['siteUrl'])
  },
  mounted() {
  },
  props: ['Location', 'Asin', 'Brand', 'IsRegister'],
  methods: {
    copyHandle: function(data){
      this.CFunc.copyData(data)
    },
  	Jumpamason:function(asin,location){
  		var url = this.siteUrl[location]+'/dp/'+asin
  		window.open(url,'_blank')
  	},
  	CheckBrand:function(brand){
      // brand= "df&#247;dfdf&quot;&#34;dfdfdf&iuml;dfdf"
      brand = this.filterBrand(brand)
      // console.log(brand)
      var url = 'https://www.wipo.int/branddb/en/index.jsp?q={"searches":[{"te":"BRAND:'+brand+'"}]}'
  		window.open(url,'_blank')
    },
    filterBrand: function(brand){
      let flerBrand = brand
      Object.keys(filterObj).forEach( key => {
        let regxp = new RegExp(key, 'ig')
        flerBrand = flerBrand.replace(regxp, filterObj[key])
      })
      return flerBrand
    }
  }
}
</script>
<style scoped lang="scss">
	.asinandbradn{
		width: 80%;
    vertical-align:middle;
    position: relative;
		span{
			display: block;
			cursor: pointer;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
		}
		.Asin{
			color: rgb(64, 158, 255);
		}
		.Brand{
			color: rgb(103, 194, 58);
			i{
				font-size: 16px;
		    color: red;
		    margin-right: 5px;
			}
    }
    .copy{
      position: absolute;
      top: 0;
      right: -24px;
      color: #fff;
      background: rgb(64, 158, 255);
      border-radius: 3px;
      padding: 0 3px;
    }
	}
</style>