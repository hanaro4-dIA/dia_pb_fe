import { useState } from 'react';
import { SearchField } from '../components/SearchField';

// 키워드 DB 리스트 타입 지정
type TDBItemProps = {
  id: number;
  title: string;
  url: string;
  content: string;
};

// 키워드 DB 목록
const dbList: TDBItemProps[] = [
  {
    id: 1,
    title: '가계부실위험지수(HDRI)',
    url: 'http://www.google.com/',
    content:
      '가구의 소득 흐름은 물론 금융 및 실물 자산까지 종합적으로 고려하여 가계부채의 부실위험을 평가하는 지표로, 가계의 채무상환능력을 소득 측면에서 평가하는 원리금상환비율(DSR; Debt Service Ratio)과 자산 측면에서 평가하는 부채/자산비율(DTA; Debt To Asset Ratio)을 결합하여 산출한 지수이다. 가계부실위험지수는 가구의 DSR과 DTA가 각각 40%, 100%일 때 100의 값을 갖도록 설정되어 있으며, 동 지수가 100을 초과하는 가구를 ‘위험가구’로 분류한다. 위험가구는 소득 및 자산 측면에서 모두 취약한 ‘고위험가구’, 자산 측면에서 취약한 ‘고DTA가구’, 소득 측면에서 취약한 ‘고DSR가구’로 구분할 수 있다. 다만 위험 및 고위험 가구는 가구의 채무상환능력 취약성 정도를 평가하기 위한 것이며 이들 가구가 당장 채무상환 불이행, 즉 임계상황에 직면한 것을 의미하지 않는다.',
  },
  {
    id: 2,
    title: '난외거래',
    url: 'http://www.google.com/',
    content:
      '데드 캣 바운스(영어: Dead cat bounce)는 주식 투자 용어이다. 주가가 급락 후 임시로 소폭 회복된 것을 의미한다. 즉 폭락장 가운데서도 가끔 주가가 튀어오르는 것을 죽은 고양이가 꿈틀한다는 식으로 표현한 것이다. "높은 곳에서 떨어 뜨리면 죽은 고양이도 튀어오른다."(Even a dead cat will bounce if it falls from a great height) 라는 월 가에서 유래한 문장이 시초이다.',
  },
  {
    id: 3,
    title: '담보인정비율(LTV)',
    url: 'http://www.google.com/',
    content:
      '자산의 담보가치에 대한 대출 비율을 의미하며, 우리나라에서는 주택가격에 대한 대출 비율로 많이 알려져 있다. 예를 들어 아파트 감정가격이 5억원이고 담보인정비율이 70%이면 금융기관으로부터 3억 5천만원의 주택담보대출을 받을 수 있다. [은행업 감독업무시행세칙]에서는 주택담보대출의 담보인정비율 산정방식을 다음과 같이 제시하고 있다. 담보인정비율 = (주택담보대출+선순위채권+임차보증금 및 최우선변제 소액임차보증금)/담보가치×100. 여기서 담보가치는 ① 국세청 기준시가 ② 한국감정원 등 전문감정기관의 감정평가액 ③ 한국감정원의 층별·호별 격차율 지수로 산정한 가격 ④ KB부동산시세의 일반거래가격 중 금융기관 자율로 선택하여 적용한다. 당초 LTV(Loan to Value ratio) 규제는 은행권을 중심으로 내규에 반영하여 자율적으로 시행해 오다가 금융기관의 경영 안정성 유지, 주택가격 안정화 등을 위한 주택담보대출 규모의 관리 필요성이 제기되면서 감독규제 수단으로 도입되었다. 최근에는 가계부채 증가 억제 및 부동산경기 조절 등 거시건전성정책 수단으로 활용되고 있으며, 금융기관별, 지역별로 세분화하여 차등 적용되고 있다. 한편, 금융기관은 담보인정비율(LTV)과 차주의 부채상환능력을 나타내는 총부채상환비율(DTI)을 함께 고려하여 대출규모를 결정한다.',
  },
  {
    id: 4,
    title: '매매보호 서비스(escrow)',
    url: 'http://www.google.com/',
    content:
      '판매자와 구매자 사이의 신용관계가 불확실한 전자상거래 시 신뢰할 수 있는 중립적인 제삼자가 중개역할을 하여 상거래가 원활히 이루어질 수 있도록 하는 서비스를 말한다. 구체적으로는 전자상거래 시 소비자가 물품을 구매한 후 대금을 제삼자에게 보관하고, 판매자는 제삼자에게 입금 사실을 확인하고 구매자에게 물품을 발송한다. 구매자는 물품 확인 후 제삼자에게 물품의 도착 및 구매 여부를 알리고, 제삼자는 판매자에게 대금을 송금하는 절차로 이루어진다. 중개하는 제삼자는 수수료를 수익으로 얻는다. 에스크로(escrow) 서비스는 구매자의 인터넷 사기 피해나 판매자의 채권추심 비용 등 전자상거래 피해를 줄여주는 효과가 있다.',
  },
  {
    id: 5,
    title: '사전담보제',
    url: 'http://www.google.com/',
    content:
      '사전담보제(collateral requirements)는 지급결제시스템의 참가자로 하여금 시스템 전체에 대한 순채무를 결제하기에 충분한 담보를 사전에 제공토록 하여 결제불이행이 실제로 발생하였을 때 결제불이행 기관의 담보를 처분하여 결제의 종료를 보장하는 방법이다. 이는 참가기관간 결제차액만을 지정시점에 결제하는 이연차액결제시스템에서 일부 기관의 결제불이행이 연쇄적인 결제불이행으로 이어지지 않도록 하는 리스크 관리기법의 하나다. 예치 담보로는 중앙은행 예치금이나 국채 등 유동성이 높은 증권이 주로 이용되고 있다. 만약 각 참가기관이 자신의 순채무한도 전액에 해당하는 담보를 예치한다면 차액결제시스템은 결제불이행 기관의 수에 관계없이 나머지 참가기관에 어떠한 손실도 주지 않고 결제를 종료시킬 수 있다. 우리나라의 경우에도 차액결제시스템에 참가하는 금융기관은 국채, 정부보증채, 통화안정증권 등을 차액결제 이행을 위한 담보로 제공하도록 되어 있다.',
  },
  {
    id: 6,
    title: '양도성예금증서(CD)',
    url: 'http://www.google.com/',
    content:
      '양도성예금증서(CD; negotiable Certificate of Deposit)는 은행의 정기예금증서에 양도성을 부여한 것이다. CD는 1961년 미국의 대형은행들이 기업의 거액자금을 유치하기 위해 발행한 고수익 단기금융상품으로 출현하였다. 국내에서는 은행의 수신기반 강화를 위해 1984년 6월에 본격 도입되었다. CD는 만기 30일 이상으로 할인 발행되며 중도해지는 허용되지 않으나 양도가 가능하므로 보유 CD를 매각하여 현금화 할 수 있다. 현재 한국은행에 예금지급준비금을 예치할 의무가 있는 시중은행, 지방은행, 특수은행, 외은지점 등 한국수출입은행을 제외한 모든 은행이 CD를 발행할 수 있다. CD는 발행시 매수주체에 따라 대고객CD와 은행간CD로 구분된다. 대고객CD는 다시 은행창구에서 직접 발행되는 창구CD와 중개기관(증권회사, 자금중개회사 등)의 중개를 통해 발행되는 시장성CD로 구분된다. 개인, 일반법인 등은 주로 발행은행 창구에서 직접 매입하는 반면 자산운용회사, 보험회사 등 금융기관은 중개기관을 통해 매입한다. 은행간CD는 은행상호간 자금의 과부족을 해소하기 위한 수단으로 발행은행과 매수은행간 직접 교섭에 의해 발행되며 양도가 엄격히 금지된다. 대고객CD는 한국은행법상 예금채무에 해당하여 일반 정기예금과 같이 2%의 지급준비금 적립의무가 부과되고 있으나 은행간CD의 경우 지급준비금 적립대상에서 제외된다. 한편 CD는 2001년부터 예금보호대상에서 제외되었다.',
  },
];

