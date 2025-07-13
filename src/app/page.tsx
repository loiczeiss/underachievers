import {unstable_cache} from "next/cache";

import {db} from "@/db";

import HomeClientSide from "@/components/homeClientSide";


// Caching database queries with `unstable_cache`
const getTextPosts = unstable_cache(
    async () => await db.textPost.findMany(),
    ["textPosts"],
    {revalidate: 60, tags: ["posts"]}
);

const getImgPosts = unstable_cache(
    async () => await db.imgPost.findMany(),
    ["imgPosts"],
    {revalidate: 60, tags: ["posts"]}
);

const getAudioPosts = unstable_cache(
    async () => await db.audioPost.findMany(),
    ["audioPosts"],
    {revalidate: 60, tags: ["posts"]}
);

const getAudios = unstable_cache(
    async () => await db.audio.findMany(),
    ["audios"],
    {revalidate: 60}
);

const getComments = unstable_cache(
    async () => await db.comment.findMany(),
    ["comments"],
    {revalidate: 60}
);

export default async function Home() {
    // Fetch cached data
    const [textPosts, imgPosts, audioPosts, audios, comments] = await Promise.all([
        getTextPosts(),
        getImgPosts(),
        getAudioPosts(),
        getAudios(),
        getComments(),
    ]);

    const allPosts = [
        ...textPosts.map((post) => ({...post, type: "TEXT"})),
        ...imgPosts.map((post) => ({...post, type: "IMAGE"})),
        ...audioPosts.map((post) => ({...post, type: "AUDIO"})),
    ];


    return (
        <HomeClientSide
            allPosts={allPosts}
            textPosts={textPosts}
            imgPosts={imgPosts}
            audioPosts={audioPosts}
            audios={audios}
            comments={comments}

        />
    );
}
