// cypress/support/sla-reporter.js
Cypress.Commands.add('generateSLAReport', (metrics) => {
  const report = {
    timestamp: new Date().toISOString(),
    slaConfig: SLA_CONFIG,
    metrics: metrics,
    summary: {
      status: 'PASS',
      violations: []
    }
  };

  // Análise de violações de SLA
  if (metrics.pageLoadTimes.some(time => time > SLA_CONFIG.PAGE_LOAD)) {
    report.summary.violations.push('Page load time SLA violated');
    report.summary.status = 'FAIL';
  }

  if (metrics.navigationTimes.some(time => time > SLA_CONFIG.NAVIGATION)) {
    report.summary.violations.push('Navigation time SLA violated');
    report.summary.status = 'FAIL';
  }

  if (metrics.errors.length > 0) {
    report.summary.violations.push('Error rate SLA violated');
    report.summary.status = 'FAIL';
  }

  // Salva relatório em arquivo (para CI/CD)
  cy.writeFile('cypress/reports/sla-report.json', JSON.stringify(report, null, 2));
  
  return cy.wrap(report);
});