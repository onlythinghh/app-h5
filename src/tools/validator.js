/*
 * @Description: 
 * @Author: hzh
 * @Date: 2019-07-08 09:42:57
 * @FilePath: \app-h5\src\tools\validator.js
 */
var Validator = function () {
    this.cache = [];
}

Validator.prototype.strategies = {
    isNonEmpty: function (value, errorMsg) {
        if (!value) return errorMsg;
    },
    minLength: function (value, length, errorMsg) {
        if (value.length < length) return errorMsg;
    },
    maxLength: function (value, length, errorMsg) {
        if (value.length > length) return errorMsg;
    },
    isMobile: function (value, errorMsg) {
        if (!/(^1[0-9]{10}$)/.test(value)) return errorMsg;
    },
    ID: function (value, errorMsg) {
        if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) return errorMsg;
    },
    // 是否为邮政编码
    isPostal: function (value, errorMsg) {
        if (!/^[0-9]{6}$/.test(value)) return errorMsg;
    },
    isReally: function (value, errorMsg) {
        if (!Boolean(parseFloat(value))) return errorMsg;
    },
    notEmpty: function (value, errorMsg) {
        console.log('value',value)
        if (!value && String(value) !== '0') return errorMsg;
    }
};

Validator.prototype.add = function (value, rules) {
    var self = this;
    for (var i = 0, rule; rule = rules[i++];) {
        (function (rule) {
            var strategyAry = rule.strategy.split(':');
            var errorMsg = rule.errorMsg;
            self.cache.push(function () {
                var strategy = strategyAry.shift();
                strategyAry.unshift(value);
                strategyAry.push(errorMsg);
                return self.strategies[strategy].apply(null, strategyAry);
            });
        })(rule);
    }
}

Validator.prototype.start = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var errorMsg = validatorFunc();
        if (errorMsg) {
            return errorMsg;
        }
    }
}

// var validataFunc = function () {
//     var validator = new Validator();
//     validator.add('123456', [{
//         strategy: "isNonEmpty",
//         errorMsg: "不能为空"
//     }, {
//         strategy: "minLength:6",
//         errorMsg: "长度不能小于6位"
//     }]);
//     validator.add('15021771751', [{
//         strategy: "isNonEmpty",
//         errorMsg: "不能为空"
//     }, {
//         strategy: "minLength:11",
//         errorMsg: "长度不能小于11位"
//     }, {
//         strategy: "isMobile",
//         errorMsg: "请输入正确的手机号"
//     }]);
//     var errorMsg = validator.start();
//     return errorMsg;
// }
// var errorMsg = validataFunc();
// console.log(errorMsg);

export default Validator;