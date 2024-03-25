import { WorkShiftDto } from "../../schedule/dto/workShiftDto";

export interface UpdateClassInput {
  className: string;
  code: string;
  courseId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  limitStudent: number;
  currentStudent: number;
  lessionTimes: number;
  isActive: boolean;
  lsWorkSheet: WorkShiftDto[];
  id: number;
}
