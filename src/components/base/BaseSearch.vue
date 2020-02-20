<template>
  <div class="base-search">
    <div
      class="base-search__item"
      v-for="option in searchOptions"
      :key="option.id"
    >
      <template v-if="option.type == 'select'">
        <label class="base-search__item__label">{{ option.optionLabel }}</label>

        <Select style="width:200px" @on-change="handleSelect">
          <Option v-for="op in option.list" :value="op.value" :key="op.value">{{
            op.label
          }}</Option>
        </Select>
      </template>

      <template v-if="option.type == 'date'">
        <label class="base-search__item__label">{{ option.optionLabel }}</label>
        <DatePicker
          type="datetimerange"
          format="yyyy-MM-dd HH:mm"
          placeholder="请选择时间范围"
          style="width: 300px"
        ></DatePicker>
      </template>
    </div>
    <Button type="primary" class="base-search__btn" icon="ios-search"
      >搜索</Button
    >
    <Button type="default" class="base-search__btn" icon="ios-refresh"
      >重置</Button
    >
  </div>
</template>

<script>
export default {
  name: "BaseSearch",
  props: {
    searchOptions: {
      type: Array,
      default: () => [
        {
          optionLabel: "用户名",
          optionName: "userName",
          type: "select"
        }
      ]
    }
  },
  data() {
    return {
      searchItems: {}
    };
  },
  created() {
    // 这里调用接口
    let _userNameList = [
      {
        value: "1",
        label: "张三"
      },
      {
        value: "2",
        label: "张三"
      }
    ];
    let _customerList = [
      {
        value: "11",
        label: "李四"
      },
      {
        value: "22",
        label: "王五"
      }
    ];
    this.searchOptions.map(item => {
      console.log(`_${item.optionName}List`);
      /** todo: 这里有问题 */
      item["list"] = _userNameList;
    });
    console.log(_userNameList);
    console.log(_customerList);
  },
  methods: {
    handleSelect(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.border-bottom(@color:#e9eaec,@size:1px) {
  border-bottom: @size solid @color;
}

.base-search {
  .border-bottom();
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 14px 16px;

  &__item {
    margin-right: 10px;
    padding-top: 10px;

    &__label {
      padding-right: 10px;
      width: 70px;
      text-align: right;
      display: inline-block;
    }
  }

  &__btn {
    margin-top: 10px;
  }
}
</style>
