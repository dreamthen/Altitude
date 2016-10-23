/**
 * Created by yinwk on 2016/10/14.
 */
$(function() {
    (function (global, $) {
        /**
         * 对传过来的请求数据参数进行处理
         * @param param
         * @returns {*}
         */
        function selectData(param) {
            var prop = ["url", "type", "dataType", "data", "async", "timeout"];
            var result = [];
            var flag = true;
            for (var i = 0; i < prop.length; i++) {
                for (var paramList in param) {
                    if (paramList == prop[i]) {
                        flag = true;
                        break;
                    } else {
                        flag = false;
                    }
                }
                if (!flag) {
                    result.push(prop[i]);
                }
            }
            result.forEach(function (resultList, index) {
                switch (resultList) {
                    case "type":
                        param[resultList] = "post";
                        break;
                    case "dataType":
                        param[resultList] = "json";
                        break;
                    case "async":
                        param[resultList] = true;
                        break;
                    case "timeout":
                        param[resultList] = 6000;
                        break;
                    default:
                        param[resultList] = "";
                }
            }.bind(this));
            return param;
        }

        /**
         * 定义返回时间的函数
         * @param time
         * @param date
         * @returns {string|*}
         */
        function selectTime(time, date) {
            var year = date.getFullYear();
            var month = getFormat(parseInt(date.getMonth() + 1));
            var day = getFormat(parseInt(date.getDate()));
            var hour = getFormat(parseInt(date.getHours()));
            var minute = getFormat(parseInt(date.getMinutes()));
            var second = getFormat(parseInt(date.getSeconds()));
            time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
            return time;
        }

        /**
         * 定义对返回的时间进行规范化的函数
         * @param timeItem
         * @returns {*}
         */
        function getFormat(timeItem) {
            if (timeItem < 10) {
                timeItem = "0" + timeItem;
            }
            return timeItem;
        }

        /**
         * 定义请求数据方法对象
         */
        var requestAlCardList = function () {
            this.param = {};
        };

        requestAlCardList.prototype.getJsonList = function (obj) {
            this.param = selectData(obj);
        };

        /**
         * 定义请求时间方法对象
         */
        var requestAlCardTime = function () {
            this.time = "";
        };

        requestAlCardTime.prototype.requestAlTime = function (date) {
            this.time = selectTime(this.time, date);
            return this.time;
        };

        /**
         * 父子函数继承
         * @param subfunction
         * @param superfunction
         */
        function extend(subfunction, superfunction) {
            var F = function () {

            };
            extendProps(F.prototype, superfunction.prototype);
            extendProps(subfunction.prototype, superfunction.prototype);
            subfunction.prototype.constructor = subfunction;
            subfunction.superClass = superfunction;
            if (superfunction.prototype.constructor === Object.prototype.constructor) {
                superfunction.prototype.constructor = superfunction;
            }
        }

        /**
         * 父子函数方法继承
         * @param subfunction
         * @param superfunction
         */
        function extendProps(subfunction, superfunction) {
            for (var prototypeMine in superfunction) {
                subfunction[prototypeMine] = superfunction[prototypeMine];
            }
        }

        /**
         * 定义Altitude主对象
         * @constructor
         */
        var AltitudeMethod = function () {
            AltitudeMethod.superClass.prototype.constructor.call(this);
        };

        /**
         * 进行Altitude方法的继承
         */
        extend(AltitudeMethod, requestAlCardList);
        extend(AltitudeMethod, requestAlCardTime);

        AltitudeMethod.prototype.requestAjax = function (obj, func) {
            this.getJsonList(obj);
            return $.ajax(this.param).done(func);
        };

        /**
         * 对Altitude进行初始化
         * @type {AltitudeMethod}
         */
        var Altitude = new AltitudeMethod();

        Object.defineProperties(global, {
            Altitude: {
                value: Altitude,
                enumable: false,
                configurable: false,
                writable: false
            }
        });
    })(window, $);
});