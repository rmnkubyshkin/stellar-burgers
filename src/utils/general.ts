export function getIdFromPathname(pathname: string) {
  const regex = /.*\/(.*)/;
  const id: RegExpExecArray | null = regex.exec(pathname);
  return id && id[1];
}
