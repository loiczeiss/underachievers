import { db } from "@/db";
import * as actions from "@/actions";
import ImgPostShow from "@/components/posts/images/imgPostShow";

interface PostShowPageProps {
  params: Promise<{ id: string }>;
}


export default async function AudioPostShowPage(props: PostShowPageProps) {
//   const params = await props.params;
//   const {id} = params;

//   const post = await db.imgPost.findFirst({where:{id}})
//   const comments = await db.comment.findMany({where:{imgPostId: id}})
//   if(!post){
//       return <div className="flex justify-center">Post not found.</div>;
//   }

  return(
    <div className="flex justify-center">
    <AudioPostShowPage />
  </div>
  )
}