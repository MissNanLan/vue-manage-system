<template>
  <div class="tag">
    <Tag
      type="dot"
      v-for="(tag, index) in tagList"
      :key="tag.routeName"
      :name="tag.routeName"
      @on-close="closePage(tag, index)"
      @click.native="linkTo(tag)"
      :closable="index !== 0"
      :color="tag.routeName === currentName ? 'primary' : 'default'"
      >{{ tag.menuName }}</Tag
    >
  </div>
</template>

<script>
import { openTag } from "@/utils";
export default {
  name: "TheTag",
  data() {
    return {
      currentName: this.$route.name
    };
  },

  computed: {
    tagList: function() {
      return this.$store.state.tagList;
    }
  },
  watch: {
    $route(to) {
      this.currentName = to.name;
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
        this.linkTo(_tagList[_tagList.length - 2]);
        this.currentName = _tagList[_tagList.length - 2].routeName;
        this.$store.commit("removeTag", tag);
        // 删除当前显示
      } else if (tag.routeName === this.currentName) {
        this.currentName = _tagList[index].routeName;
        this.linkTo(_tagList[index - 1]);
        this.$store.commit("removeTag", tag);
      } else {
        this.$store.commit("removeTag", tag);
      }
    },
    linkTo(tag) {
      this.$router.push(tag.path);
    }
  }
};
</script>

<style lang="less" scoped>
.tag {
  margin-bottom: 2px;
}
</style>
