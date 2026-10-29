import { githubPostSource } from './github';

export const blogSource = githubPostSource({
  owner: 'duysmile',
  repo: 'blogs-github',
  dir: 'blogs',
  ref: 'master',
  token: process.env.GITHUB_TOKEN,
});
