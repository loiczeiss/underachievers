const paths = {
    home(){
        return '/'
    },
    createTextPost(){
        return '/posts/new'
    },
    postShow(postId: string){
        return `/posts/${postId}`
    }
}

export default paths