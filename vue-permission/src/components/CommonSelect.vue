<template>
  <el-select v-model="selectValue"
             @change="change"
             :placeholder="placeholder"
             :clearable="clearable"
             :disabled="isDisabled">
    <el-option
      v-for="item in list"
      :key="item[keyField]"
      :label="item[showField]"
      :value="item[valField]">
      <slot></slot>
    </el-option>
  </el-select>
</template>
<!--
    <common-select
        key-field="prop"
        show-field="label"
        val-field="prop"
        :list="modelColumns"
        v-model="form.modelStatusName"/>

-->
<script>
  export default {
    name: 'CommonSelect',
    props: {
      value: {
        /*type: Array,*/
//        default: () => {
//          return [];
//        }
      },
      list: {
        type: Array,
        default: () => {
          return [];
        }
      },
      valField: {
        type: String,
        default: "value",
      },
      keyField: {
        type: String,
        default: "key",
      },
      showField: {
        type: String,
        default: "name",
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: "small"
      },
      clearable: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        selectValue: this.value,
      }
    },
    methods: {
      change() {
        //val = val ? val : this.selectValue;
        this.$emit('input',this.selectValue);
        this.$emit('change', this.selectValue);
      }
    },
    watch: {
      value (val) {
        this.selectValue = val;
      }
    }
  }
</script>
