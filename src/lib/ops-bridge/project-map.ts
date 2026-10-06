export type OpsProject = {
  opsId: string;
  notionPageId: string;
  githubRepoId?: string;
  githubRepo?: string;
  vercelProjectId?: string;
  vercelProjectName?: string;
  supabaseRefs: string[];
};

export const OPS_PROJECTS: OpsProject[] = [
  {
    opsId: "pascaldev:ops-bridge",
    notionPageId: "3efc52c9-d146-8159-b868-e792fbdb9b26",
    githubRepoId: "1069836211",
    githubRepo: "pascal1010100/pascal-neo-workspace",
    supabaseRefs: [],
  },
  {
    opsId: "pascaldev:portfolio",
    notionPageId: "3b2c52c9-d146-80b7-a4f4-d818ea533968",
    githubRepoId: "1027335001",
    githubRepo: "pascal1010100/portafolio1010100",
    vercelProjectId: "prj_NmsPNtx4gm9HZAASfdnCc8AEC37m",
    vercelProjectName: "portafolio1010100",
    supabaseRefs: [],
  },
  {
    opsId: "pascaldev:mandalas",
    notionPageId: "3b2c52c9-d146-8063-89eb-efe92e698ac1",
    githubRepoId: "1112537536",
    githubRepo: "pascal1010100/mandalas",
    vercelProjectId: "prj_c7gk9h1FRmXJpGepL5zsm0k7Nf5i",
    vercelProjectName: "mandalas",
    supabaseRefs: [
      "zfbrcdwkunbvjnxmwlor",
      "lwrnljsufsgezvkyvzxh",
    ],
  },
  {
    opsId: "pascaldev:nativa",
    notionPageId: "3b3c52c9-d146-8083-ab39-e00acac00496",
    githubRepoId: "1266374275",
    githubRepo: "pascal1010100/nativa",
    vercelProjectId: "prj_EstMb6mlrVpWg31YGN5BAgA15NwP",
    vercelProjectName: "nativa",
    supabaseRefs: ["jqptaciyusdetrszmvax"],
  },
  {
    opsId: "pascaldev:nomada-fantasma",
    notionPageId: "3b3c52c9-d146-80a3-9328-e2c0c232e2e4",
    githubRepoId: "1053599765",
    githubRepo: "pascal1010100/nomada-fantasma",
    vercelProjectId: "prj_DnIUpNMXf66Qkhwr2lY0dbnYw8ov",
    vercelProjectName: "nomada-fantasma",
    supabaseRefs: [],
  },
  {
    opsId: "pascaldev:guateraw-travel",
    notionPageId: "3b3c52c9-d146-8093-940d-fedb0923e3fd",
    githubRepoId: "1281830060",
    githubRepo: "pascal1010100/guateraw-travel",
    vercelProjectId: "prj_hNwXRyByxcUfTfgpH9tS2uxXYnLW",
    vercelProjectName: "guateraw-travel",
    supabaseRefs: [],
  },
  {
    opsId: "pascaldev:not-your-money-laundry",
    notionPageId: "3efc52c9-d146-81f3-b37b-e07735877ae3",
    githubRepoId: "1237880307",
    githubRepo: "pascal1010100/not-your-money-laundry",
    vercelProjectId: "prj_U4s9QcYy5RI0apKHhUle2MIMBWEv",
    vercelProjectName: "not-your-money-laundry",
    supabaseRefs: ["tbxpvmmajcvlojucratx"],
  },
  {
    opsId: "pascaldev:content-lab",
    notionPageId: "3eec52c9-d146-817d-afec-da9cd4646c7b",
    supabaseRefs: [],
  },
];

export function findProjectByGitHubRepoId(repoId: string) {
  return OPS_PROJECTS.find((project) => project.githubRepoId === repoId);
}
