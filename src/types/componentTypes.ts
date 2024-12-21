import { ReactNode } from 'react';
import { TConsultationProps, type TKeywordProps } from './dataTypes';

// 키워드 DB 리스트 컴포넌트 타입
export type TDictionaryListProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredDBList?: TKeywordProps[];
  selectedItem: TKeywordProps | undefined;
  setSelectedItem: (item: TKeywordProps) => void;
};

// 키워드 DB 상세보기 컴포넌트 타입
export type TDictionaryDetailProps = {
  selectedItem: TKeywordProps | undefined;
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

// NavigationBtn 안의 SubButton 컴포넌트 타입
export type TSubButtonProp = {
  icon: React.ReactNode;
  color: string;
  title: string;
  path?: string;
  target?: string;
  onClick?: () => void;
};

// 전역상태 ConsultationContext 타입
export type TConsultationContextType = {
  requestedConsultations: TConsultationProps[];
  // approvedConsultations: TConsultingProps[];
  fetchRequestedConsultations: () => void;
  // fetchApprovedConsultations: (customerId?: number) => void;
  // approveConsultation: (id: number) => Promise<void>;
};
