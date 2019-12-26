
import Vue from 'vue'
import axios from 'axios'
import Service from '@/js/service/index'
import Utils from './utils/index'
import Config from './config/index'

import { formMixin } from '@/js/mixins/form'
// import paginationMixin from "@/js/mixins/paginationMixin";

const Log = function (info) {
  console.log(info)
}
export {
  Vue, axios, Log, Utils, Config, formMixin, Service
}
