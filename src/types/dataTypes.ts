// 상담일지 타입 (Journals.json)
export type TJournalsProps = {
  id: number;
  pb_id: number; // 작성한 pb ID
  customer_id: number;
  category_id: number;
  status_id: number;
  title: string;
  date: string;
  content: string;
};

// 한 PB에게 배정된 하나의 상담 타입 (Consultings.json)
export type TRequestedConsultationsProps = {
  id: number;
  customer_pb_id: number;
  name: string; // 손님 이름
  title?: string; // (빠른 상담에선 X) 손님이 선택한 제목
  category_id?: number; // (빠른 상담에선 X) 손님이 선택한 카테고리
  hopeDay: string; // 상담 희망일
  hopeTime: string; // 상담 희망 시각
  inquiryDetails?: string; // (빠른 상담에선 X) 상담 문의 내용
  requestDay: string; // 상담 신청일
  approvalStatus: boolean; // 상담 승인 여부
  finishStatus: boolean; // 상담 완료 여부
  quick: boolean; // 빠른 상담 요청 여부
};

// [x] PB 개인정보 타입 (PB.json)
export type TPbProps = {
  id: number;
  login_id: string;
  password: string;
  name: string;
  image_url: string;
  introduce: string;
  office: string;
  tags: string[];
  availability: boolean;
};

// [x] 상담 카테고리 타입 (Category.json)
export type TCategoryProps = {
  id: number;
  name: string;
};

// [x] 손님 타입 (Customers.json)
export type TCustomerProps = {
  id: number;
  pb_id: number;
  name: string;
  email: string;
  password: string;
  tel: string;
  address: string;
  date: string;
  count: number;
  memo: string;
};

// [x] 쪽지 타입 (Notifications.json)
export type TNotificationProps = {
  id: number;
  customer_id: number;
  title: string;
  content: string;
  date: string;
  is_read: boolean;
};

// [x] DB 키워드 타입 (dictionary.ts)
export type TDbItemProps = {
  id: number;
  title: string;
  content: string;
};
