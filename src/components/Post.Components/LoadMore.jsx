import { styled } from "styled-components";

export const LoadMore = (props)=>{
    const {displayLoadMore, amountNewPosts} = props;
    return(
        <CsLoadMore displayLoadMore={displayLoadMore}>
            {amountNewPosts > 1 && `${amountNewPosts} new posts, load more!`}
            {amountNewPosts === 1 && `${amountNewPosts} new post, load more!`}
        </CsLoadMore>
    );
}

const CsLoadMore = styled.div`

display: ${ p=>p.displayLoadMore};
`;