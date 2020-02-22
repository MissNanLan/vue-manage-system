<template>
  <div class="tag">
    <el-tag
      class="tag__item"
      v-for="(tag, index) in tagList"
      :key="tag.path"
      :type="currentPath == tag.path ? '' : 'info'"
      @click="navigateTo(tag.path)"
      @close="closePage(tag, index)"
      effect="plain"
      closable
    >
      {{ tag.meta.title }}
    </el-tag>
  </div>
</template>

<script>
import { openTag } from "@/utils";
export default {
  name: "TheTag",
  data() {
    return {
      currentPath: this.$route.path
    };
  },

  computed: {
    tagList: function() {
      return this.$store.state.tagList;
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.currentPath = route.path;
        console.log(this.currentPath);
      }
    }
  },
  mounted() {
    openTag(this, this.currentName);
  },
  methods: {
    closePage(tag, index) {
      let _tagList = this.$store.state.tagList;
      // 假设从最后一个高亮的位置删除
      if (index == _tagList.length - 1) {
        this.navigateTo(_tagList[_tagList.length - 2]);
        this.currentName = _tagList[_tagList.length - 2].routeName;
        this.$store.commit("removeTag", tag);
        // 删除当前显示
      } else if (tag.routeName === this.currentName) {
        this.currentName = _tagList[index].routeName;
        this.navigateTo(_tagList[index - 1]);
        this.$store.commit("removeTag", tag);
      } else {
        this.$store.commit("removeTag", tag);
      }
    },

    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/less/index.less";
.tag {
  &__item {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
