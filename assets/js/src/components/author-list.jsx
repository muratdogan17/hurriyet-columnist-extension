
let AuthorList = React.createClass({
    getInitialState(){
       return {
           apiUrl: 'https://api.hurriyet.com.tr/v1/columns?$top=10',
           apiKey: 'fc57b59b2aa84a96a5bd3fc86dd1e3a4',
           data: []
       }
    },
    getInitialData(){
        this.serverRequest = $.get(this.state.apiUrl,{'apikey': this.state.apiKey}, function (result) {
            this.setState({
                data: result
            });
        }.bind(this));
    },
    componentDidMount(){
        this.getInitialData();
    },
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
    render(){
        var authors = this.state.data.map(function(author) {
            return (
                <article key={author.Id} className="feed-article  feed-author-article read-list-wrapper">
                    <div className="author-text">
                        <div className="author-name">
                            <a href={author.Url} className="cf">
                                <h5>{author.Fullname}</h5>
                            </a>
                            <a href={author.Url} className="cf article-title-wrapper">
                                <h4 className="article-title">{author.Description}</h4>
                            </a>
                        </div>
                    </div>
                </article>
            );
        });

        return (
            <div>
                {authors}
            </div>
        );
    }
});


ReactDOM.render(
    <AuthorList/>,
    document.getElementById("authors")
);