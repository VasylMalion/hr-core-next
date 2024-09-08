import {
  Candidate,
  FoundUser,
  UserInfo,
  Vacancy,
  VacancyStatus,
} from '@/common/types'

export type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
  userInfo: UserInfo
}

export type FailResponse = {
  response: {
    data: string
  }
}

export type UpdatePasswordParams = {
  passwordOld: string
  passwordNew: string
}

export type GetEmployeesResponse = {
  users: Array<Partial<UserInfo>>
  count: number
}

export type GetEmployeesParams = {
  limit?: number
  page?: number
  filter?: string
}

export type GetEmployeeParams = {
  id: string
}

export type GetEmployeeResponse = UserInfo

export type AddEmployeeParams = Partial<UserInfo>

export type FindEmployeesParams = {
  username: string
}

export type FindEmployeesResponse = Array<FoundUser>

export type DeleteEmployeeParams = {
  id: string
}

export type DeleteEmployeeResponse = UserInfo

export type GetCandidatesParams = {
  limit?: number
  page?: number
  filter?: string
  onlyMine?: number
}

export type GetCandidatesResponse = {
  candidates: Array<Candidate>
  count: number
}

export type GetCandidateParams = {
  id: string
}

export type GetCandidateResponse = Candidate

export type AddCandidateParams = Omit<Candidate, 'id'>

export type FindCandidatesParams = {
  username: string
}

export type FindCandidatesResponse = Array<FoundUser>

export type DeleteCandidateParams = {
  id: string
}

export type DeleteCandidateResponse = Candidate

export type GetVacanciesParams = {
  status?: VacancyStatus
  limit?: number
  page?: number
  filter?: string
  onlyMine?: number
}

export type GetVacanciesResponse = {
  vacancies: Array<Vacancy>
  count: number
}

export type GetVacancyParams = {
  id: string
}

export type GetVacancyResponse = Vacancy

export type DeactivateVacancyParams = {
  id: string
}

export type AddVacancyParams = {
  department: string
  position: string
  location: string
  description: string
  assignedTo: Pick<UserInfo, 'id' | 'name' | 'surname'>
  salaryMin: string
  salaryMax: string
  deadlineDate: Date
}

export type AddTaskParams = {
  id: string
  boardId: string
  candidate: {
    id: string
    name: string
  }
}

export type AddTaskResponse = Vacancy

export type UpdateTaskParams = {
  vacancyId: string
  id: string
  column: string
}

export type DeleteTaskParams = {
  vacancyId: string
  id: string
}
