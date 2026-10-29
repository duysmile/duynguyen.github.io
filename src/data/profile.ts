import type { Profile } from './types';

// Sources: CV 2026, CV 2023, Xendit notes, git history. See docs/changes/2026-10-29-portfolio-rebuild/profile.md.
export const profile: Profile = {
  name: 'Nguyen Duy',
  nickname: 'Bean',
  headline: 'build it, ship it',
  intro:
    "Backend engineer, seven years. I take systems from a blank page to production and keep them quiet once they're live. Payments at Xendit since 2023.",
  summary:
    'I build production systems in Go, Node.js and React, with a focus on payments, distributed systems and reliability. I like owning work end to end: at Xendit I built the Offline Payments backend from scratch, and it has run in production for over a year with zero critical payment incidents.',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'duy210697@gmail.com',
  github: 'https://github.com/duysmile',

  log: [
    { when: '2018', level: 'INFO', msg: 'rikkeisoft: cinema tickets on lambda' },
    { when: '2019', level: 'INFO', msg: 'em&ai: chatbot platform, from scratch' },
    { when: '2020', level: 'OK', msg: 'award: best employee of the year' },
    { when: '2021', level: 'INFO', msg: 'f6galaxy: real-time poker engine' },
    { when: '2022', level: 'INFO', msg: 'o2o: campaigns -> 200+ stores' },
    { when: '2023', level: 'INFO', msg: 'xendit: offline payments, day 0' },
    { when: 'then', level: 'OK', msg: 'id -> my -> vn' },
    { when: 'now', level: 'OK', msg: '1y+ live, 0 critical incidents' },
    { when: 'now', level: 'INFO', msg: 'fuel: latte, refilled' },
  ],

  jobs: [
    {
      org: 'Xendit',
      role: 'Software Engineer, Backend & Payments',
      when: 'Aug 2023 – now',
      context: 'Regional Expansion · Experiments team · full-time, remote',
      stack: ['Go', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS SQS', 'Kubernetes', 'Buddy CI/CD'],
      groups: [
        {
          name: 'Offline Payments (card terminals)',
          points: [
            'Owned backend design and build from scratch: merchants take card and QR payments on Xendit terminals, tracked with online payments.',
            'Turned an Indonesia-only flow into reusable APIs, data models and workflows; expanded to Malaysia and Vietnam.',
            'Live for 1+ year with zero critical payment incidents.',
            'Phase 2: POS integration, payment sessions, middleware to the terminal provider; Go tool to reconcile bank reports.',
          ],
        },
        {
          name: 'Vietnam payments',
          points: [
            'NAPAS card acquiring: connector, processor, payment-result handling, card data encryption.',
            'CITAD transfers above 500M VND and to banks outside NAPAS, via Payouts API and Dashboard; no merchant code change.',
            'Virtual accounts and all VN eWallets in Checkout; pending-redirect URL and refunds for eWallets; Cake VA connector.',
          ],
        },
        {
          name: 'Nova loyalty app (internal)',
          points: ['Recurring schedules, role-based access, localization, Postgres search, background jobs with retries.'],
        },
      ],
    },
    {
      org: 'Offline2Online',
      role: 'Backend Developer (part-time)',
      when: 'May 2022 – May 2026',
      context: 'Personalisation Hub, an in-store retail platform for a major Australian telco · team of 8',
      stack: ['Go', 'Echo', 'PostgreSQL', 'Redis', 'Dialogflow', 'ELK', 'Terraform', 'AWS'],
      groups: [
        {
          name: 'Personalisation Hub',
          points: [
            'Campaign management and delivery to in-store displays: 500+ campaigns across 200+ stores.',
            'Store queueing and appointments: ~100 daily visits, ~30% shorter waits.',
            'AI image and video generation for ads: asset time from days to hours (~70%).',
          ],
        },
        {
          name: 'Installer and licensing',
          points: [
            'AWS Marketplace installer: CloudFormation and Terraform provision EKS, RDS and S3; hibernate/wake to cut cost; usage metering.',
            'License server for customer installs.',
          ],
        },
      ],
    },
    {
      org: 'F6 Galaxy',
      role: 'Backend Developer',
      when: 'Sep 2021 – May 2023',
      context: 'Pokerage, a real-time multiplayer poker platform · team of 10 · part-time, then full-time',
      stack: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'MongoDB', 'Kafka', 'Kubernetes', 'GCP'],
      groups: [
        {
          name: 'Pokerage',
          points: [
            'Designed the backend and code structure from day one.',
            'Game flow, poker rules, state management, matchmaking, tournaments, real-time play.',
            'Redesigned socket state sync that let clients fall out of sync and get stuck.',
          ],
        },
      ],
    },
    {
      org: 'EM&AI',
      role: 'Full-stack Developer',
      when: 'Jun 2019 – May 2022',
      context: 'VNLP, a chatbot and voice-bot platform · team of 10',
      stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Socket.io', 'Angular', 'React', 'Kubernetes', 'AWS', 'GCP'],
      groups: [
        {
          name: 'VNLP',
          points: [
            'Designed the core backend: conversation context, training-data processing, deployment.',
            'Several thousand calls per day, with Redis caching.',
            'Observability with ELK, Prometheus, Grafana and Jaeger; voice bots on Asterisk PBX.',
          ],
        },
      ],
    },
  ],

  earlier: {
    org: 'Earlier',
    role: 'Full-stack Developer',
    when: '2018 – 2020',
    context: 'Team of 5 and team of 8',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'DynamoDB', 'Lambda', 'Vue'],
    groups: [
      {
        name: 'Online Education System (2019–20)',
        points: [
          'Udemy-style course platform for Vietnamese learners: business model, system design, video APIs, React frontend, Node backend.',
        ],
      },
      { name: 'Rikkeisoft — cinema tickets (2018–19)', points: ['Frontend and backend for a ticketing system on serverless AWS.'] },
    ],
  },

  skills: [
    { area: 'Languages', items: 'Go, JavaScript / TypeScript' },
    { area: 'Backend', items: 'Node.js, REST, gRPC, microservices, distributed systems' },
    { area: 'Frontend', items: 'React, Angular, Vue' },
    { area: 'Data & messaging', items: 'PostgreSQL, MySQL, MongoDB, Redis, Kafka, RabbitMQ, AWS SQS' },
    { area: 'Cloud & ops', items: 'AWS, Google Cloud, Kubernetes, Docker, Terraform, NGINX, Linux' },
    { area: 'Observability', items: 'Prometheus, Grafana, ELK, Jaeger' },
    { area: 'Domain', items: 'Payments: cards, virtual accounts, eWallets, disbursement, card terminals' },
  ],

  education: { school: 'Danang University of Technology', degree: 'B.Eng. Information Technology', when: '2015 – 2020' },
  awards: [{ title: 'Best Employee of the Year', org: 'EM&AI', year: 2020 }],

  work: [
    { when: '2026', name: 'MyCollectibles', org: 'VelocityLabs', what: 'Loans backed by trading cards: pledging, price updates, shipping, interest accrual, agent and referral lending.', stack: ['Go', 'gRPC', 'Postgres', 'Redis'] },
    { when: '2026', name: 'Perp CEX', org: 'VelocityLabs', what: 'Exchange backend: wallet custody, reviewed withdrawals, treasury sweep, double-entry ledger, solvency checks.', stack: ['Go', 'gRPC', 'Postgres', 'Asynq'] },
    { when: '2023–now', name: 'Offline Payments', org: 'Xendit', what: 'Card and QR payments on terminals in Indonesia, Malaysia and Vietnam. Built from scratch; 1+ year with zero critical incidents.', stack: ['Go', 'Node.js', 'Postgres', 'SQS', 'k8s'] },
    { when: '2024', name: 'NAPAS card acquiring', org: 'Xendit', what: 'Vietnam card payments: connector, processor, result handling, card data encryption.', stack: ['Go', 'Node.js'] },
    { when: '2023–24', name: 'CITAD disbursement', org: 'Xendit', what: 'Transfers above 500M VND and to banks outside NAPAS, via API and Dashboard; auto-withdrawal support.', stack: ['Node.js', 'React'] },
    { when: '2023–24', name: 'Vietnam Checkout', org: 'Xendit', what: 'Virtual accounts and all VN eWallets in Checkout; pending redirect and refunds for eWallets.', stack: ['Node.js', 'Go', 'React'] },
    { when: '2024', name: 'Nova loyalty app', org: 'Xendit (internal)', what: 'Recurring schedules, role-based access, localization, Postgres search, background jobs.', stack: ['Go', 'Postgres', 'Asynq'] },
    { when: '2022–26', name: 'Personalisation Hub', org: 'Offline2Online', what: 'In-store retail platform: campaigns to 200+ stores, queueing with ~30% shorter waits, AI ad generation.', stack: ['Go', 'Echo', 'Postgres', 'Redis', 'AWS'] },
    { when: '2024–26', name: 'AWS Marketplace installer', org: 'Offline2Online', what: 'One-click install of the platform on a customer AWS account: EKS, RDS, S3, hibernate/wake, metering.', stack: ['Go', 'Terraform', 'CloudFormation', 'React'] },
    { when: '2022–24', name: 'License server', org: 'Offline2Online', what: 'Licensing for customer installs.', stack: ['Go'] },
    { when: '2021–23', name: 'Pokerage', org: 'F6 Galaxy', what: 'Real-time multiplayer poker: game engine, matchmaking, tournaments, socket state sync.', stack: ['Go', 'gRPC', 'Kafka', 'GCP'] },
    { when: '2019–22', name: 'VNLP', org: 'EM&AI', what: 'Chatbot and voice-bot platform; several thousand calls a day; full observability stack.', stack: ['Node.js', 'MongoDB', 'Redis', 'Asterisk'] },
    { when: '2019–20', name: 'Online Education', org: 'Team of 5', what: 'Udemy-style course platform for Vietnamese learners: system design, video APIs, web app.', stack: ['React', 'Node.js', 'Express'] },
    { when: '2018–19', name: 'Cinema tickets', org: 'Rikkeisoft', what: 'Ticketing system on serverless AWS.', stack: ['Node.js', 'Lambda', 'DynamoDB', 'Vue'] },
  ],

  oss: [
    { repo: 'vnteamopen/config-template', url: 'https://github.com/vnteamopen/config-template/pulls?q=is%3Apr+author%3Aduysmile', lang: 'Go', prs: 4, what: 'Nested templates, custom patterns, faster pattern search, write back to the input file.' },
    { repo: 'ledongthuc/awssecretsmanagerui', url: 'https://github.com/ledongthuc/awssecretsmanagerui/pulls?q=is%3Apr+author%3Aduysmile', lang: 'Go', prs: 5, what: 'JWT auth for the API, filter-secrets-by-name API with tests, safer requests for sensitive calls.' },
    { repo: 'vnteamopen/config-env', url: 'https://github.com/vnteamopen/config-env/pulls?q=is%3Apr+author%3Aduysmile', lang: 'Go', prs: 2, what: 'Default values; feature sync with config-template.' },
    { repo: 'vnteamopen/dataservicex', url: 'https://github.com/vnteamopen/dataservicex/pulls?q=is%3Apr+author%3Aduysmile', lang: 'Go', prs: 1, what: 'Integration tests against real MySQL and Postgres.' },
  ],
};
