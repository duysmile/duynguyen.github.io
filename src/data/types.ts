export type Job = {
  org: string;
  role: string;
  when: string;
  context: string;
  groups: { name: string; points: string[] }[];
  stack: string[];
};

export type WorkProject = { when: string; name: string; org: string; what: string; stack: string[] };

export type OssContribution = { repo: string; url: string; lang: string; prs: number; what: string };

export type LogLine = { when: string; level: 'INFO' | 'OK'; msg: string };

export type Profile = {
  name: string;
  nickname: string;
  headline: string;
  intro: string;
  summary: string;
  location: string;
  email: string;
  github: string;
  log: LogLine[];
  jobs: Job[];
  earlier: Job;
  skills: { area: string; items: string }[];
  education: { school: string; degree: string; when: string };
  awards: { title: string; org: string; year: number }[];
  work: WorkProject[];
  oss: OssContribution[];
};
