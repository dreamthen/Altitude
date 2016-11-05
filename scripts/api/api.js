/**
 * Created by yinwk on 2016/10/15.
 */
var api = {};
var mookSrc = "data";
var realSrc = "";
var isMook = true;
if (!isMook) {
    api = {
        CARD_VIEW: realSrc + ""
    }
} else {
    api = {
        CARD_VIEW: mookSrc + "/al-card.json",
        CARD_INNER_INFO: mookSrc + "/al-card-info"
    };
}
