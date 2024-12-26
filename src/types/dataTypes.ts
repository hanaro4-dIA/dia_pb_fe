// 상담일지 타입 (Journals.json)
export type TJournalsProps = {
  id: number;
  pbId: number;
  customerId: number;
  categoryId: number;
  statusId: number;
  pbName: string;
  consultTitle: string;
  consultDate: string;
  contents: string;
  categoryName: string;
  journalProducts?: TJournalProduct[];
  complete: boolean;
};

// 추천 상품 타입
type TJournalProduct = {
  id: number | null;
  productName: string;
  productUrl: string;
  productImageUrl: string;
};

// 스크립트 타입
export type TScriptProps = {
  scriptId: number;
  scriptSequence: number;
  speaker: string;
  content: string;
};

// 한 PB에게 배정된 하나의 상담 타입 (Consultaion)
export type TConsultationProps = {
  id: number;
  customerId: number;
  customerName: string;
  categoryId?: number;
  categoryName?: string;
  title: string;
  content: string;
  hopeDate: string;
  hopeTime: string;
  reserveDate: string;
  reserveTime: string;
  approve: boolean;
};

// PB 개인정보 타입 (PB.json)
export type TPbDataProps = {
  id: number;
  loginId: string;
  password: string;
  name: string;
  imageUrl: string;
  introduce: string;
  office: string;
  hashtagList: string[];
  availability: boolean;
};

// 상담 카테고리 타입 (Category.json)
export type TCategoryProps = {
  id: number;
  name: string;
};

// 손님 타입 (Customers.json)
export type TCustomerProps = {
  id: number;
  pbId: number;
  name: string;
  email: string;
  password: string;
  tel: string;
  address: string;
  date: string;
  count: number;
  memo: string;
};

// 쪽지 타입 (Notifications.json)
export type TNotificationProps = {
  id: number;
  customerId: number;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
};

// 딕셔너리의 키워드 타입 (dictionary.ts)
export type TKeywordProps = {
  id: number;
  title: string;
  content: string;
};
