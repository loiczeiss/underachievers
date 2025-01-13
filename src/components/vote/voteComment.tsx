"use client";

import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import * as actions  from "@/actions"; // Import server actions
import { useSession } from "next-auth/react";
import { db } from "@/db";

interface VoteButtonProps {
  commentId: string;
}

export default function VoteCommentButton({ commentId }: VoteButtonProps) {
  const [voteCount, setVoteCount] = useState<number>(0); // Tracks the vote count
  const [error, setError] = useState<string | null>(null); // Tracks errors
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [voted, setVoted] = useState(false); // Tracks if user has voted
  const session = useSession();
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
      const result = await actions.handleVoteComment(commentId);

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
    <div>
      <Button
        onPress={handleVoteClick}
        disabled={loading || voted}
        className={`${voted ? "bg-green-400" : "bg-white/25"} mt-2	`}
      >
        {loading
          ? "Counting..."
          : voted
          ? `Voted (${voteCount})`
          : `Vote (${voteCount})`}
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
