const paths = {
    home(){
        return '/'
    },
    createTextPost(){
        return '/posts/text/new'
    },
    textPostShow(postId: string){
        return `/posts/text/${postId}`
    },
    textPostsListPage(){
        return "/posts/text/all"
    },
    createImgPost(){
        return "/posts/images/new"
    },
    imgPostShow(postId: string){
        return `/posts/images/${postId}`
    },
    imgPostsListPage(){
        return "/posts/images/all"
    }
}

export default paths