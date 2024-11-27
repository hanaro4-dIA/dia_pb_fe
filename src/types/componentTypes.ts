import { ReactNode } from 'react';
import { TDbItemProps } from './dataTypes';

// 키워드 DB 리스트 컴포넌트 타입
export type TDictionaryListProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredDBList: TDbItemProps[];
  selectedItem: TDbItemProps | undefined;
  setSelectedItem: (item: TDbItemProps) => void;
};

// 키워드 DB 상세보기 컴포넌트 타입
export type TDictionaryDetailProps = {
  selectedItem: TDbItemProps | undefined;
};

// Section 컴포넌트 타입
export type TSectionProps = {
  pbProfile?: boolean;
  logoImg?: boolean;
  title: string;
  arrowToggle?: boolean;
  children: ReactNode;
  layoutClassName?: string;
  labelClassName?: string;
  contentClassName?: string;
  isEditing?: boolean;
  setIsEditing?: (editing: boolean) => void;
  handleSubmit?: () => void;
};

// IteratingListItem 컴포넌트 타입
export type TIteratingListItem = {
  id: number;
  title: string;
  content: string;
  isSelected?: boolean;
  onClick: () => void;
  date?: string;
};
