import { prisma } from '../app/db';

const seed = async () => {
  const twixlover = await prisma.user.create({
    data: {
      username: 'twixlover',
      // this is a hashed version of "twixrox"
      passwordHash:
        '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      const data = { userId: twixlover.id, ...post };
      return prisma.post.create({ data });
    })
  );
};

const getPosts = () => {
  return [
    {
      title: 'JavaScript Performance Tips',
      content: `We will look at 10 simple tips and tricks to increase the speed of your code when writing JS`,
    },
    {
      title: 'Tailwind vs. Bootstrap',
      content: `Both Tailwind and Bootstrap are very popular CSS frameworks. In this article, we will compare them`,
    },
    {
      title: 'Writing Great Unit Tests',
      content: `We will look at 10 simple tips and tricks on writing unit tests in JavaScript`,
    },
    {
      title: 'What Is New In PHP 8?',
      content: `In this article we will look at some of the new features offered in version 8 of PHP`,
    },
  ];
};

seed();
