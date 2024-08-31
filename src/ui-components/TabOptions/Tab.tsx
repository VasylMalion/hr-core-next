import { memo } from 'react';

export type TabOption<T = string> = {
  title: string;
  testId?: string;
  value: T;
};

type TabProps<T> = {
  isActive?: boolean;
  onChange?: (value: T) => void;
} & TabOption<T>;

const Tab = <T,>({
  title,
  value,
  testId,
  isActive,
  onChange,
}: TabProps<T>) => (
  <div
    data-testid={testId}
    onClick={() => onChange?.(value)}
    className={`
      p-1 cursor-pointer whitespace-pre
      ${
        isActive
          ? 'dark:text-white text-gray-600 border-b-[0.1875rem] border-b-green'
          : 'text-gray-500'
      }
    `}
  >
    {title}
  </div>
);

export default memo(Tab);