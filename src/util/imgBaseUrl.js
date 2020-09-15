import Vue from 'vue'

export default () => {
    Vue.filter('imgBaseUrl', function (oImgData) {
        let url = Vue.axios.defaults.baseURL +'/' + (oImgData.image_url||oImgData.imageUrl);
        return url;
    })

    Vue.filter('imgList', function (aImgData, index) {
        let aUrl = [];
        for(let item of aImgData){
            aUrl.push(Vue.axios.defaults.baseURL +'/' + (item.image_url||item.imageUrl))
        }
        aUrl = aUrl.concat(aUrl.splice(0, index));
        return aUrl;
    })
}
