import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        search: false,
        searchTerm: '',
        country: 'in',
        pageSize: 9,
        category: 'general',
    }

    static propTypes = {
        search: PropTypes.bool,
        searchTerm: PropTypes.string,
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews() {
        let url = '';
        if (this.props.searchTerm !== '') {
            console.log("search url");
            url = `https://newsapi.org/v2/everything?`
                + `q=${this.props.searchTerm}`
                // + `&country=in`
                + `&language=en`
                + `&sortBy=publishedAt`
                + `&apiKey=1f76bec780544d98b6d1ea5f8558ffd2`
                + `&page=${this.state.page}`
                + `&pagesize=${this.props.pageSize}`;
            document.title = this.capitalizeFirstLetter(this.props.searchTerm) + ' - NewsWala';
        } else {
            url = `https://newsapi.org/v2/top-headlines?`
                + `country=${this.props.country}`
                + `&category=${this.props.category}`
                + `&apiKey=1f76bec780544d98b6d1ea5f8558ffd2`
                + `&page=${this.state.page}`
                + `&pagesize=${this.props.pageSize}`;
            document.title = this.capitalizeFirstLetter(this.props.category) + ' - NewsWala'
        }

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        });
        console.log("page number: " + this.state.page);
    }

    // Runs after render()
    async componentDidMount() {
        await this.updateNews();
        this.setState({loading: false});
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1});
        this.updateNews();
    };

    render() {
        return <>
            {this.props.searchTerm === '' ?
                <h1 className="text-center my-5">NewsWala - Top {this.props.category !== "general" ? this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) : ""} Headlines</h1>
                : <h1 className="text-center my-5">NewsWala - <i>"{this.props.searchTerm}"</i></h1>}

            {this.state.loading && <Spinner/>}

            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
                <div className="container pt-2">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col" key={element.url}>
                                    <NewsItem title={element.title}
                                        description={element.description} // ? element.description.slice(0,50) : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source} />
                                </div>
                            )
                        })}
                    </div>
                </div>

            </InfiniteScroll>
        </>;
    }
}

export default News;
