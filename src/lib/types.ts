// 상담일지 타입 (Journals.json)
export type TJournalsProps = {
  id: number;
  customer_pb_id: number;
  category_id: number;
  status_id: number;
  title: string;
  date: string;
  content: string;
};

// 한 PB에게 배정된 하나의 상담 타입 (Consultings.json)
export type TRequestedConsultationsProps = {
  id: number;
  customer_id: number;
  name: string; // 손님 이름
  title: string; // 손님이 선택한 제목
  category: string; // 손님이 선택한 카테고리
  hopeDay: string; // 상담 희망일
  hopeTime: string; // 상담 희망 시각
  inquiryDetails: string; // 상담 문의 내용
  requestDay: string; // 상담 신청일
  approvalStatus: boolean; // 상담 승인 여부
  finishStatus: boolean; // 상담 완료 여부
};

// PB 개인정보 타입 (PB.json)
export type TPbProps = {
  id: number;
  businessId: number; // 사번
  password?: string;
  name: string;
  sex?: string;
  birthday?: string;
  image_url: string;
  tags: string[];
  introduce: string; // 한줄소개
  office_id: number;
};

// PB가 관리하는 손님 (Customer_PB.json)
export type TCustomerPbProps = {
  id: number;
  customer_id: number;
  pb_id: number;
  date: string; // 매칭된 날짜
  count: number; // 상담 횟수
  memo: string;
};
