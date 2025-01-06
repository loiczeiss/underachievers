"use client";

import { db } from "@/db";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export const HeartIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : "none"}
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

interface LikeComponentprops {
  commentId: string | null;
  postId: string | null;
}

export default function LikeComponent(props: LikeComponentprops) {
  // const [likeBoolean, setLikeBoolean] = useState(false)
  // const [likeOrDislike, setLikeOrDislike] =useState("like")
  // const [buttonColor, setButtonColor] = useState('success')
  // const handlePress = () =>{
  //     if(likeBoolean === false){
  //         setLikeBoolean(true)
  //         setLikeOrDislike("Dislike")
  //         setButtonColor("danger")
  //     }else{
  //         setLikeBoolean(false)
  //         setLikeOrDislike('Like')
  //         setButtonColor("success")
  //     }
  // }

  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeCount = async () => {
      let count = 0;
      if (props.commentId) {
        count = await db.like.count({ where: { commentId: props.commentId } });
      } else {
        count = await db.like.count({ where: { postId: props.postId } });
      }
      setLikeCount(count); // Update the state with the fetched count
    };

    fetchLikeCount(); // Call the function to fetch the like count
  }, [props.commentId, props.postId]); // Dependencies to re-run on changes

  return (
    <>
      <Button
      //  onPress={()=>handlePress()}
      >
        <HeartIcon
          filled={undefined}
          size={undefined}
          height={undefined}
          width={undefined}
        />
{likeCount}
      </Button>
    </>
  );
}
