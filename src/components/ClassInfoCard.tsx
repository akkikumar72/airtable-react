import React from 'react';
import { useSelector } from 'react-redux';
import { airTableDashboardData } from '../store/airtableApp/selectors';
import NoRecordFound from './noRecordFound';

const ClassInfoCard: React.FC = () => {
  const ClassInfo = useSelector(airTableDashboardData);

  if (ClassInfo.length === 0) {
    return <NoRecordFound />;
  }
  return (
    <div className="cards">
      {ClassInfo.map((item) => (
        <div className="card-item" key={item.id}>
          <div className="card">
            <h5 className="card-title">{item.name}</h5>
            {item.students.map((student) => (
              <div key={student.id} className="card-content">
                <h3 className="card-text">{student.studentName}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassInfoCard;
