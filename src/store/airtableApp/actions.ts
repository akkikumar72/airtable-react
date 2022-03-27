import { createAsyncThunk } from '@reduxjs/toolkit';
import Airtable from 'airtable';
import { ClassInfoWithStudents, students, LinkedStudentId } from './types';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(
  `${process.env.REACT_APP_AIRTABLE_BASE}`,
);

const getClassInfo = createAsyncThunk(
  //action type string
  'getClassInfo',
  // callback function
  async (studentName: string, thinkAPI) => {
    let classes: string[] = [];
    let wholeClassRoom: students[] = [];
    const studentRecords = await base('Classes')
      .select({
        view: 'Grid view',
        maxRecords: 20,
        filterByFormula: `SEARCH("${studentName}",{Students})`,
      })
      .all();
    studentRecords?.forEach((studentRecord) => {
      wholeClassRoom.push({
        id: studentRecord.id,
        name: studentRecord.get('Name')?.toString() ?? '',
        students: studentRecord.get('Students') as string[],
      });
      classes.push(...(studentRecord.get('Students') as string[]));
    });

    // Calling class record with filter by RECORD_ID
    const classRecords = await base('Students')
      .select({
        view: 'Grid view',
        maxRecords: 20,
        ...(classes.length > 0 && {
          filterByFormula: `OR( RECORD_ID() =  '${classes.join("', RECORD_ID() = '")}')`,
        }),
      })
      .all();

    const classInfos: LinkedStudentId[] = [];

    let getActualStudentData: ClassInfoWithStudents[] = [];
    classRecords.forEach((classRecord) => {
      if (classes.includes(classRecord.id)) {
        const classInfo: LinkedStudentId = {
          studentName: classRecord.get('Name')?.toString() ?? '',
          id: classRecord.id,
        };

        classInfos.push(classInfo);

        let finalStudents: ClassInfoWithStudents[] = [];

        wholeClassRoom.forEach((studentData) => {
          const ClassInfoDetails = classInfos.filter((classDetails: LinkedStudentId) =>
            studentData.students.includes(classDetails.id),
          );
          const newValue = { ...studentData, students: ClassInfoDetails };
          finalStudents.push(newValue);
          getActualStudentData = finalStudents;
        });
      }
    });
    return getActualStudentData;
  },
);

export { getClassInfo };
