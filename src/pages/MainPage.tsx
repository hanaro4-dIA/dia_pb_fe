import Section from '../components/Section';
import ApprovedConsultationsList from '../containers/ApprovedConsultationsList';
import CustomerList from '../containers/CustomerList';
import PbCalendar from '../containers/PbCalendar';
import PbProfile from '../containers/PbProfile';
import RequestedConsultationsList from '../containers/RequestedConsultationsList';
import { ConsultationProvider } from '../hooks/consultationsContext';

export default function MainPage() {
  return (
    <ConsultationProvider>
      <div className='flex flex-row justify-between w-full h-screen p-5 gap-5'>
        {/* 첫 번째 열 */}
        <div className='flex flex-col flex-grow w-1/4 h-full space-y-5'>
          <div className='overflow-y-auto w-full'>
            <PbProfile />
          </div>
          {/* 들어온 상담 요청 */}
          <div className='flex flex-col h-full flex-grow overflow-y-auto'>
            <RequestedConsultationsList />
          </div>
        </div>

        {/* 두 번째 열 */}
        <div className='flex flex-col w-5/12 space-y-5'>
          {/* 캘린더 */}
          <Section title='전체 상담 일정' logoImg={true} arrowToggle={true}>
            <PbCalendar />
          </Section>

          {/* 예정된 상담 일정 */}
          <div className='flex flex-col h-full flex-grow overflow-y-auto'>
            <ApprovedConsultationsList />
          </div>
        </div>

        {/* 세 번째 열 */}
        <div className='flex flex-col w-1/4 h-full'>
          <div className='w-full h-full overflow-y-auto'>
            <CustomerList />
          </div>
        </div>
      </div>
    </ConsultationProvider>
  );
}
