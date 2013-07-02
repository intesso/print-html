module.exports = function printHtml(document) {
  var node = document.doctype;
  // add doctype
  var html = (!node) ? "" : "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>';

  // add previous siblings
  function recurse(node) {
    // first navigate to the first sibling
    if (node.previousSibling) recurse(node.previousSibling);
    // then add the string representation of the nodes ('backward' recursion)
    switch (node.nodeType) {
      case 8: // comment
        html += "<!--" + node.nodeValue + "-->";
        break;
        // case 10: // doctype: jsDom does not know doctype as previousSibling.
    }
  }
  recurse(document.documentElement);
  html += document.documentElement.outerHTML;
  return html;
}