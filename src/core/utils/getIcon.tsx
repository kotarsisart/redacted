const iconModules = import.meta.glob(
  '../../assets/sections/indie/*.svg',
  { eager: true, import: 'default' }
) as Record<string, string>;

export function getIcon(name: string) {
  for (const [path, mod] of Object.entries(iconModules)) {
    if (path.includes(`${name}.svg`)) {
      return mod;
    }
  }
  return "";
}
