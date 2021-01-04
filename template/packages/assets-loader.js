export default {
  requireAllSvg: function() {
    const requireAll = (requireContext) => requireContext.keys().map(requireContext)
    const req = require.context('./assets/icon', true, /\.svg$/)
    console.log(req)
    requireAll(req)
  }
}
