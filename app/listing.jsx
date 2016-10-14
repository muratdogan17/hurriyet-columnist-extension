var Listing = React.createClass({
    getInitialState: function () {
        return {
            data: [],
            dataSource: 'https://api.hurriyet.com.tr/v1/columns',
            totalColumnCount: '5',
            apiKey: 'fc57b59b2aa84a96a5bd3fc86dd1e3a4'
        }
    },
    getBaseUrl: function () {
        var url = this.state.dataSource+ '?apikey=' + this.state.apiKey + '&$top=' + this.state.totalColumnCount;
        return url;
    },
    componentDidMount: function () {
        this.getBaseUrl();
    },
    getInitialData: function () {
        $.when($.ajax(this.getBaseUrl())).then(function (data, textStatus, jqXHR) {
            var _newData = data;
            this.setState({
                data: _newData
            });
        }.bind(this));
        console.info(this.state.data);
    },
    render: function () {
        return(
            this.state.data.map(function(column) {
                return (
                    <article key={column.Id} className="feed-article  feed-author-article read-list-wrapper">
                        <span className="author-image" style={{background: 'url(http://i.hurimg.com/i/hurriyet/98/120x120/55ea09f2f018fbaf449420b0.jpg); background-size:40px 40px;'}}></span>
                        <div className="author-text">
                            <div className="author-name">
                                <a href="link" className="cf"><h5>DOĞAN HIZLAN</h5></a>
                                <a href="link" className="cf article-title-wrapper">
                                    <h4 className="article-title">Nâzım’dan okumadıklarımız</h4>
                                </a>
                            </div>
                        </div>
                    </article>
                );
            })
        )
    }
});

ReactDOM.render(<Listing />, document.getElementById("authors"));