export default function DictionaryPage() {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [selectedItem, setSelectedItem] = useState<TDBItemProps>(); // 선택된 항목 상태

  // 검색어에 따라 DB 목록을 필터링하는 함수
  const filteredDBList = dbList.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 왼쪽 목록 영역 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-auto'>
          <div className='flex flex-col h-full bg-white '>
            {/* 헤더 */}
            <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
              키워드 DB 목록
            </div>
            <div className='overflow-auto border-x border-b border-gray-200'>
              <div className='sticky top-0 z-10 w-full bg-white'>
                <SearchField
                  placeholder='키워드 검색'
                  value={searchTerm}
                  onChange={setSearchTerm}
                />
              </div>

              {/* 필터링된 키워드 목록 */}
              <div className='p-4'>
                {filteredDBList.map((item) => (
                  <div
                    key={item.id}
                    className='mb-4'
                    onClick={() => setSelectedItem(item)}
                  >
                    {/* 선택한 키워드 */}
                    {item.id === selectedItem?.id ? (
                      <div className='border-2 border-hanaindigo rounded-lg p-4 shadow-lg cursor-pointer'>
                        <div className='text-black text-base font-bold'>
                          {item.title}
                        </div>
                        <div className='bg-hanagold/60 p-2 mt-2 rounded-lg'>
                          <div className='truncate w-full'>{item.content}</div>
                        </div>
                      </div>
                    ) : (
                      <div className='bg-white rounded-lg p-4 shadow-lg cursor-pointer'>
                        <div className='text-black text-base font-bold'>
                          {item.title}
                        </div>
                        <div className='bg-hanagold/40 p-2 mt-2 rounded-lg'>
                          <div className='truncate w-full'>{item.content}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상세보기 영역 */}
      <div className='flex flex-col flex-grow w-full h-full'>
        <div className='relative flex flex-col w-full h-full '>
          {/* 상세보기 헤더 */}
          <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
            상세보기
          </div>

          {/* 상세 내용 표시 */}
          {selectedItem ? (
            <div className='h-full p-10 space-y-4 overflow-y-auto border-x border-b border-gray-200'>
              <div className='text-4xl font-bold'>{selectedItem.title}</div>
              <div className='flex gap-3 border-b border-black border-b-3 pb-2'>
                <div className='text-lg font-extrabold'>상세URL </div>
                <div className='text-lg '>
                  <a
                    href={selectedItem.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-500 underline'
                  >
                    {selectedItem.url}
                  </a>
                </div>
              </div>
              <div className='text-3xl font-bold'>내용</div>
              <div className='mt-4 '>{selectedItem.content}</div>
            </div>
          ) : (
            <div className='p-10 space-y-4 border-x border-b border-gray-200 text-center text-hanaindigo text-xl h-full'>
              키워드를 선택해 주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
