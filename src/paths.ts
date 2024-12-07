const paths = {
    home(){
        return '/'
    },
    createTextPost(){
        return '/posts/new'
    },
    postShow(postId: string){
        return `/posts/${postId}`
    },
    postsListPage(){
        return "/posts/all"
    }
}

export default paths