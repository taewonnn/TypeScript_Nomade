import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function App() {
  return (
    <>
      <div className="text-center bg-blue-500"></div>
      {/* FullCalendar */}
      <div className="w-full h-1/2">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
      </div>
    </>
  );
}

export default App;
