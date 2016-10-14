$(document).ready(function(){
   $('body').on('click', 'a', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
   });
});
'use strict';

var AuthorList = React.createClass({
    displayName: 'AuthorList',

    getInitialState: function getInitialState() {
        return {
            apiUrl: 'https://api.hurriyet.com.tr/v1/columns?$top=10',
            apiKey: 'fc57b59b2aa84a96a5bd3fc86dd1e3a4',
            data: []
        };
    },
    getInitialData: function getInitialData() {
        this.serverRequest = $.get(this.state.apiUrl, { 'apikey': this.state.apiKey }, (function (result) {
            this.setState({
                data: result
            });
        }).bind(this));
    },
    componentDidMount: function componentDidMount() {
        this.getInitialData();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.serverRequest.abort();
    },
    render: function render() {
        var authors = this.state.data.map(function (author) {
            return React.createElement(
                'article',
                { key: author.Id, className: 'feed-article  feed-author-article read-list-wrapper' },
                React.createElement(
                    'div',
                    { className: 'author-text' },
                    React.createElement(
                        'div',
                        { className: 'author-name' },
                        React.createElement(
                            'a',
                            { href: author.Url, className: 'cf' },
                            React.createElement(
                                'h5',
                                null,
                                author.Fullname
                            )
                        ),
                        React.createElement(
                            'a',
                            { href: author.Url, className: 'cf article-title-wrapper' },
                            React.createElement(
                                'h4',
                                { className: 'article-title' },
                                author.Description
                            )
                        )
                    )
                )
            );
        });

        return React.createElement(
            'div',
            null,
            authors
        );
    }
});

ReactDOM.render(React.createElement(AuthorList, null), document.getElementById("authors"));
//# sourceMappingURL=app.js.map
