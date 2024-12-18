import { db } from "@/db";
import * as actions from "@/actions";
import ImgPostShow from "@/components/posts/images/imgPostShow";

interface PostShowPageProps {
  params: { id: string };
}


export default async function ImgPostShowPage({params}: PostShowPageProps){
    const {id} = params;

    const post = await db.imgPost.findFirst({where:{id}})

    if(!post){
        return <div className="flex justify-center">Post not found.</div>;
    }
    const deleteImgPostAction = actions.deleteImgPost.bind(null, post.id)
  return(
    <div className="flex justify-center">
    <ImgPostShow post={post} deleteImgPost={deleteImgPostAction}/>
  </div>
  )
}