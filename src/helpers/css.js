function rowClass(row) {
  return row % 2 ? "odd" : "even";
}

function summaryClass(summary) {
  const buildFailed = new RegExp('[cCmM]');
  if (summary === 'PASS')        { return 'passtest'  }
  if (summary === 'FAIL(X)')     { return 'failtodo'  }
  if (buildFailed.test(summary)) { return 'failbuild' }
  return 'failtest';
}

export { rowClass, summaryClass }
