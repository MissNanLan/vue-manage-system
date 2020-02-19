<script>
// 这里是一个怎么自定义组件的demo
export default {
   functional: true,
   props: {

   },
   render(h,context){
       const {props,scopedSlots} = context;
       return  props ? scopedSlots.default():null
   }
}
</script>