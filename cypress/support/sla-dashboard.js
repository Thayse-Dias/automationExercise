// cypress/support/sla-dashboard.js
Cypress.Commands.add('displaySLADashboard', () => {
  cy.log('📈 ===== SLA LIVE DASHBOARD =====');
  cy.log(`🟢 Uptime: ${calculateUptime()}%`);
  cy.log(`⚡ Performance: ${calculatePerformanceScore()}%`);
  cy.log(`🔴 Errors: ${performanceMetrics.errors.length}`);
  cy.log(`📊 Response Time: ${calculateAverageResponseTime()}ms`);
});

function calculateUptime() {
  const totalTests = performanceMetrics.pageLoadTimes.length;
  const successfulTests = totalTests - performanceMetrics.errors.length;
  return totalTests > 0 ? ((successfulTests / totalTests) * 100).toFixed(2) : 100;
}

function calculatePerformanceScore() {
  const allTimes = [...performanceMetrics.pageLoadTimes, ...performanceMetrics.navigationTimes];
  const optimalTimes = allTimes.filter(time => time < 2000);
  return allTimes.length > 0 ? ((optimalTimes.length / allTimes.length) * 100).toFixed(2) : 100;
}

function calculateAverageResponseTime() {
  const allTimes = [...performanceMetrics.pageLoadTimes, ...performanceMetrics.navigationTimes];
  return allTimes.length > 0 ? (allTimes.reduce((a, b) => a + b, 0) / allTimes.length).toFixed(2) : 0;
}