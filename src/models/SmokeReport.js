export default class SmokeReport {
  id;
  perlId;
  gitDescribe;
  gitId;
  plevel;
  smokeBranch;
  smokeDate;
  hostname;
  architecture;
  cpuCount;
  cpuDescription;
  osname;
  osversion;
  username;
  summary;

/*
    {
      "id": 6,
      "perl_id": "5.37.4",
      "git_describe": "v5.37.2-421-g7a29e8d2c8",
      "git_id": "7a29e8d2c80588346422b4b6b936e6f8b56a3af4",
      "plevel": "5.037002zzz421",
      "smoke_branch": "blead",
      "smoke_date": "2022-09-04 03:05:04+02",
      "hostname": "idefix"
      "architecture": "arm64",
      "cpu_count": " [10 (8 performance and 2 efficiency) cores]",
      "cpu_description": "MacBook Pro (0)",
      "osname": "darwin",
      "osversion": "21.6.0 (Mac OS X - macOS 12.5.1 (21G83))",
      "username": "abeltje",
      "summary": "PASS",
    }
*/
  constructor(
    id,
    perlId,
    gitDescribe,
    gitId,
    plevel,
    smokeBranch,
    smokeDate,
    hostname,
    architecture,
    cpuCount,
    cpuDescription,
    osname,
    osversion,
    username,
    summary
  ) {
    this.id = id;
    this.perlId = perlId;
    this.gitDescribe = gitDescribe;
    this.gitId = gitId;
    this.plevel = plevel;
    this.smokeBranch = smokeBranch;
    this.smokeDate = smokeDate;
    this.hostname = hostname;
    this.architecture = architecture;
    this.cpuCount = cpuCount;
    this.cpuDescription = cpuDescription;
    this.osname = osname;
    this.osversion = osversion;
    this.username = username;
    this.summary = summary;
  }
}
