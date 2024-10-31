const getOffice = (office_id: number) => {
  let officeName = '하나은행 골드클럽';
  switch (office_id) {
    case 1:
      officeName = '하나은행 서압구정 골드클럽';
      break;
    case 2:
      officeName = '하나은행 롯데월드타워 골드클럽';
      break;
    case 3:
      officeName = '하나은행 대치동 골드클럽';
      break;
    case 4:
      officeName = '하나은행 법조타운 골드클럽';
      break;
    case 5:
      officeName = '하나은행 방배서래 골드클럽';
      break;
    case 6:
      officeName = '하나은행 목동 골드클럽';
      break;
    case 7:
      officeName = '하나은행 둔산 골드클럽';
      break;
    case 8:
      officeName = '하나은행 대구중앙 골드클럽';
      break;
  }
  return officeName;
};
export default getOffice;
