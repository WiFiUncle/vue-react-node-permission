
import Vue from 'vue'

import axios from 'axios'
// import service from "./request";
import Service from '@/js/service/index'
import Utils from './utils'
import Config from './config/index'

import { formMixin } from '@/js/mixins/form'
// import paginationMixin from "@/js/mixins/paginationMixin";

const Log = function (info) {
  console.log(info)
}
export {
  Vue, axios, Log, Utils, Config, formMixin, Service
}
