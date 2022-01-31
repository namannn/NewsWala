import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


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
            loading: false,
            page: 1,
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async updateNews(){
        let url = '';
        if(this.props.searchTerm !== ''){
            console.log("search url");
            url = `https://newsapi.org/v2/everything?`
                + `q=${this.props.searchTerm}`
                // + `&country=in`
                + `&language=en`
                + `&sortBy=publishedAt`
                + `&apiKey=1f76bec780544d98b6d1ea5f8558ffd2`
                + `&page=${this.state.page}`
                + `&pagesize=${this.props.pageSize}`;
            document.title = this.capitalizeFirstLetter(this.props.searchTerm)  + ' - NewsWala';
        }else{
            url = `https://newsapi.org/v2/top-headlines?`
                + `country=${this.props.country}`
                + `&category=${this.props.category}`
                + `&apiKey=1f76bec780544d98b6d1ea5f8558ffd2`
                + `&page=${this.state.page}`
                + `&pagesize=${this.props.pageSize}`;
            document.title = this.capitalizeFirstLetter(this.props.category) + ' - NewsWala'
        }
        
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        console.log("page number: " + this.state.page);
    }

    // Runs after render()
    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async() => {
        await this.setState({page: this.state.page + 1});
        await this.updateNews();
    }

    render() {
        return <div className='container my-3'>
            {this.props.searchTerm === '' ? 
                    <h1 className="text-center my-5">NewsWala - Top {this.props.category!=="general" ? this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) : ""} Headlines</h1> 
                :   <h1 className="text-center my-5">NewsWala - <i>"{this.props.searchTerm}"</i></h1>}
            
            {this.state.loading && <Spinner/>}

            {!this.state.loading && <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {this.state.articles.map((element)=>{
                        return (
                            <div className="col" key={element.url}>
                                <NewsItem title={element.title} 
                                description={element.description} // ? element.description.slice(0,50) : ""}
                                imageUrl={element.urlToImage}
                                newsUrl={element.url}
                                author={element.author}
                                date={element.publishedAt}
                                source={element.source}/>
                            </div>
                        )
                    })}
                </div>
                <div className="container d-flex justify-content-between my-3 px-3">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrevClick} type="button" className="btn btn-dark"> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} type="button" className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
    }

        </div>;
    }
}

export default News;
