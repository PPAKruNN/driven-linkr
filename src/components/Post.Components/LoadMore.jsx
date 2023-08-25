import { styled } from "styled-components";

export function LoadMore(props){
    const {displayLoadMore, amountNewPosts} = props;
    const rel= ()=>{window.location.reload();}
    return(
        <CsLoadMore 
            displayLoadMore={displayLoadMore?'true':'none'}
            onClick={rel}
        >
                {amountNewPosts > 1 && `${amountNewPosts} new posts, load more!`}
                {amountNewPosts === 1 && `${amountNewPosts} new post, load more!`}
        </CsLoadMore>
    );
}

const CsLoadMore = styled.div`
    display: ${ p=>p.displayLoadMore==='true'?'flex':'none'};
    align-items: center;
    justify-content: center;
    background-color: #1877F2;
    color: white;
    border: 1px solid;
    width: 100%;
    height: 61px;
    border-radius: 16px;
    margin-left: 2.5%;
    cursor: pointer;
`;