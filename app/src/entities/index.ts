import type {Category} from './category'
import type Department from './department'
import type Curriculum from './curriculum'
import type {Faculty, facultySchema} from './faculty'
import type Organization from './organization'
import type Specialty from './specialty'
import type {Survey} from './surveys'
import type WorkType from './work-type'
import type {SurveyTemplateSection} from './surveys/templates'
import type Course from './course'
import type User from './users'
import type Work from './work'
import type Rate from './rate'
import type Document from './document'
import type Vacation from './vacation'
import type ResumeSection from './resume-section'
import type EmployeePosition from './employee-position'
import type TeacherDegree from './teacher-degree'
import type AcademicYear from './academic-year'
import type TeacherRate from './teacher-rate'
import type Permission from './permission'
import type Role from './role'
import type UserEvent from './user-event'
import type Message from './message'
import type ScientificSpecialty from './scientific-specialty'
import type UserProfile from './user-profile'
import type Equipment from './equipment'
import type Classroom from './classroom'
import type Building from './building'
import type LessonType from './lesson-type'
import type Unit from './unit'
import type Publication from './publication'
import type PublicationType from './publication-type'
import type Certificate from './certificate'
import type EducationCycle from './education-cycle'
import type SelectiveCourse from './selective-courses/selective-course'
import type SelectiveCoursesBlock from './selective-courses/selective-courses-block'
import type SelectiveCoursesStatus from './selective-courses/selective-courses-status'
import type CurriculumOption from './curriculum-option'
import type CertificateType from './certificate-type'
import type WorkingCurriculumRecord from './working-curriculum-record'
import type WorkingCurriculum from './working-curriculum'
import type EducationalProcessWorksType from './educational-process-works-types'
import type SelectiveCourseOption from './selective-courses/selective-course-option'
import type Group from './group'
import type StudentIndividualPlan from './student-individual-plan'
import type UserVacationRecord from './user-vacation-record'
import type SelectiveCourseStudent from './selective-courses/selective-course-student'
import type SelectiveCoursesStatistics from './selective-courses/selective-courses-statistics'
import type TeachersWorkloadColumn from './teachers-workload-columns'
import type TeacherWorkloadRecord from './teacher-workload'
import type SemesterRecord from './semester'
import type Practice from './practice'
import type CoursePaper from './course-paper'
import type {TeacherWorkloadColumnEntry} from './teacher-workload-column-entry'
import type Topic from './topic'
import type Week from './week'
import type TeacherConsultation from './teacher-consultation'
import type LessonsScheduleRecord from './lessons-schedule'
import type UserPositionRecord from './user-position-record'
import type {UserFullName} from './user-full-name'
import type Workplace from './workplace'
import type {AdditionalLesson} from './additional-lesson'
import type {TimetableLesson} from './timetable-lesson'
import type {AdditionalCourse} from './additional-course'
import type {BookingClassroom} from './booking-classroom'
import type {Order} from './order';
import {orderSchema} from './order'
import type {Tariff} from './tariff'
import {tariffSchema} from './tariff'
import type {EducationForm} from './education/education-form';
import {educationFormSchema} from './education/education-form'
import type {EducationLevel} from './education/education-levels';
import {educationLevelSchema} from './education/education-levels'
import type {FinancialSource} from './education/financial-source'
import type {EducationRecord, educationRecordSchema} from './education/education-record'
import type {EducationProgram} from './education/education-programs'

export type {
    Faculty,
    Department,
    Specialty,
    Curriculum,
    SurveyTemplateSection,
    Survey,
    EducationProgram,
    Organization,
    Category,
    WorkType,
    Course,
    User,
    Work,
    Rate,
    Document,
    Vacation,
    ResumeSection,
    Tariff,
    EmployeePosition,
    TeacherDegree,
    AcademicYear,
    TeacherRate,
    Permission,
    Role,
    UserEvent,
    Message,
    UserProfile,
    ScientificSpecialty,
    EducationLevel,
    EducationForm,
    Building,
    Classroom,
    Equipment,
    LessonType,
    Unit,
    Publication,
    PublicationType,
    Certificate,
    EducationRecord,
    EducationCycle,
    SelectiveCourse,
    SelectiveCoursesBlock,
    SelectiveCoursesStatus,
    CurriculumOption,
    CertificateType,
    WorkingCurriculumRecord,
    WorkingCurriculum,
    EducationalProcessWorksType,
    SelectiveCourseOption,
    Group,
    FinancialSource,
    StudentIndividualPlan,
    UserVacationRecord,
    SelectiveCourseStudent,
    SelectiveCoursesStatistics,
    TeachersWorkloadColumn,
    TeacherWorkloadRecord,
    SemesterRecord,
    Practice,
    CoursePaper,
    TeacherWorkloadColumnEntry,
    Topic,
    Week,
    TeacherConsultation,
    LessonsScheduleRecord,
    UserPositionRecord,
    UserFullName,
    Workplace,
    AdditionalLesson,
    TimetableLesson,
    AdditionalCourse,
    BookingClassroom,
    Order
}
export {
    orderSchema,
    tariffSchema,
    educationFormSchema,
    educationLevelSchema,
    facultySchema,
    educationRecordSchema
}