<template>
  <div class="content">
    <h2>CAMPAIGN MANAGEMENT</h2>
    <v-layout row>
      <v-flex md8 xs12>
        <ul class="tabs group">
          <template v-for="(tab, index) in tabItems">
          <li v-if="tab.requires.includes(user)"  :key="index" @click="currentTab=tab.name">
            <a :class="{ active: tab.name === currentTab}"><v-icon>{{tab.icon}}</v-icon>{{tab.name}}</a>
          </li>
          </template>
        </ul>
      </v-flex>
      <v-flex md5 xs12>
        <call-campaign-function v-show="currentTab=='Call Campaign'"/>
        <promotion-function v-show="currentTab=='Promotion'"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CallCampaignFunction from "@/components/MarketingComponents/CampaignComponents/CallCampaign/CallCampaignFunction.vue"
import PromotionFunction from "@/components/MarketingComponents/CampaignComponents/Promotion/PromotionFunction.vue"
import { ProfileService } from '../../../services/storage.service'

export default {
  name: "campaign-management",
  props: {
    value: String,
    tabItems: Array,
  },
  data() {
    return {
      user: ProfileService.getIsStaff() ? 'staff' : 'user',
    }
  },
  components: {
    CallCampaignFunction,
    PromotionFunction,
  },
  computed: {
    currentTab: {
      get () {return this.value},
      set (value) {this.$emit('input', value)}
    },
  },
}
</script>

<style scoped>
ul.tabs {
	height: 60px;
	margin: 0 auto;
	list-style: none;
	overflow: hidden;
  padding: 0;
}
ul.tabs li {	
	float: left;
	width: 225px;
}
ul.tabs li a {
	position: relative;
	display: block;
	height: 60px;
	margin-top: 10px;
	padding: 10px 0 0 0;
	font: Bold 18px/23px Source Sans Pro;
	text-align: center;	
	text-decoration: none;
	color: #B3B8BC;
	background: #E1E4E6;
	-webkit-box-shadow: 4px 3px 8px 0px rgba(0,0,0,0.4);
	-moz-box-shadow: 4px 3px 8px 0px rgba(0,0,0,0.4);
	box-shadow: 4px 3px 8px 0px rgba(0,0,0,0.4);
	border: 0px solid #000000;
	-webkit-transition: padding 0.2s ease, margin 0.2s ease;
  -moz-transition: padding 0.2s ease, margin 0.2s ease;
  -o-transition: padding 0.2s ease, margin 0.2s ease;
  -ms-transition: padding 0.2s ease, margin 0.2s ease;
  transition: padding 0.2s ease, margin 0.2s ease;
}
.tabs li:first-child a {
	z-index: 2;
  -webkit-border-top-left-radius: 15px;
  -moz-border-radius-topleft: 15px;
  border-top-left-radius: 15px;
}
.tabs li:nth-child(2) a {
	z-index: 2;
}
.tabs li:last-child a {
	z-index: 1;
  -webkit-box-shadow: 2px 8px 25px -2px rgba(0,0,0,0.3);
	-moz-box-shadow: 2px 8px 25px -2px rgba(0,0,0,0.3);
	box-shadow: 2px 8px 25px -2px rgba(0,0,0,0.3);
  -webkit-border-top-right-radius: 15px;
  -moz-border-radius-topright: 15px;
  border-top-right-radius: 15px;
}
ul.tabs li a:hover {
	margin: 3px 0 0 0;
	padding: 10px 0 5px 0;
  color: #B9344D;
  background-color: #fff;
}

ul.tabs li a:hover >>> .v-icon {
  color: #B9344D !important;
}

ul.tabs li a.active {
	margin: 3px 0 0 0;
	padding: 10px 0 10px 0;
	background: #fff;
	color: #B9344D;
	/*color: #ff6831;*/
	z-index: 4;
	outline: none;
}

ul.tabs li a.active >>> .v-icon {
  color: #B9344D !important;
}

.group:before,
.group:after {
  content: " "; /* 1 */
  display: table; /* 2 */
}
.group:after {
    clear: both;
}
</style>