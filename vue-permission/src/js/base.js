
import Vue from 'vue'
import axios from 'axios'
import Service from '@/js/service/index'
import Utils from './utils/index'
import Config from './config/index'

import CommonMixins from '@/js/mixins/index'
// import paginationMixin from "@/js/mixins/paginationMixin";

const Log = function (info) {
  console.log(info)
}
export {
  Vue, axios, Log, Utils, Config, CommonMixins, Service
}
