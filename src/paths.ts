const paths = {
    home(){
        return '/'
    },
    createTextPost(){
        return '/posts/text/new'
    },
    postShow(postId: string){
        return `/posts/text/${postId}`
    },
    postsListPage(){
        return "/posts/text/all"
    }
}

export default paths