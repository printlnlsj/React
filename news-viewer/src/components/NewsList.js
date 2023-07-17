import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../node_modules/axios/index";
import NewsItem from "./NewsItems";

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (margin-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({category}) => {
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const fetchData = async () => {
            setLoading(true);
            try{
                const query = category === 'all' ? '':`&category=${category}`
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=62e3e98cec4144869b84c8a4c9acb252`);
                setArticles(response.data.articles);
            }catch(e) { console.log(e); }
            setLoading(false);
        };
        fetchData();
    },[category]);

    //대기중...
    if(loading) {
        return<NewsListBlock>대기중...</NewsListBlock>
    }

    //아직 article 값이 설정되지 않았을때 ...
    if(!articles) {
        return null;
    }

    //article 값이 유효할때...
    return(
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>    
    );
    
};

export default NewsList;