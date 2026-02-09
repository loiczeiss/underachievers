import { VoteType, PostType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeAccount() {
  return {
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeAccountComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeSession() {
  return {
    expires: faker.date.anytime(),
    sessionToken: faker.lorem.words(5),
    accessToken: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSessionComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    expires: faker.date.anytime(),
    sessionToken: faker.lorem.words(5),
    accessToken: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUser() {
  return {
    name: undefined,
    email: undefined,
    emailVerified: undefined,
    image: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: undefined,
    email: undefined,
    emailVerified: undefined,
    image: undefined,
  };
}
export function fakeVerificationToken() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeVerificationTokenComplete() {
  return {
    identifier: faker.lorem.words(5),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeTextPost() {
  return {
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeTextPostComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    userId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeImgPost() {
  return {
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    imgUrl: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
    imgPublicId: faker.lorem.words(5),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeImgPostComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    imgUrl: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    userId: faker.string.uuid(),
    imgPublicId: faker.lorem.words(5),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeAudioPost() {
  return {
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeAudioPostComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    userId: faker.string.uuid(),
    audioId: faker.string.uuid(),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeImage() {
  return {
    publicId: faker.lorem.words(5),
    url: faker.lorem.words(5),
    width: faker.number.int(),
    height: faker.number.int(),
    format: faker.lorem.words(5),
  };
}
export function fakeImageComplete() {
  return {
    id: faker.string.uuid(),
    publicId: faker.lorem.words(5),
    url: faker.lorem.words(5),
    width: faker.number.int(),
    height: faker.number.int(),
    format: faker.lorem.words(5),
    createdAt: new Date(),
  };
}
export function fakeAudio() {
  return {
    publicId: faker.lorem.words(5),
    url: faker.lorem.words(5),
    displayName: faker.lorem.words(5),
    playbackUrl: faker.lorem.words(5),
    thumbnailUrl: faker.lorem.words(5),
    duration: faker.number.int(),
    format: faker.lorem.words(5),
    userId: faker.lorem.words(5),
  };
}
export function fakeAudioComplete() {
  return {
    id: faker.string.uuid(),
    publicId: faker.lorem.words(5),
    url: faker.lorem.words(5),
    displayName: faker.lorem.words(5),
    playbackUrl: faker.lorem.words(5),
    thumbnailUrl: faker.lorem.words(5),
    duration: faker.number.int(),
    format: faker.lorem.words(5),
    createdAt: new Date(),
    userId: faker.lorem.words(5),
  };
}
export function fakeComment() {
  return {
    content: faker.lorem.words(5),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
    updatedAt: faker.date.anytime(),
    userImage: faker.lorem.words(5),
    userName: faker.lorem.words(5),
  };
}
export function fakeCommentComplete() {
  return {
    id: faker.string.uuid(),
    content: faker.lorem.words(5),
    userId: faker.string.uuid(),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    imgPostId: undefined,
    textPostId: undefined,
    userImage: faker.lorem.words(5),
    userName: faker.lorem.words(5),
    audioPostId: undefined,
    parentId: undefined,
  };
}
export function fakeVote() {
  return {
    voteType: faker.helpers.arrayElement([VoteType.UP, VoteType.DOWN] as const),
    userId: faker.lorem.words(5),
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
export function fakeVoteComplete() {
  return {
    id: faker.string.uuid(),
    voteType: faker.helpers.arrayElement([VoteType.UP, VoteType.DOWN] as const),
    imgPostId: undefined,
    userId: faker.lorem.words(5),
    textPostId: undefined,
    audioPostId: undefined,
    commentId: undefined,
    postType: faker.helpers.arrayElement([PostType.TEXT, PostType.IMAGE, PostType.AUDIO] as const),
  };
}
