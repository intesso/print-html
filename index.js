module.exports = function printHtml(document) {
  var node = document.doctype;
  // add doctype
  var html = (!node) ? "" : "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>';

  // add previous siblings
  function backToStart(node) {
    // first navigate to the first sibling
    if (node.previousSibling) backToStart(node.previousSibling);
    // then add the string representation of the nodes ('backward' recursion)
    debug("render node", node.nodeType, node.nodeValue);
    switch (node.nodeType) {
      case 8: // comment
        html += "<!--" + node.nodeValue + "-->";
        break;
        // case 10: // doctype: jsDom does not know doctype as previousSibling.
    }
  }
  backToStart(document.documentElement);

  html += document.documentElement.outerHTML;
  debug("render html", html);
  return html;
}