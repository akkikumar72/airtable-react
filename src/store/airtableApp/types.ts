export type ClassInfo = {
  name: string;
  students: string;
};

export type AirtableAppState = {
  status: string;
  info: ClassInfoWithStudents[];
};
export type LinkedStudentId = {
  id: string;
  studentName: string;
};

export type students = {
  id: string;
  name: string;
  students: string[];
};

export type ClassInfoWithStudents = {
  name: string;
  id: string;
  students: LinkedStudentId[];
};
