import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme, Theme } from '@storytelly/utils';
import { Button } from '@storytelly/components/ui';

export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  const handleClick = () =>
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);

  return (
    <Button variant="ghost" className="w-9 px-0" onClick={handleClick}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
