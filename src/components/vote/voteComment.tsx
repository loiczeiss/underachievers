"use client";

import { Button } from "@heroui/react";
import { useState, useEffect } from "react";
import * as actions  from "@/actions"; // Import server actions
import { useSession } from "next-auth/react";
import { PostType } from "@prisma/client";
import ArrowUp from "public/Icon-up-arrow.svg";
import ArrowDown from "public/Icon-down-arrow.svg"
import Image from "next/image";
import { useTheme } from "next-themes";

interface VoteButtonProps {
  commentId: string;
  postType: PostType
}

export default function VoteCommentButton({ commentId, postType }: VoteButtonProps) {
  const [voteCount, setVoteCount] = useState<number>(0); // Tracks the vote count
  const [error, setError] = useState<string | null>(null); // Tracks errors
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [voted, setVoted] = useState(false); // Tracks if user has voted
  const session = useSession();
  const { theme, setTheme } = useTheme()

  // Fetch vote count on initial render
  useEffect(() => {
    const fetchVoteCount = async () => {
      try {
        const result = await actions.getVoteDataComment(
          commentId,
          session.data?.user?.id as string
        );

        if (typeof result.voteCount === "number") {
          setVoteCount(result.voteCount);
          setLoading(false);
        } else if (result.errors?._form) {
          setError(result.errors._form[0]);
        }
        if (result.existingLike) {
          setVoted(true);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching the vote count.");
        }
      }
    };

    fetchVoteCount();
  }, [commentId]);

  const handleVoteClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await actions.handleVoteComment(commentId, postType);

      if (result.errors?._form) {
        setError(result.errors._form[0]); // Handle form-level error
      } else if (result.success === true) {
        setVoteCount((prev) => prev + 1); // Increment vote count
        setVoted(true); // Set user as having voted
      } else if (result.success === false) {
        setVoteCount((prev) => prev - 1);
        setVoted(false);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Display error message
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
    <Button 
    id="Vote"
      onPress={handleVoteClick}
      disabled={loading}
      className="bg-white/25 dark:text-zinc-300 dark:bg-black/25 dark:hover:bg-black/75"
    >
      {loading ? (
        "..."
      ) : (
        <><Image priority src={voted ? ArrowDown : ArrowUp} alt="Vote" width={24} height={24} className={`${theme === 'dark' ? 'invert' : ''}`}/><span className="">{voteCount}</span></>
      )}
    </Button>
    
    {error && <p className="text-red-500">{error}</p>}
  </div>
  );
}
