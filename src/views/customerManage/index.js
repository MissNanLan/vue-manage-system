import BaseSearch from "@/components/base/BaseSearch.vue";
export default {
  name: "customerManage",
  components: {
    BaseSearch
  },
  data() {
    return {
      searchOptions: [
        {
          optionLabel: "用户名",
          optionName: "userName",
          type: "select"
        },
        {
          optionLabel: "客户",
          optionName: "customer",
          type: "select"
        },
        {
          optionLabel: "客户",
          optionName: "customer",
          type: "select"
        },
        {
          optionLabel: "客户",
          optionName: "customer",
          type: "select"
        },
        {
          optionLabel: "客户",
          optionName: "customer",
          type: "select"
        },
        {
          optionLabel: "客户",
          optionName: "customer",
          type: "select"
        },
        {
          optionLabel: "访问时间",
          optionName: "customer",
          type: "date"
        }
      ],

      columns2: [
        {
          title: "id",
          key: "id",
          width: 200,
          fixed: "left",
        },
        {
          title: "用户",
          key: "user",
          width: 100
        },
        {
          title: "客户",
          key: "customer",
          width: 200
        },
        {
          title: "每日请求上限",
          key: "limited",
          width: 200
        },
        {
          title: "appkey",
          key: "appkey",
          width: 400
        },
        {
          title: "操作",
          key: "action",
          width: 260,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "查看秘钥"
              )
            ]);
          }
        }
      ],
      data4: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          province: "America",
          city: "New York",
          zip: 100000
        },
        {
          name: "Jim Green",
          age: 24,
          address: "Washington, D.C. No. 1 Lake Park",
          province: "America",
          city: "Washington, D.C.",
          zip: 100000
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          province: "Australian",
          city: "Sydney",
          zip: 100000
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          province: "Canada",
          city: "Ottawa",
          zip: 100000
        },
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          province: "America",
          city: "New York",
          zip: 100000
        },
        {
          name: "Jim Green",
          age: 24,
          address: "Washington, D.C. No. 1 Lake Park",
          province: "America",
          city: "Washington, D.C.",
          zip: 100000
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          province: "Australian",
          city: "Sydney",
          zip: 100000
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          province: "Canada",
          city: "Ottawa",
          zip: 100000
        }
      ]
    };
  }
};
