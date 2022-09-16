import { logTrace, logDebug } from '@/helpers/logging';

export default class SearchParameters {
   architectureHostOs;
   compilerVersions;
   perlVersions;
   branches;

  constructor(
    architectureHostOs,
    compilerVersions,
    perlVersions,
    branches
  ) {
    this.architectureHostOs = architectureHostOs;
    this.compilerVersions = compilerVersions;
    this.perlVersions = perlVersions;
    this.branches = branches;
  }

  architectures(currentSettings) {
    const archs = this.filterFromAHO('arch', currentSettings);

    logDebug(`architectures: ${JSON.stringify(archs)}`);

    return archs;
  }

  hosts(currentSettings) {
    const hosts = this.filterFromAHO('hostname', currentSettings);

    logDebug(`hosts: ${JSON.stringify(hosts)}`);

    return hosts;
  }

  osnames(currentSettings) {
    const osnames = this.filterFromAHO('os', currentSettings);

    logDebug(`oses: ${JSON.stringify(osnames)}`);

    return osnames;
  }

  osversions(currentSettings) {
    const osversions = this.filterFromAHO('osversion', currentSettings);

    logDebug(`oses: ${JSON.stringify(osversions)}`);

    return osversions;
  }

  ccnames(currentSettings) {
    const ccnames = this.filterFromCV('comp', currentSettings);

    logDebug(`ccnames: ${JSON.stringify(ccnames)}`);

    return ccnames;
  }

  ccversions(currentSettings) {
    const ccversions = this.filterFromCV('compversion', currentSettings);

    logDebug(`ccversions: ${JSON.stringify(ccversions)}`);

    return ccversions;
  }

  filterFromAHO(fieldname, currentSettings) {
    return this.filterFromObject(this.architectureHostOs, fieldname, currentSettings);
  }

  filterFromCV(fieldname, currentSettings) {
    return this.filterFromObject(this.compilerVersions, fieldname, currentSettings);
  }

  filterFromObject(searchObject, fieldname, currentSettings) {
    let items = {};
    for (const obj of searchObject) {
      let ok = true;
      for (const key of Object.keys(currentSettings)) {
        logTrace(`Test ${fieldname}/${key} => ${obj[fieldname]}/${currentSettings[key]}`);
        if (key in obj && currentSettings[key].length) {
          ok = ok && (obj[key] === currentSettings[key]);
          logTrace(`Tested ${obj[key]} === ${currentSettings[key]}`);
        }
      }
      if (ok) { items[ obj[fieldname] ] = items[ obj[fieldname] ] || 0 + 1; }
    }
    logDebug(`Found: ${JSON.stringify(items)}`);

    return Object.keys(items).sort();
  }
}
