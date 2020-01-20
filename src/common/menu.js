
import authority from './authority'
import store from "@/store";

export default {
    menus: {
        'demo': {
            index: 0,
            icon: 'ios-podium-outline',
            title: 'DEMO'
        }
    },
    getMenuByAuthority: function () {
        var user = store.getters.getUserInfo
        if (!user) {
            return
        }
        var list = []
        if (user.permissions) {
            user.permissions.forEach(per => {
                if (!authority.list[per]) {
                    console.warn('Permission not found : ' + per)
                } else {
                    list = list.concat(authority.list[per])
                }
            });
            var result = []
            list.forEach(name => {
                if (this.menus[name]) {
                    this.menus[name].name = name
                    result.push(this.menus[name])
                } else {
                    console.warn('Page not found : ' + name)
                }
            });
            return result
        } else {
            console.warn('no permissions please setup in db')
            return []
        }
    },
    setSubMenu: function (menus, name) {
        var menu = this.menus[name]
        if (menu && menu.hasSubs) {
            if (!menu.subs) {
                menu.subs = []
            }
            menu.subs = menus
        }
    },
    addSubMenu: function (menus, name) {
        var menu = this.menus[name]
        if (menu && menu.hasSubs) {
            if (!menu.subs) {
                menu.subs = []
            }
            menu.subs = menu.subs.concat(menus)
        }
    }
}
