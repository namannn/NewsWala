import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [isSample, setIsSample] = useState(false); // True : No API fetching

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const sampleArticles = [
    {
      source: {
        id: null,
        name: "India.com",
      },
      author: "India.com Sports Desk",
      title:
        "LIVE PSL | QUE vs PES T20 Live Score and Match Updates: Shoaib Malik Stars In 5-Wickets Victory Over Quetta - India.com",
      description:
        "LIVE Quetta Gladiators vs Peshawar Zalmi T20: Pakistan former captain Sarfaraz Ahmed will look for a winning start against Shoaib Malik-led Peshawar Zalmi.",
      url: "https://www.india.com/sports/live-psl-que-vs-pes-t20-live-score-and-ball-by-ball-match-updates-sarfaraz-quetta-gladiators-vs-shoaib-malik-peshawar-sony-liv-icc-tv-talat-rutherford-hetmyer-nawaz-ahsan-smeed-5210591/",
      urlToImage:
        "https://static.india.com/wp-content/uploads/2022/01/pjimage-2022-01-28T175354.860.jpg",
      publishedAt: "2022-01-28T18:25:47Z",
      content:
        "Karachi: Hello and welcome to our live cricket coverage of the match between Quetta Gladiators vs Peshawar Zalmi at National Stadium Karachi. Quetta Gladiators, who had a forgettable outing in the pr… [+4375 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "Matt Roller",
      title:
        "Eoin Morgan's endgame approaches as England prepare to do without him - ESPNcricinfo",
      description:
        "Unscheduled break puts spotlight on captain's faltering form in recent months",
      url: "https://www.espncricinfo.com/story/wi-vs-eng-2022-eoin-morgan-s-endgame-approaches-as-england-prepare-to-do-without-him-1299094",
      urlToImage:
        "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/333700/333791.6.jpg",
      publishedAt: "2022-01-28T17:07:40Z",
      content:
        "Eoin Morgan will make decision on his future himself, says Chris Silverwood",
    },
    {
      source: {
        id: null,
        name: "The Indian Express",
      },
      author: "Gaurav Bhatt",
      title:
        "Australian Open: Medvedev’s rant at umpire, and the ‘sting operation’ that caught Tsitsipas for illegal coaching - The Indian Express",
      description:
        "Medvedev’s outburst had prompted an official — Greek umpire Eva Asderaki-Moore — to position herself in the tunnel below the Tsitsipas box to potentially catch the father-son duo in the act.",
      url: "https://indianexpress.com/article/sports/tennis/australian-open-medvedevs-rant-at-umpire-and-the-sting-operation-that-caught-tsitsipas-for-illegal-coaching-7746384/",
      urlToImage:
        "https://images.indianexpress.com/2022/01/medvedev-umpire-1.jpg",
      publishedAt: "2022-01-28T15:13:53Z",
      content:
        "During his 7-6(5), 4-6, 6-4, 6-1 win in the Australian Open semifinal over Stefanos Tsitsipas, Daniil Medvedev went on a belligerent rant. The Russian lost his temper late in the second set, berating… [+6866 chars]",
    },
    {
      source: {
        id: null,
        name: "Hindustan Times",
      },
      author: "hindustantimes.com",
      title:
        "'It was the final against SRH in 2018': Ngidi recalls Dhoni's key decision in title clash; 'Helped me grow as cricketer' - Hindustan Times",
      description:
        "Lungi Ngidi recalled MS Dhoni's key on-field decision during the final of 2018 IPL. | Cricket",
      url: "https://www.hindustantimes.com/cricket/it-was-the-final-against-srh-in-2018-ngidi-recalls-ms-dhoni-s-key-decision-in-title-clash-helped-me-grow-as-cricketer-101643379826239.html",
      urlToImage:
        "https://images.hindustantimes.com/img/2022/01/28/1600x900/ngidi_dhoni_1643382350392_1643382356770.jpeg",
      publishedAt: "2022-01-28T15:08:12Z",
      content:
        "Chennai Super Kings (CSK) had made a scintillating return to the Indian Premier League in 2018 when had defeated Sunrisers Hyderabad in the final of the tournament. Shane Watson slammed a brilliant c… [+1721 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "Nagraj Gollapudi",
      title:
        "Brendan Taylor banned for three-and-a-half years for failing to report approach without delay - ESPNcricinfo",
      description:
        "Former Zimbabwe captain accepts ban and separately one charge of breaching doping code",
      url: "https://www.espncricinfo.com/story/zimbabwe-cricket-brendan-taylor-banned-for-three-and-a-half-years-for-failing-to-report-approach-without-delay-1299060",
      urlToImage:
        "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/333600/333695.6.jpg",
      publishedAt: "2022-01-28T14:55:26Z",
      content:
        "Brendan Taylor says he faces ICC ban for delay in reporting approach",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: "Sreshth Shah",
      title:
        "Yash Dhull and four others recover from Covid-19 and available for knockouts - ESPNcricinfo",
      description:
        "Allrounder Nishant Sindhu, who led in Dhull's absence, has, however, tested positive ahead of the quarter-final against Bangladesh",
      url: "https://www.espncricinfo.com/story/under-19-world-cup-2022-indias-yash-dhull-and-four-others-recover-from-covid-19-and-available-for-knockouts-1299073",
      urlToImage:
        "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/333200/333280.3.jpg",
      publishedAt: "2022-01-28T14:30:47Z",
      content:
        "NewsAllrounder Nishant Sindhu, who led in Dhull's absence, has, however, tested positive ahead of the quarter-final against Bangladesh",
    },
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title:
        "How is Adama Traoré's move back to Barcelona being received? | ESPN FC - ESPN UK",
      description:
        "The ESPN FC crew discuss Adama Traore's move to Barcelona from Wolves and how he can benefit from being there.Subscribe to ESPN UK: http://bit.ly/1oGUzVAFoll...",
      url: "https://www.youtube.com/watch?v=hh6R1EBne0U",
      urlToImage: "https://i.ytimg.com/vi/hh6R1EBne0U/maxresdefault.jpg",
      publishedAt: "2022-01-28T14:00:17Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title:
        "Stefanos Tsitsipas calls out Umpires over coaching violations | Australian Open 2022 - Wide World of Sports",
      description:
        "Stefanos Tsitsipas questions why his box is the only target for coaching violations. READ: http://9Soci.al/3G7850wAa2v | Subscribe: http://9Soci.al/c66350wAa...",
      url: "https://www.youtube.com/watch?v=YFAaDtHmfI0",
      urlToImage: "https://i.ytimg.com/vi/YFAaDtHmfI0/hqdefault.jpg",
      publishedAt: "2022-01-28T13:30:16Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "NDTV News",
      },
      author: "NDTV Sports Desk",
      title:
        "Pakistan vs Australia Under 19 World Cup Super League Quarter-Final Live Score And Updates - NDTVSports.com",
      description:
        "AUS vs PAK U19 World Cup Live Score: Pakistan U19 team won the toss and opted to field first against Australia U19 in the Super League quarter-final 3 at the Vivian Richards Stadium in Antigua.",
      url: "https://sports.ndtv.com/icc-under-19-world-cup-2022/pakistan-vs-australia-live-score-and-updates-under-19-world-cup-super-league-quarter-final-2735403",
      urlToImage:
        "https://c.ndtvimg.com/2022-01/k8i6luuo_pak-u19_625x300_28_January_22.jpg",
      publishedAt: "2022-01-28T12:44:46Z",
      content:
        "U19 World Cup Live score, Pakistan vs Australia: Pakistan U19 team captain Qasim Akram won the toss and opted to field first against Australia. Three-time Under 19 World Cup winners Australia are fac… [+697 chars]",
    },
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title:
        "Knight, Brunt shine but Aussies maintain upper hand | Women's Ashes 2021-22 - cricket.com.au",
      description:
        "A century from Heather Knight and five-wicket haul from Katherine Brut has held off what threatened to be a dominant day for Australia at Manuka Oval",
      url: "https://www.youtube.com/watch?v=0rM5Af3fl_o",
      urlToImage: "https://i.ytimg.com/vi/0rM5Af3fl_o/maxresdefault.jpg",
      publishedAt: "2022-01-28T12:30:47Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "Cricbuzz",
      },
      author: null,
      title:
        "Scorchers lift BBL title for record fourth time | Cricbuzz.com - Cricbuzz",
      description:
        "Laurie Evans (76* off 41) and Ashton Turner (54 off 35) starred with the bat before the Sixers were shot down for just 92 in a chase of 172",
      url: "https://www.cricbuzz.com/cricket-news/120863/scorchers-lift-bbl-title-for-record-fourth-time",
      urlToImage:
        "http://www.cricbuzz.com/a/img/v1/600x400/i1/c225726/scorchers-won-by-79-runs.jpg",
      publishedAt: "2022-01-28T12:28:08Z",
      content:
        "Scorchers won by 79 runs © Getty\r\nLaurie Evans (76* off 41) and Ashton Turner (54 off 35) starred with the bat, which was followed by a clinical show with the ball as the Perth Scorchers defeated Syd… [+3343 chars]",
    },
    {
      source: {
        id: null,
        name: "Sporting News",
      },
      author: null,
      title:
        "Watch: Di Maria scores wonder goal for Argentina against Chile in World Cup qualifying win - Goal India",
      description:
        "Get the latest soccer news, rumors, video highlights, scores, schedules, standings, photos, player information and more from Sporting News Canada",
      url: "https://www.sportingnews.com/ca/soccer?utm_campaign=Canada&amp;utm_medium=Redirect&amp;utm_source=Goal",
      urlToImage: null,
      publishedAt: "2022-01-28T11:53:44Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "India.com",
      },
      author: "Zee Media Bureau",
      title:
        "Ravi Shastri takes a dig at BCCI for priortising Ranji Trophy over IPL - Zee News",
      description:
        "Bhai Ranji trophy kab start ho Rahi hai? Ho Rahi ha na? I had at least 25 cricketers calling and checking on me about it. So happy to hear about Ranji trophy starting soon.",
      url: "https://zeenews.india.com/cricket/ravi-shastri-takes-a-dig-at-bcci-for-priortising-ranji-trophy-over-ipl-2431530.html",
      urlToImage:
        "https://english.cdn.zeenews.com/sites/default/files/2022/01/28/1009602-ravi-shastriopt.png",
      publishedAt: "2022-01-28T11:52:41Z",
      content:
        "Former Indian men's cricket team head coach Ravi Shastri has taken an indirect dig at BCCI for not taking a decision on holding Ranji Trophy earlier.\r\nIndia's red-ball tournament is a backbone of Ind… [+2719 chars]",
    },
    {
      source: {
        id: null,
        name: "Hindustan Times",
      },
      author: "hindustantimes.com",
      title:
        "'India should have very strong look at him': Karthik names 'readymade' youngster for T20Is; 'Has ability to tonk sixes' - Hindustan Times",
      description:
        "Dinesh Karthik has suggested the team management take a “very strong look” at the youngster. | Cricket",
      url: "https://www.hindustantimes.com/cricket/india-should-have-very-strong-look-at-him-karthik-names-readymade-youngster-for-t20is-has-ability-to-tonk-sixes-101643367661650.html",
      urlToImage:
        "https://images.hindustantimes.com/img/2022/01/28/1600x900/dinesh_karthik_shahrukh_1643370342854_1643370352627.jpg",
      publishedAt: "2022-01-28T11:48:31Z",
      content:
        "Team India will return to action in the limited-overs format on February 6 when the side takes on the West Indies in a three-match ODI series. The squads for both, ODIs and T20Is against the Windies … [+2036 chars]",
    },
    {
      source: {
        id: null,
        name: "Cricketaddictor.com",
      },
      author: "More by Vicky Singh",
      title:
        "MGM vs TVS Dream11 Prediction, Fantasy Cricket Tips, Dream11 Team, Playing XI, Pitch Report, Injury Update- Sharjah CBFS T20 - Cricket Addictor",
      description:
        "MGM vs TVS Dream11 Prediction, Fantasy Cricket Tips, Dream11 Team, Playing XI, Pitch Report, Injury Update- Sharjah CBFS T20",
      url: "https://cricketaddictor.com/fantasy-cricket/mgm-vs-tvs-dream11-prediction-fantasy-cricket-tips-dream11-team-playing-xi-pitch-report-injury-update-sharjah-cbfs-t20-2/",
      urlToImage:
        "https://cricketaddictor.com/wp-content/uploads/2022/01/Sharjah-CBFS-T20-Dream11-Prediction-Fantasy-Cricket-Tips-Dream11-Team.jpg",
      publishedAt: "2022-01-28T11:42:44Z",
      content:
        "MGM vs TVS Dream11 Prediction, Fantasy Cricket Tips, Dream11 Team, Playing XI, Pitch Report, Injury Update of Sharjah CBFS T20 match between MGM Cricket Club and The Vision Shipping. They will play a… [+4140 chars]",
    },
    {
      source: {
        id: null,
        name: "YouTube",
      },
      author: null,
      title:
        "Eye on IPL Auction 2022 ft. DC, SRH, PBKS, Lucknow & Ahmedabad - Cricbuzz",
      description:
        "The IPL mega-auction is merely 2 weeks away now. Cricbuzz has prepared a ready reckoner to keep you updated with where each team stands with their salary cap...",
      url: "https://www.youtube.com/watch?v=K6LJstg3-nk",
      urlToImage: "https://i.ytimg.com/vi/K6LJstg3-nk/maxresdefault.jpg",
      publishedAt: "2022-01-28T11:30:03Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "Hindustan Times",
      },
      author: "hindustantimes.com",
      title:
        "'Kohli, Rahul are equally good but when Rohit plays...': Harbhajan reserves massive praise for India's white-ball leader - Hindustan Times",
      description:
        "Harbhajan, who recently announced retirement from all forms of international cricket, picked Rohit as his favourite batter across all three formats. | Cricket",
      url: "https://www.hindustantimes.com/cricket/kohli-rahul-are-equally-good-but-when-rohit-plays-harbhajan-singh-reserves-massive-praise-for-india-s-white-ball-captain-101643366125581.html",
      urlToImage:
        "https://images.hindustantimes.com/img/2022/01/28/1600x900/rohit-pull-odi-getty_1636631386910_1643366799009.jpg",
      publishedAt: "2022-01-28T10:48:11Z",
      content:
        "His captaincy stint with Mumbai Indians (MI) helped him reap a lot of success in his career and Rohit Sharma is now set to lead the Indian white-ball set up in the upcoming home series against West I… [+2081 chars]",
    },
    {
      source: {
        id: null,
        name: "Managing Madrid",
      },
      author: "Lucas Navarrete",
      title: "Tchouameni price raised to €80 million -report - Managing Madrid",
      description:
        "Monaco will ask for at least €80 million to let the midfielder go next summer, according to MARCA.",
      url: "https://www.managingmadrid.com/2022/1/28/22906054/tchouameni-real-madrid-2022-news-rumors",
      urlToImage:
        "https://cdn.vox-cdn.com/thumbor/qhxPqbhxCvQvMyiEeMQzfZX7oMM=/0x0:5221x2734/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23201045/1237162501.jpg",
      publishedAt: "2022-01-28T10:32:01Z",
      content:
        "Real Madrid will have to spend at least 80 million to sign Monaco defensive midfielder Aurelien Tchouameni next summer, as the club have increased the price of the player. Thats according to a report… [+701 chars]",
    },
    {
      source: {
        id: "the-times-of-india",
        name: "The Times of India",
      },
      author: "PTI",
      title:
        "Indian cricket in good hands under Rohit Sharma's captaincy: Darren Sammy - Times of India",
      description:
        'Cricket News: Former West Indies captain Darren Sammy feels Indian cricket is in "good hands" under Rohit Sharma\'s leadership as he bracketed the senior India batte',
      url: "https://timesofindia.indiatimes.com/sports/cricket/west-indies-in-india/indian-cricket-in-good-hands-under-rohit-sharmas-captaincy-darren-sammy/articleshow/89179185.cms",
      urlToImage:
        "https://static.toiimg.com/thumb/msid-89179205,width-1070,height-580,imgsize-26218,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
      publishedAt: "2022-01-28T10:31:00Z",
      content:
        "Indian cricket in good hands under Rohit Sharma's captaincy: Darren Sammy",
    },
    {
      source: {
        id: null,
        name: "Barca Blaugranes",
      },
      author: "Gill Clark",
      title:
        "Mixed fortunes for Barcelona trio in World Cup qualifying - Barca Blaugranes",
      description: "Wins for USA and Uruguay but Brazil were held",
      url: "https://www.barcablaugranes.com/2022/1/28/22906025/mixed-fortunes-for-barcelona-trio-in-world-cup-qualifying",
      urlToImage:
        "https://cdn.vox-cdn.com/thumbor/wiIN-AINfk430RtzL2HJotF1is0=/0x353:2000x1400/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23201020/1367244429.jpg",
      publishedAt: "2022-01-28T09:36:27Z",
      content:
        "Barcelona have three players away on international duty for World Cup qualifying currently with Dani Alves, Sergino Dest, and Ronald Araujo all in action on Thursday.\r\nAlves is back with the Brazil s… [+2030 chars]",
    },
  ];

  const updateNews = async () => {
    props.setProgress(10);

    const loadSampleNews = () => {
      setArticles(
        articles.concat(sampleArticles.slice(page * 6 - 6, page * 6))
      );
      setTotalResults(sampleArticles.length);
      setIsSample(true);
      console.log("page number: " + page);
    };

    if (!isSample) {
      let url = "";
      if (props.searchTerm !== "") {
        console.log("search url");
        url =
          `https://newsapi.org/v2/everything?` +
          `q=${props.searchTerm}` +
          // + `&country=in`
          `&language=en` +
          `&sortBy=publishedAt` +
          `&apiKey=${props.apiKey}` +
          `&page=${page}` +
          `&pagesize=${props.pageSize}`;
        document.title =
          capitalizeFirstLetter(props.searchTerm) + " - NewsWala";
      } else {
        url =
          `https://newsapi.org/v2/top-headlines?` +
          `country=${props.country}` +
          `&category=${props.category}` +
          `&apiKey=${props.apiKey}` +
          `&page=${page}` +
          `&pagesize=${props.pageSize}`;
        document.title = capitalizeFirstLetter(props.category) + " - NewsWala";
      }

      props.setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      props.setProgress(60);
      console.log(parsedData);

      if (parsedData.status === "error") {
        loadSampleNews();
      } else {
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setIsSample(false);
        console.log("page number: " + page);
      }
    } else {
      loadSampleNews();
    }

    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    async function fun() {
      await updateNews();
    }
    fun();
    //eslint-disable-next-line
  }, [page, props.category]);

  const fetchMoreData = async () => {
    setPage(page + 1);
  };

  return (
    <>
      {isSample && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
          style={{ marginTop: "56px", marginBottom: "-50px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
            viewBox="0 0 16 16"
            role="img"
            aria-label="Warning:"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <div>
            Website showing sample data only. News is not realtime.{" "}
            <a href="https://github.com/namannn/NewsWala#note">Know more</a>
          </div>
        </div>
      )}

      {props.searchTerm === "" ? (
        <h1
          className="text-center"
          style={{ marginTop: "100px", marginBottom: "50px" }}
        >
          NewsWala - Top{" "}
          {props.category !== "general"
            ? props.category.charAt(0).toUpperCase() + props.category.slice(1)
            : ""}{" "}
          Headlines
        </h1>
      ) : (
        <h1
          className="text-center"
          style={{ marginTop: "100px", marginBottom: "50px" }}
        >
          NewsWala - <i>"{props.searchTerm}"</i>
        </h1>
      )}

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container pt-2">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {articles.map((element) => {
              return (
                <div className="col" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description} // ? element.description.slice(0,50) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  search: false,
  searchTerm: "",
  country: "in",
  pageSize: 9,
  category: "general",
};

News.propTypes = {
  search: PropTypes.bool,
  searchTerm: PropTypes.string,
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
};

export default News;
