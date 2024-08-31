export enum Lang {
  en = 'en',
  ua = 'ua',
}

export enum Stage {
  SHORTLIST = 'SHORTLIST',
  PREINTERVIEW = 'PREINTERVIEW',
  INTERVIEW = 'INTERVIEW',
  TEST = 'TEST',
  APPLIED = 'APPLIED',
  NOT_APPLIED = 'NOT_APPLIED',
}

export type Task = {
  id: string
  candidate: Candidate
  column: Stage
  isOpen?: boolean
}

export type Desk = {
  _id: string
  tasks: Array<Task>
}

export type Vacancy = {
  id: number
  type: string
  position: string
  location: string
  department: string
  description: string
  candidatesCount: number
  status: VacancyStatus
  createdBy: {
    id: string
    name: string
    surname: string
  }
  assignedTo: {
    id: string
    name: string
    surname: string
  }
  createdAt: Date
  updatedAt: Date
  salaryMin: number
  salaryMax: number
  deadlineDate: Date
  desk: Desk
}

export type Column = {
  id: number
  title: string
  color: string
  items: Array<Task>
}

export enum VacancyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type UserInfo = {
  id: string
  email: string
  phone: string
  name: string
  surname: string
  birthDate: Date
  gender: string
  address: string
  department: string
  position: string
  mobileNumber: string
  role: string
  startDate: Date
}

export type Candidate = {
  id: string
  name: string
  surname: string
  birthDate: Date
  gender: string
  email: string
  mobileNumber: string
  location: string
  position: string
  salary: number
}

export type Status = {
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
}

export enum GenderTypes {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ContentSection = Array<{
  title: string
  value?: string
  isLarge?: boolean
}>

export type FieldError = string | [string, number]

export type Validation = {
  isValid?: boolean
  errors?: Array<FieldError>
}

export type FoundUser = {
  id: string
  name: string
  surname: string
}

export type InputState = { value: string; validation: Validation }

export type SelectInputState = { value: FoundUser | null; validation: Validation }

export enum AppRoutes {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  VACANCIES = 'VACANCIES',
  VACANCY_ADDING = 'VACANCY_ADDING',
  VACANCY_DETAILS = 'VACANCY_DETAILS',
  CANDIDATES = 'CANDIDATES',
  CANDIDATE_ADDING = 'CANDIDATE_ADDING',
  CANDIDATE_DETAILS = 'CANDIDATE_DETAILS',
  EMPLOYEES = 'EMPLOYEES',
  EMPLOYEE_ADDING = 'EMPLOYEE_ADDING',
  EMPLOYEE_DETAILS = 'EMPLOYEE_DETAILS',
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.DASHBOARD]: '/dashboard',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.VACANCIES]: '/vacancies',
  [AppRoutes.VACANCY_DETAILS]: '/vacancies/:id',
  [AppRoutes.VACANCY_ADDING]: '/vacancies/adding',
  [AppRoutes.CANDIDATES]: '/candidates',
  [AppRoutes.CANDIDATE_ADDING]: '/candidates/adding',
  [AppRoutes.CANDIDATE_DETAILS]: '/candidates/:id',
  [AppRoutes.EMPLOYEES]: '/employees',
  [AppRoutes.EMPLOYEE_ADDING]: '/employees/adding',
  [AppRoutes.EMPLOYEE_DETAILS]: '/employees/:id',
}