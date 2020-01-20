/** 
* param: objs 
* example 
* { 
*   'portDistrict': '港区', 
*   'plateNumber': '车辆', 
*   'doorAddress': '门点地址' 
* } 
* param: styleObjs
* example 
* { 
*   width: '地图窗口宽度', //默认100%; 
*   height: '地图窗口高度' //默认500px; 
* } 
*/
<template>
    <div :id="id" :style="styles"></div>
</template>
<script>
import { ajax_get } from '@/common/axios';
import truckImg from '@/images/icon_back_car.png';
export default {
    name: 'MyComponent',
    props: {
        params: {
            type: Object,
            default() {
                return {
                    plateNumber: '',
                    portDistrict: '',
                    doorAddress: '',
                    doorLocation: {},
                    captcha: ''
                };
            }
        },
        styles: {
            type: Object,
            default() {
                return {
                    width: '100%',
                    height: '500px'
                };
            }
        },
        zhiyunApi: {
            type: String,
            default: '/ws-truck/zhiyun/api/findCarNo'
        }
    },
    created() {
        this.id = `container-${new Date().getTime()}`;
        this.$nextTick(this.addMapApi);
    },
    mounted() {
        // this.$nextTick(() => {
        //     if (window.sessionStorage.getItem('plateNumber')) {
        //         this.getTruckPosition(
        //             window.sessionStorage.getItem('plateNumber')
        //         );
        //     }
        // });
    },
    data() {
        return {
            // 地图实例容器id
            id: '',
            // 地图实例
            map: {},
            // Driving实例
            driving: {},
            // Geocoder实例
            geocoder: {},
            // 车辆位置请求response
            truckPositionRes: {},
            // 车辆位置
            truckPosition: [],
            // 驾车路径规划实例
            driving: {},
            // 地理编码实例
            geocoder: {},
            // 距离港区距离
            distanceToPortDistrict: 0,
            // 距离门点距离
            distanceToDoor: 0
        };
    },
    watch: {
        params() {
            this.resetMap();
            this.getTruckPosition(this.params.plateNumber);
        }
    },
    methods: {
        // 加载高德地图
        addMapApi() {
            let amapScript = document.createElement('script');
            amapScript.type = 'text/javascript';
            amapScript.src = '//webapi.amap.com/maps?v=1.4.2&key=47be8e6664c78cfdbc3a8172cbcb1106&callback=initMap';
            document.head.appendChild(amapScript);
            // 回调初始化地图
            window.initMap = () => {
                this.map = new AMap.Map(this.id, {
                    resizeEnable: true,
                    zoom: 10
                });
                AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
                    this.map.addControl(new AMap.ToolBar());
                    this.map.addControl(new AMap.Scale());
                });
                AMap.service('AMap.Driving', () => {
                    //实例化Driving
                    this.driving = new AMap.Driving({
                        map: this.map,
                        // city: '上海'
                    });
                });
                AMap.service('AMap.Geocoder', () => {
                    //实例化Geocoder
                    this.geocoder = new AMap.Geocoder({
                        map: this.map
                    });
                });
            };
        },
        // 重置地图
        resetMap() {
            this.map = new AMap.Map(this.id, {
                resizeEnable: true,
                zoom: 10
            });
            AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], () => {
                this.map.addControl(new AMap.ToolBar());
                this.map.addControl(new AMap.Scale());
            });
        },
        // 获取车辆位置
        getTruckPosition(plateNumber) {
            if (!plateNumber) {
                this.$Message.error('车辆为空');
                return;
            }
            let req = { vclN: plateNumber.trim() || '' };
            if (this.zhiyunApi === '/ws-truck/zhiyun/lastLocation/get') {
                req = {
                    plateNumber: plateNumber.trim() || '',
                    captcha: this.params.captcha
                };
            }
            ajax_get(this, this.zhiyunApi, req, res => {
                    if (res.data.hasOwnProperty('validated')) {
                        if (!res.data.validated) {
                            this.$emit('validateRequired');
                            return;
                        }
                    }
                    if (!res.data.success) {
                        this.$Message.error({
                            content: '该车辆北斗设备不在线，无法查询当前位置',
                            duration: 3
                        });
                        return;
                    }
                    // 车辆位置
                    // this.truckPosition = [parseFloat(res.data.carInfo.lon / 600000).toFixed(6), parseFloat(res.data.carInfo.lat / 600000).toFixed(6)];
                    this.truckPositionRes = res.data.carInfo;

                    //gps转高德坐标系
                    let script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = 'https://restapi.amap.com/v3/assistant/coordinate/convert?key=033511aad9952ba03f56d69e8c21dd2f&locations='+parseFloat(res.data.carInfo.lon / 600000).toFixed(6)+','+parseFloat(res.data.carInfo.lat / 600000).toFixed(6)+'&coordsys=gps&callback=getGaoDePointCallBack'
                    document.head.appendChild(script);
                    window.getGaoDePointCallBack = callBackRes => {
                        if(callBackRes.status=='1'){
                            this.truckPosition = [callBackRes.locations.split(',')[0], callBackRes.locations.split(',')[1]];
                            this.markTruck(this.truckPosition, this.truckPositionRes);
                            this.getPortDistrictPosition(this.params.portDistrict);
                        }
                    }

                    // this.markTruck(this.truckPosition, this.truckPositionRes);
                    // this.getPortDistrictPosition(this.params.portDistrict);
                });
        },
        // 标记车辆
        markTruck(truckPostion, carInfo) {
            // this.map.setCenter(truckPostion);
            const truckMarker = new AMap.Marker({
                position: truckPostion,
                map: this.map,
                icon: truckImg,
                angle: parseInt(carInfo.drc) + 180
            });
            this.map.setFitView();
        },
        // 构建信息窗体
        createInfoWindow(truckPostion, carInfo, distanceToPortDistrict, distanceToDoor) {
            //构建信息窗体中显示的内容
            let info = [];
            info.push(`<p>车辆：${this.params.plateNumber}</p>`);
            info.push(`<p>时间：${new Date(parseInt(carInfo.utc))}</p>`);
            info.push(`<p>速度：${carInfo.spd}km/h</p>`);
            info.push(`<p>方向：${carInfo.direction}</p>`);
            info.push(`<p>位置：${carInfo.adr.split('，')[0]}</p>`);
            if (distanceToPortDistrict) {
                info.push(`<p>港区距离：${distanceToPortDistrict / 1000}km</p>`);
            }
            if (distanceToDoor) {
                info.push(`<p>门点距离：${distanceToDoor / 1000}km</p>`);
            }
            const infoWindow = new AMap.InfoWindow({
                content: info.join('') //使用默认信息窗体框样式，显示信息内容
            });
            infoWindow.open(this.map, truckPostion);
        },
        // 获取港区位置
        getPortDistrictPosition(portDistrict) {
            if (!portDistrict) {
                this.getDoorPosition(this.params.doorAddress);
                return;
            }
            // add location for port district
            ajax_get(this, '/ws-truck/zhiyun/api/convertPoint', { portDistrict: portDistrict.trim() }, res => {
                if (res.data.success) {
                    const portDistrictPosition = [res.data.carInfo.lon, res.data.carInfo.lat];
                    this.markPortDistrict(portDistrictPosition);
                    this.calculateDistanceToPortDistrict(portDistrictPosition);
                }
            });
        },
        // 标记港区
        markPortDistrict(portDistrictPosition) {
            const portDistrictMarker = new AMap.Marker({
                position: portDistrictPosition,
                map: this.map
            });
            const portDistrictText = new AMap.Text({
                text: this.params.portDistrict,
                position: portDistrictPosition,
                map: this.map,
                offset: new AMap.Pixel(0, 15)
            });
            this.map.setFitView();
        },
        // 计算到港区距离
        calculateDistanceToPortDistrict(portDistrictPosition) {
            this.driving.search(this.truckPosition, portDistrictPosition, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    this.distanceToPortDistrict = result.routes[0].distance;
                    this.getDoorPosition(this.params.doorAddress);
                } else {
                    console.error(result);
                }
            });
        },
        // 获取门点位置
        getDoorPosition(doorAddress) {
            if (!doorAddress) {
                this.createInfoWindow(this.truckPosition, this.truckPositionRes, this.distanceToPortDistrict);
                return;
            }
            this.geocoder.getLocation(doorAddress, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    let doorPosition = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];
                    if (this.params.doorLocation.lng) {
                        doorPosition = [this.params.doorLocation.lng, this.params.doorLocation.lat];
                    }
                    this.calculateDistanceToDoor(doorPosition);
                    this.markDoor(doorPosition);
                } else {
                    console.error(result);
                }
            });
        },
        // 计算到门点距离
        calculateDistanceToDoor(doorPosition) {
            this.driving.search(this.truckPosition, doorPosition, (status, result) => {
                if (status === 'complete' && result.info === 'OK') {
                    const distanceToDoor = result.routes[0].distance;
                    this.createInfoWindow(this.truckPosition, this.truckPositionRes, this.distanceToPortDistrict, distanceToDoor);
                } else {
                    console.error(result);
                }
            });
        },
        // 标记门点
        markDoor(doorPosition) {
            const doorMarker = new AMap.Marker({
                position: doorPosition,
                map: this.map
            });
            const doorText = new AMap.Text({
                text: this.params.doorAddress,
                position: doorPosition,
                map: this.map,
                offset: new AMap.Pixel(0, 15)
            });
            this.map.setFitView();
        }
    }
};
</script>

<style lang='less' scoped>

</style>
