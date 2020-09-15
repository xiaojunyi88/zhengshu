const Valid = {};

Valid.install = function (Vue, options){

    // callback() 不能忘
    Vue.prototype.emailValid = function (rule, value, callback){
        let reg = new RegExp(/[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/);
        if (!reg.test(value)) {
            return callback(new Error('请输入正确的邮箱地址'));
        } else {
            return callback();
        }
    }

    Vue.prototype.phoneValid = function (rule, value, callback){
        let reg = new RegExp(/^1[3456789]\d{9}$/);

        if (!reg.test(value)) {
            return callback(new Error('请输入正确的手机号码'));
        } else {
            return callback();
        }
    }

    Vue.prototype.callValid = function (rule, value, callback){
        let reg = new RegExp(/^(\d{3,4})?-?\d{7,12}$/);

        if (!reg.test(value)) {
            return callback(new Error('请输入正确的电话号码'));
        } else {
            return callback();
        }
    }

    Vue.prototype.idCodeValid = function (rule, value, callback){
        let reg = new RegExp(/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);

        if (!reg.test(value)) {
            return callback(new Error('请输入正确的身份证号'));
        } else {
            return callback();
        }
    }

}

export default Valid;
