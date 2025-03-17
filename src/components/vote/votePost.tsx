"use client";

import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import * as actions from "@/actions"; // Import server actions
import { useSession } from "next-auth/react";
import ArrowUp from "public/Icon-up-arrow.svg";
import ArrowDown from "public/Icon-down-arrow.svg";

interface VoteButtonProps {
  postId: string;
  postType: "IMAGE" | "AUDIO" | "TEXT"; // Define allowed post types
}

export default function VoteButton({ postId, postType }: VoteButtonProps) {
  const [voteCount, setVoteCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (!session.data?.user?.id) return;

    const fetchVoteData = async () => {
      setLoading(true);
      try {
        const getVoteData = {
          IMAGE: actions.getVoteDataImg,
          AUDIO: actions.getVoteDataAudio,
          TEXT: actions.getVoteDataText,
          COMMENT: actions.getVoteDataComment,
        }[postType];

        const result = await getVoteData(
          postId,
          session.data.user?.id as string
        );

        if (typeof result.voteCount === "number") {
          setVoteCount(result.voteCount);
        }
        setVoted(!!result.existingLike);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVoteData();
  }, [session.data?.user?.id, postId, postType]);

  const handleVoteClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const handleVote = actions.handlePostVote; // Use single server action
      const result = await handleVote(postId, postType);

      if (result.errors?._form) {
        setError(result.errors._form[0]);
      } else if (result.success) {
        setVoteCount((prev) => prev + 1);
        setVoted(true);
      } else {
        setVoteCount((prev) => prev - 1);
        setVoted(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <Button
        onPress={handleVoteClick}
        disabled={loading}
        className="bg-white/25"
      >
        {loading ? (
          "..."
        ) : (
          <>
            <Image
              priority
              src={voted ? ArrowDown : ArrowUp}
              alt="Vote"
              width={24}
              height={24}
            />
            <span className="">{voteCount}</span>
          </>
        )}
      </Button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
