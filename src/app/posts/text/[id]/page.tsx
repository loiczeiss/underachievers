import PostShow from "@/components/posts/text/PostTextShow";
import { db } from "@/db";
import * as actions from "@/actions";

interface PostShowPageProps {
  params: { id: string };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { id } = params;
  
  // Fetch the post by ID
  const post = await db.textPost.findFirst({ where: { id } });

  // Handle the case where the post is not found
  if (!post) {
    return <div className="flex justify-center">Post not found.</div>;
  }

  // Action to delete the post
  const deletePostAction = actions.deletePost.bind(null, post.id);

  return (
    <div className="flex justify-center">
      <PostShow post={post} deletePost={deletePostAction} />
    </div>
  );
}
