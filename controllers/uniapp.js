/**
 * GET /contact
 * Contact form page.
 */
exports.getOverview = function(req, res) {
  res.render('uniapp/overview', {
    title: 'Overview'
  });
};