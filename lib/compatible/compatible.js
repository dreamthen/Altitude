/**
 * Created by yinwk on 2016/10/14.
 */
(function() {
    if (!/*@cc_on@*/0) {
        return;
    }
    var e = "header,hgroup,nav,footer,article,aside,section,figure,main,figcaption,time,mark,var,code,samp,kdb,bdo,cite,dfn,address,abbr,blockquote".split(",");
    var i = e.length;
    while (i--) {
        document.createElement(e[i]);
    }
})();