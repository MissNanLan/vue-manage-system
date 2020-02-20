<template>
  <div class="customer-manage">
    <BaseSearch v-bind:searchOptions="searchOptions"></BaseSearch>
    <div class="customer-manage__table">
      <Table border :columns="columns2" :data="data4"></Table>
    </div>
    <div class="customer-manage__page">
      <Page :total="40" size="small" show-elevator show-sizer />
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="less">
@import "./index.less";
</style>
