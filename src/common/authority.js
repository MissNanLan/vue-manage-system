
export default {
    list: {
        'NO_AUTH': ['login'], // 非校验页面
        "TP_ACCOUNT": ['demo'], //DEMO 权限
    },
    hasPermission: function (per, name) {
        var found = false
        Object.keys(this.list).forEach(key => {
            if (key == per && list[key].indexOf(name) >= 0) {
                found = true
                return false
            }
        })
        return found
    }
}
