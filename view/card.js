/**
 * Created by yinwk on 2016/10/15.
 */
$(function() {
    /**
     * ShowMainContainer Altitude每一个汰度具体信息
     */
    var ShowMainContainer = React.createClass({
        getInitialState: function () {
            return {
                cardInfo: {}
            }
        },
        componentWillMount: function () {

        },
        shouldComponentUpdate: function () {
            return true;
        },
        componentWillUpdate: function () {

        },
        componentDidUpdate: function () {
            var id = this.props.id,
                param = this.props.source;
            param.url = api.CARD_INNER_INFO;
            param.data.id = id;
            Altitude.requestAjax(param, function () {
                if (result.head.code === defaultThing.DEFAULT_SUCCESS_CODE) {
                    var body = result.body;

                } else {
                    alert(result.head.msg);
                }
            }.bind(this));
        },
        componentDidMount: function () {

        },
        closeMainInfo: function () {
            $("#maintain").hide(500);
        },
        render: function () {
            return (
                <section className="al-mainInformation">
                    <section className="al-mainInfoMain">
                        <header className="al-mainInfo-header">

                        </header>
                        <article className="al-mainInfo-show">

                        </article>
                        <aside className="al-mainInfo-aside">

                        </aside>
                        <i className="iconfont icon-close" onClick={this.closeMainInfo.bind(this)}> </i>
                    </section>
                </section>
            )
        },
        componentWillUnmount: function () {

        }
    });
    /**
     * ViewCard Altitude汰度列表
     */
    var ViewCard = React.createClass({
        getInitialState: function () {
            return {
                listCardView: [],
                time: "",
                scrollFlag: false,
                id: 0
            }
        },
        requestListScroll: function (param) {
            var listCardView = this.state.listCardView;
            Altitude.requestAjax(param, function (result) {
                if (result.head.code === defaultThing.DEFAULT_SUCCESS_CODE) {
                    var body = result.body;
                    this.setState({
                        listCardView: listCardView.concat(body.list)
                    });
                } else {
                    alert(result.head.msg);
                }
            }.bind(this));
        },
        requestTime: function () {
            var date = this.props.date;
            var time = Altitude.requestAlTime(date);
            this.setState({
                time: time
            });
        },
        componentWillMount: function () {

        },
        componentWillUnmount: function () {
            this.serverRequestAjax.abort();
            this.serverRequestAjaxScroll.abort();
        },
        showMainInfo: function (id) {
            this.setState({
                id: id
            });
            $("#maintain").show(500);
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return true;
        },
        componentWillUpdate: function () {

        },
        componentDidUpdate: function () {

        },
        render: function () {
            var list = this.state.listCardView,
                time = this.state.time,
                id = this.state.id;
                param = this.props.source;
            return (
                <div>
                    <div className="al-section-card-list">
                        {
                            list.map(function (listItem) {
                                return (<section className="demo-card-square mdl-card mdl-shadow--2dp al-section-card"
                                                 onClick={this.showMainInfo.bind(this, listItem.id)}>
                                    <div className="mdl-card__title al-section-card-title">
                                        <h2 className="mdl-card__title-text">{listItem.title}</h2>
                                    </div>
                                    {listItem.image.length > 0 && <div className="al-section-image">
                                        <img src={listItem.image} alt=""/>
                                    </div>}
                                    <div className="mdl-card__supporting-text al-section-card-content">
                                        {listItem.content}
                                    </div>
                                    <div className="mdl-card__actions al-section-card-user">
                                        <div className="al-section-card-headImage"
                                             style={{
                                                 background: "url(" + listItem.headImage + ") center center no-repeat border-box content-box",
                                                 backgroundSize: "cover"
                                             }}>
                                        </div>
                                        <div className="al-section-card-time">
                                            <span>{listItem.user}</span>
                                            <time>{time}</time>
                                        </div>
                                    </div>
                                </section>)
                            }.bind(this))
                        }
                    </div>
                    <section id="maintain" className="al-mainInfo">
                        <ShowMainContainer id={id} source={param}/>
                    </section>
                </div>
            )
        },
        componentDidMount: function () {
            var param = this.props.source;
            /**
             *滚动到底部发送请求，返回Altitude汰度列表
             */
            $(window).scroll(function () {
                var scrollTop = $(document).scrollTop();
                if (scrollTop >= ($(document).height() - $(window).height())) {
                    /**
                     *下拉请求，返回Altitude汰度列表
                     */
                    this.serverRequestAjaxScroll = this.requestListScroll(param);
                    /**
                     * 下拉返回状态时间
                     */
                    this.requestTime();
                }
            }.bind(this));
            /**
             * 返回状态时间
             */
            this.requestTime();
            /**
             *请求，返回Altitude汰度列表
             */
            this.serverRequestAjax = this.requestListScroll(param);
        }
    });
    /**
     * 定义请求ajax参数
     * @type {{url: *, type: string, data: {}}}
     */
    var param = {
        url: api.CARD_VIEW,
        type: "get",
        data: {}
    };
    ReactDOM.render(<ViewCard source={param} date={new Date()}/>, $("#main").get(0));
});
