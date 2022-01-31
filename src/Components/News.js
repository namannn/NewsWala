import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("Constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
    }

    // Runs after render()
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f76bec780544d98b6d1ea5f8558ffd2&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    handlePrevClick = async () => {
        console.log("Prev button clicked");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f76bec780544d98b6d1ea5f8558ffd2&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
    }

    handleNextClick = async () => {
        console.log("Next button clicked");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1f76bec780544d98b6d1ea5f8558ffd2&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page + 1,
            loading: false
        })
    }

    render() {
        return <div className='container my-3'>
            <h1 className="text-center my-5">NewsWala - Top {this.props.category!=="general" ? this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) : ""} Headlines</h1>
            
            {this.state.loading && <Spinner/>}

            <div className="container">
            {!this.state.loading && <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {this.state.articles.map((element)=>{
                    return (
                        <div className="col" key={element.url}>
                            <NewsItem title={element.title} 
                            description={element.description ? element.description.slice(0,50) : ""}
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source}/>
                        </div>
                    )
                })}
            </div>}
                <div className="container d-flex justify-content-between my-3 px-3">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>

        </div>;
    }
}

export default News;
