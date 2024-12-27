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
    },
    userPostsPage(userId: string){
        return `/user/${userId}`
    },
    userImgPostPage(userId:string, postId: string){
        return `/user/${userId}/images/${postId} `
    },
    userTextPostPage(userId: string, postId: string){
        return `/user/${userId}/text/${postId}`
    }
}

export default paths