export function renderActiveForksUrl(activeForksUrl: string): string {
  var path = window.location.pathname.substring(1);
  return `${activeForksUrl}/#${path}`;
}

export function makeOpenInPopup(a: HTMLAnchorElement): void {
  a.onclick = () => {
    var w = window.open(
      a.href,
      a.target,
      "menubar=no,toolbar=no,location=no,dependent"
    );
    return !w;
  };
}
